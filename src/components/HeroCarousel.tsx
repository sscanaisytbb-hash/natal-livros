import React, { useState, useEffect, useRef, useCallback } from 'react';

interface EbookItem {
  id: string;
  title: string;
  tag: string;
  img: string;
  alt: string;
  subtitle: string;
}

const ITEMS: EbookItem[] = [
  {
    id: 'colorindo',
    title: 'Livro Colorindo o Natal',
    tag: 'PRINCIPAL',
    img: '/images/cover_colorindo_natal.png',
    alt: 'Livro Colorindo o Natal',
    subtitle: '50 páginas com ilustrações exclusivas',
  },
  {
    id: 'caca-palavras',
    title: '30 Caça-Palavras de Natal',
    tag: 'BÔNUS',
    img: '/images/cover_caca_palavras.png',
    alt: '30 Caça-Palavras de Natal',
    subtitle: 'Atenção, foco e concentração',
  },
  {
    id: 'jogos',
    title: 'Jogos de Natal',
    tag: 'BÔNUS',
    img: '/images/cover_jogos_natal.png',
    alt: 'Jogos de Natal',
    subtitle: 'Desafios e brincadeiras em família',
  },
  {
    id: 'cartinha',
    title: 'Cartinha para o Papai Noel',
    tag: 'BÔNUS',
    img: '/images/cover_cartinha_noel.png',
    alt: 'Cartinha para o Papai Noel',
    subtitle: 'Pronta para imprimir e preencher',
  },
];

export const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = ITEMS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Suporte a teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch e Drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startXRef.current;
    setDragOffset(diff);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 40) {
      prevSlide();
    } else if (dragOffset < -40) {
      nextSlide();
    }
    setDragOffset(0);
  };

  return (
    <div className="relative w-full select-none" ref={containerRef}>
      {/* 3D Stage */}
      <div
        className="relative w-full h-[360px] sm:h-[420px] md:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ perspective: '1200px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {ITEMS.map((item, idx) => {
          // Calcula distância modular em relação ao item ativo
          let dist = idx - currentIndex;
          if (dist > total / 2) dist -= total;
          if (dist < -total / 2) dist += total;

          const isActive = dist === 0;
          const absDist = Math.abs(dist);

          // Translação X, Z e rotação Y para efeito 3D carrossel
          const stepX = typeof window !== 'undefined' && window.innerWidth < 640 ? 110 : 150;
          const translateX = dist * stepX + (isDragging ? dragOffset * 0.4 : 0);
          const translateZ = -absDist * 85;
          const rotateY = -dist * 20;
          const scale = isActive ? 1.05 : Math.max(0.72, 1 - absDist * 0.18);
          const opacity = absDist > 1.8 ? 0.2 : absDist === 1 ? 0.75 : 1;
          const zIndex = 30 - Math.round(absDist * 10);

          return (
            <div
              key={item.id}
              onClick={() => {
                if (!isDragging && !isActive) {
                  setCurrentIndex(idx);
                }
              }}
              className="absolute top-1/2 left-1/2 transition-transform duration-500 ease-out will-change-transform"
              style={{
                width: 'clamp(180px, 48vw, 240px)',
                marginLeft: 'clamp(-90px, -24vw, -120px)',
                marginTop: 'clamp(-130px, -34vw, -170px)',
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                pointerEvents: absDist > 1.8 ? 'none' : 'auto',
              }}
            >
              <div className="relative w-full aspect-3/4 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[rgba(217,164,65,0.4)] bg-[#0d0d0d] group">
                <img
                  src={item.img}
                  alt={item.alt}
                  draggable={false}
                  loading={idx < 2 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                />

                {/* Tag decorativa */}
                <div className="absolute top-2.5 right-2.5 bg-[#B3131B] text-[#fff] text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[rgba(217,164,65,0.7)] shadow-md">
                  {item.tag}
                </div>

                {/* Overlay sutil dourado no ativo */}
                {isActive && (
                  <div className="absolute inset-0 ring-2 ring-[#D9A441] ring-inset rounded-xl pointer-events-none shadow-[0_0_30px_rgba(217,164,65,0.4)]" />
                )}
              </div>

              {/* Título abaixo do ativo */}
              {isActive && (
                <div className="text-center mt-3 animate-fade-in">
                  <p className="text-[#D9A441] font-bold text-sm tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#b9ae9c]">{item.subtitle}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Botão anterior */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Item anterior"
          className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-[rgba(217,164,65,0.6)] bg-black/70 text-[#D9A441] text-2xl flex items-center justify-center hover:bg-[#D9A441] hover:text-[#1a0b00] hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-xs cursor-pointer"
        >
          ‹
        </button>

        {/* Botão próximo */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Próximo item"
          className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-40 w-10 h-10 rounded-full border border-[rgba(217,164,65,0.6)] bg-black/70 text-[#D9A441] text-2xl flex items-center justify-center hover:bg-[#D9A441] hover:text-[#1a0b00] hover:scale-110 active:scale-95 transition-all shadow-lg backdrop-blur-xs cursor-pointer"
        >
          ›
        </button>

        {/* Selo flutuante de Bônus Grátis */}
        <div
          className="seal absolute -bottom-2 right-2 sm:right-6 z-40 pointer-events-none"
          aria-label="Mais 4 bônus grátis"
        >
          <span className="text-lg font-black text-[#1a0b00] leading-none">+4</span>
          <span className="text-[11px] font-extrabold uppercase text-[#1a0b00] leading-tight mt-0.5">
            BÔNUS
            <br />
            GRÁTIS
          </span>
        </div>
      </div>

      {/* Indicadores de pontinhos (dots) */}
      <div className="flex justify-center items-center gap-2 mt-4">
        {ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Ver item ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIndex
                ? 'w-7 bg-[#D9A441]'
                : 'w-2 bg-[#F6EEE0]/30 hover:bg-[#F6EEE0]/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
