import React, { useEffect, useState } from 'react';
import { FlyingSanta } from './components/FlyingSanta';
import { SnowParticles } from './components/SnowParticles';
import { HeroCarousel } from './components/HeroCarousel';
import { CountdownTimer } from './components/CountdownTimer';
import { FAQAccordion } from './components/FAQAccordion';
import { PixelManagerDrawer } from './components/PixelManagerDrawer';
import {
  SYNCPAY_CHECKOUT_URL,
  initMetaPixel,
  handleCheckoutClick,
} from './lib/pixel';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Palette,
  Heart,
  Smile,
  Check,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function App() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    // Inicializa o Pixel do usuário (se configurado)
    initMetaPixel();

    // Controle da barra fixa no scroll mobile
    const onScroll = () => {
      if (window.scrollY > 450) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F6EEE0] selection:bg-[#B3131B] selection:text-white overflow-x-hidden">
      {/* Decoração Papai Noel no Céu */}
      <FlyingSanta />

      {/* Partículas de neve dourada e branca suaves */}
      <SnowParticles />

      {/* Ferramenta de configuração e teste do Meta Pixel para o proprietário */}
      <PixelManagerDrawer />

      {/* ========================================================= */}
      {/* HERO SECTION                                             */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-14 sm:pt-28 sm:pb-20 px-4 sm:px-6 max-w-6xl mx-auto z-10">
        {/* Glows de ambiente */}
        <div className="glow g-red w-72 h-72 -left-20 top-16" />
        <div className="glow g-green w-80 h-80 -right-20 top-24" />

        {/* Emojis flutuantes de Natal */}
        <span className="fl-emoji absolute left-4 sm:left-10 top-16 text-3xl opacity-60 pointer-events-none select-none">
          🎄
        </span>
        <span
          className="fl-emoji absolute right-6 sm:right-16 top-20 text-3xl opacity-60 pointer-events-none select-none"
          style={{ animationDelay: '-2.5s' }}
        >
          ⭐
        </span>
        <span
          className="fl-emoji absolute left-1/2 bottom-8 text-3xl opacity-50 pointer-events-none select-none"
          style={{ animationDelay: '-4s' }}
        >
          🎁
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Coluna de Texto e Oferta */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badges de Destaque */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-5">
              <span className="inline-flex items-center gap-2 border border-[#D9A441] text-[#D9A441] bg-[#D9A441]/10 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#D9A441] animate-ping" />
                ACESSO IMEDIATO
              </span>
              <span className="inline-flex items-center gap-2 border border-[#B3131B] text-rose-300 bg-[#B3131B]/15 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs">
                <Zap className="w-3.5 h-3.5 text-rose-400" />
                ÚLTIMAS HORAS DE PROMOÇÃO
              </span>
            </div>

            {/* Headline Principal */}
            <h1 className="font-montserrat font-extrabold text-3xl sm:text-5xl lg:text-5xl leading-tight mb-4 text-[#F6EEE0]">
              Transforme as férias de Natal em horas de{' '}
              <span className="text-[#D9A441] underline decoration-[#B3131B] decoration-wavy decoration-2">
                diversão longe das telas
              </span>
              .
            </h1>

            {/* Subtítulo / Lead */}
            <p className="text-base sm:text-lg text-[#b9ae9c] max-w-xl mb-6 font-normal leading-relaxed">
              O jeito mais divertido de tirar as crianças dos celulares e tablets
              neste Natal — com dezenas de atividades exclusivas prontas para imprimir em minutos.
            </p>

            {/* Preços chamativos idênticos à página original */}
            <div className="price-row">
              <span className="price-old">De R$ 197</span>
              <span className="price-now">R$ 19,90</span>
            </div>

            {/* Botão de Compra Oficial SyncPay */}
            <a
              href={SYNCPAY_CHECKOUT_URL}
              onClick={handleCheckoutClick}
              className="btn-cta text-base sm:text-lg py-5 px-8 sm:px-12 w-full sm:w-auto max-w-md shadow-2xl group"
            >
              <span>COMPRAR COM DESCONTO</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Selos de Confiança */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4 text-xs text-[#b9ae9c] font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D9A441]" />
                Compra 100% segura
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#D9A441]" />
                7 dias de garantia
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#D9A441]" />
                Reembolso garantido
              </span>
            </div>
          </div>

          {/* Coluna Visual: Carrossel 3D Oficial (Apenas Produto Principal e Bônus) */}
          <div className="lg:col-span-5 w-full mt-2 lg:mt-0">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FAIXA MARQUEE ROLANTE                                    */}
      {/* ========================================================= */}
      <div className="relative py-3.5 bg-gradient-to-r from-[#0D5C3B] via-[#117a4f] to-[#0D5C3B] border-y border-[#D9A441]/50 shadow-lg marquee-container z-20">
        <div className="marquee-content font-montserrat text-xs sm:text-sm font-bold tracking-wider text-white">
          <span className="mx-6">✦ Acesso imediato no e-mail</span>
          <span className="mx-6">✦ PDF para celular, tablet e computador</span>
          <span className="mx-6">✦ Imprima em folha A4 comum</span>
          <span className="mx-6">✦ Diversão saudável em família</span>
          <span className="mx-6">✦ Pagamento seguro via SyncPay</span>
          <span className="mx-6">✦ Garantia incondicional de 7 dias</span>
          <span className="mx-6">✦ Acesso imediato no e-mail</span>
          <span className="mx-6">✦ PDF para celular, tablet e computador</span>
          <span className="mx-6">✦ Imprima em folha A4 comum</span>
          <span className="mx-6">✦ Diversão saudável em família</span>
          <span className="mx-6">✦ Pagamento seguro via SyncPay</span>
          <span className="mx-6">✦ Garantia incondicional de 7 dias</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BENEFÍCIOS & GALERIA FAMILIAR                             */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-4xl text-[#F6EEE0] mb-4">
            Tudo o que você precisa para deixar o Natal das crianças mais divertido!
          </h2>
          <p className="text-[#b9ae9c] text-base sm:text-lg">
            Pensado especialmente para famílias que querem momentos inesquecíveis,
            criativos e livres do vício das telas.
          </p>
        </div>

        {/* Galeria de Fotos Reais de Famílias */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-14 max-w-4xl mx-auto">
          <div className="aspect-4/5 rounded-2xl overflow-hidden border border-[#D9A441]/30 shadow-lg bg-[#0e0e0e] group">
            <img
              src="/images/gallery_mae_filha.jpeg"
              alt="Mãe sorrindo com a filha colorindo desenhos de Natal"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="aspect-4/5 rounded-2xl overflow-hidden border border-[#D9A441]/30 shadow-lg bg-[#0e0e0e] group">
            <img
              src="/images/gallery_pai_filha.jpeg"
              alt="Pai e filha colorindo desenhos natalinos juntos"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="aspect-4/5 rounded-2xl overflow-hidden border border-[#D9A441]/30 shadow-lg bg-[#0e0e0e] group">
            <img
              src="/images/gallery_criancas_felizes.jpeg"
              alt="Crianças felizes mostrando desenhos natalinos coloridos"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="aspect-4/5 rounded-2xl overflow-hidden border border-[#D9A441]/30 shadow-lg bg-[#0e0e0e] group">
            <img
              src="/images/gallery_avos_neto.jpeg"
              alt="Avós e neto colorindo desenhos de Natal na sala"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Grid de 6 Vantagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 hover:border-[#D9A441] transition-all duration-300 hover:-translate-y-1 shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#B3131B]/20 flex items-center justify-center text-2xl mb-4 text-[#D9A441]">
              🎨
            </div>
            <h3 className="font-montserrat font-bold text-xl text-[#D9A441] mb-2">
              Diversão sem telas
            </h3>
            <p className="text-[#b9ae9c] text-sm leading-relaxed">
              50 desenhos natalinos encantadores para colorir e manter as crianças entretidas de forma criativa e calma.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 hover:border-[#D9A441] transition-all duration-300 hover:-translate-y-1 shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#0D5C3B]/20 flex items-center justify-center text-2xl mb-4 text-[#D9A441]">
              🎁
            </div>
            <h3 className="font-montserrat font-bold text-xl text-[#D9A441] mb-2">
              Kit completo
            </h3>
            <p className="text-[#b9ae9c] text-sm leading-relaxed">
              Além do livro principal, você recebe 30 caça-palavras temáticos, jogos interativos e a cartinha do Papai Noel.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 hover:border-[#D9A441] transition-all duration-300 hover:-translate-y-1 shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#D9A441]/15 flex items-center justify-center text-2xl mb-4 text-[#D9A441]">
              ⚡
            </div>
            <h3 className="font-montserrat font-bold text-xl text-[#D9A441] mb-2">
              Pronto para usar
            </h3>
            <p className="text-[#b9ae9c] text-sm leading-relaxed">
              Baixe no celular ou computador, imprima em qualquer impressora comum e comece a brincar em minutos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 hover:border-[#D9A441] transition-all duration-300 hover:-translate-y-1 shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#B3131B]/20 flex items-center justify-center text-2xl mb-4 text-[#D9A441]">
              ✨
            </div>
            <h3 className="font-montserrat font-bold text-xl text-[#D9A441] mb-2">
              Estimula a criatividade
            </h3>
            <p className="text-[#b9ae9c] text-sm leading-relaxed">
              Atividades pedagógicas e lúdicas pensadas para exercitar a atenção, coordenação motora e raciocínio lógico.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 hover:border-[#D9A441] transition-all duration-300 hover:-translate-y-1 shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#0D5C3B]/20 flex items-center justify-center text-2xl mb-4 text-[#D9A441]">
              📱
            </div>
            <h3 className="font-montserrat font-bold text-xl text-[#D9A441] mb-2">
              Acesso imediato
            </h3>
            <p className="text-[#b9ae9c] text-sm leading-relaxed">
              Arquivos digitais em alta resolução. Você pode imprimir quantas cópias quiser para todas as crianças da família.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 hover:border-[#D9A441] transition-all duration-300 hover:-translate-y-1 shadow-md group">
            <div className="w-12 h-12 rounded-xl bg-[#D9A441]/15 flex items-center justify-center text-2xl mb-4 text-[#D9A441]">
              👨‍👩‍👧
            </div>
            <h3 className="font-montserrat font-bold text-xl text-[#D9A441] mb-2">
              Para pais e tutores
            </h3>
            <p className="text-[#b9ae9c] text-sm leading-relaxed">
              Uma solução prática para entreter os pequenos na noite de Natal, ceia em família ou durante as férias escolares.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* O QUE VOCÊ VAI RECEBER (APENAS O PRINCIPAL E OS BÔNUS)     */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#0D5C3B]/10 to-transparent border-t border-white/5 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-4xl text-[#F6EEE0] mb-4">
              O que você vai receber
            </h2>
            <p className="text-[#b9ae9c] text-base sm:text-lg">
              Um kit completo de atividades natalinas para baixar, imprimir e começar a
              usar assim que o pagamento for confirmado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Produto Principal */}
            <div className="flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-[#0e0e0e] border-2 border-[#D9A441] shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-28 h-28 bg-[#D9A441]/15 rounded-full blur-xl pointer-events-none" />
              <img
                src="/images/cover_colorindo_natal.png"
                alt="Livro Colorindo o Natal"
                className="w-24 sm:w-28 shrink-0 rounded-lg aspect-3/4 object-cover shadow-md border border-[#D9A441]/40 -rotate-2"
              />
              <div className="flex flex-col justify-center">
                <span className="inline-block text-[10px] font-bold tracking-widest text-[#D9A441] uppercase mb-1">
                  PRODUTO PRINCIPAL
                </span>
                <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[#F6EEE0] mb-2">
                  Livro Colorindo o Natal
                </h3>
                <p className="text-xs sm:text-sm text-[#b9ae9c] leading-relaxed">
                  50 páginas repletas de ilustrações natalinas fofas e detalhadas para
                  despertar a imaginação e prender a atenção das crianças por horas.
                </p>
              </div>
            </div>

            {/* 2. Bônus Caça-Palavras */}
            <div className="flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-[#D9A441]/50 transition-all shadow-md relative overflow-hidden">
              <div className="absolute top-2.5 right-2.5 bg-[#B3131B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D9A441]">
                BRINDE
              </div>
              <img
                src="/images/cover_caca_palavras.png"
                alt="30 Caça-Palavras de Natal"
                className="w-24 sm:w-28 shrink-0 rounded-lg aspect-3/4 object-cover shadow-md border border-white/10 -rotate-2"
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[#F6EEE0] mb-2">
                  30 Caça-Palavras de Natal
                </h3>
                <p className="text-xs sm:text-sm text-[#b9ae9c] leading-relaxed">
                  Diferentes níveis e temas com vocabulário natalino para estimular a
                  leitura, atenção concentrada e raciocínio de maneira empolgante.
                </p>
              </div>
            </div>

            {/* 3. Bônus Jogos de Natal */}
            <div className="flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-[#D9A441]/50 transition-all shadow-md relative overflow-hidden">
              <div className="absolute top-2.5 right-2.5 bg-[#B3131B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D9A441]">
                BRINDE
              </div>
              <img
                src="/images/cover_jogos_natal.png"
                alt="Jogos de Natal"
                className="w-24 sm:w-28 shrink-0 rounded-lg aspect-3/4 object-cover shadow-md border border-white/10 -rotate-2"
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[#F6EEE0] mb-2">
                  Jogos de Natal
                </h3>
                <p className="text-xs sm:text-sm text-[#b9ae9c] leading-relaxed">
                  Atividades lúdicas para brincar sozinho, com primos, irmãos ou com os
                  pais ao redor da mesa. Risadas e união garantidas.
                </p>
              </div>
            </div>

            {/* 4. Bônus Cartinha Papai Noel */}
            <div className="flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-[#D9A441]/50 transition-all shadow-md relative overflow-hidden">
              <div className="absolute top-2.5 right-2.5 bg-[#B3131B] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#D9A441]">
                BRINDE
              </div>
              <img
                src="/images/cover_cartinha_noel.png"
                alt="Cartinha para o Papai Noel"
                className="w-24 sm:w-28 shrink-0 rounded-lg aspect-3/4 object-cover shadow-md border border-white/10 -rotate-2"
              />
              <div className="flex flex-col justify-center">
                <h3 className="font-montserrat font-bold text-lg sm:text-xl text-[#F6EEE0] mb-2">
                  Cartinha para o Papai Noel
                </h3>
                <p className="text-xs sm:text-sm text-[#b9ae9c] leading-relaxed">
                  O modelo mais fofo para as crianças escreverem e desenharem seus pedidos,
                  mantendo viva a magia e a inocência do Natal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PARA QUEM É ESTE PACK                                     */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto z-10">
        <div className="text-center mb-10">
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-4xl text-[#F6EEE0] mb-3">
            Para quem é este pack
          </h2>
          <p className="text-[#b9ae9c] text-sm sm:text-base max-w-xl mx-auto">
            Se você quer deixar o Natal das crianças mais divertido, criativo e longe
            das telas, este kit foi feito para você.
          </p>
        </div>

        <ul className="space-y-3.5 max-w-2xl mx-auto">
          {[
            'Pais que querem entreter as crianças com atividades divertidas durante o Natal',
            'Mães, pais e responsáveis que procuram alternativas para diminuir o tempo de tela',
            'Tutores, professores e cuidadores que precisam de atividades natalinas prontas para aplicar',
            'Famílias que querem criar momentos especiais juntos durante as férias de fim de ano',
            'Quem procura atividades fáceis de imprimir, econômicas e prontas para usar em poucos minutos',
          ].map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3.5 bg-[#101010] border border-[#0D5C3B] border-l-4 border-l-[#0D5C3B] rounded-xl p-4 sm:p-4.5 text-sm sm:text-base text-[#F6EEE0] shadow-sm"
            >
              <span className="text-[#D9A441] font-black text-lg shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ========================================================= */}
      {/* OFERTA ESPECIAL DE NATAL (CAIXA PRINCIPAL DE COMPRA)      */}
      {/* ========================================================= */}
      <section id="comprar" className="relative py-16 sm:py-24 px-4 sm:px-6 z-10">
        <div className="glow g-red w-96 h-96 left-1/2 -translate-x-1/2 top-10" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-[#F6EEE0]">
              Oferta especial de Natal
            </h2>
          </div>

          <div className="bg-gradient-to-b from-[#130b0b] to-[#080808] border-2 border-[#D9A441] rounded-3xl p-6 sm:p-10 text-center shadow-[0_0_60px_rgba(217,164,65,0.22)]">
            <p className="price-old text-sm sm:text-base">
              Valor total dos materiais: <span className="text-white/70">R$ 197</span>
            </p>

            <div className="inline-block bg-[#0D5C3B] text-white font-bold text-xs sm:text-sm px-4 py-1.5 rounded-full my-3 shadow-md">
              Você economiza R$ 177,10
            </div>

            <p className="text-sm text-[#b9ae9c] mt-1">Hoje por apenas</p>

            <div className="price-box-now">
              R$ 19,90
            </div>

            <p className="text-xs sm:text-sm text-[#b9ae9c] mb-6">
              Pagamento único. Sem mensalidade. Acesso imediato no e-mail.
            </p>

            <div className="border-t border-white/10 pt-5 mb-6">
              <p className="text-xs sm:text-sm text-[#D9A441] font-semibold mb-2">
                A oferta especial de Natal termina em:
              </p>
              <CountdownTimer />
            </div>

            {/* Botão de Compra Oficial SyncPay */}
            <a
              href={SYNCPAY_CHECKOUT_URL}
              onClick={handleCheckoutClick}
              className="btn-cta text-lg sm:text-xl py-5 px-8 sm:px-14 w-full shadow-2xl"
            >
              QUERO RECEBER AGORA
            </a>

            {/* Badges de confiança */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 text-xs text-[#b9ae9c]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#D9A441] font-bold">✓</span> Compra segura
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#D9A441] font-bold">✓</span> 7 dias de garantia
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#D9A441] font-bold">✓</span> Reembolso garantido
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BÔNUS EXCLUSIVOS                                         */}
      {/* ========================================================= */}
      <section className="relative py-16 px-4 sm:px-6 max-w-5xl mx-auto z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-4xl text-[#F6EEE0] mb-3">
            Bônus exclusivos para quem comprar hoje
          </h2>
          <p className="text-[#b9ae9c] text-sm sm:text-base">
            Atividades que transformam o Natal em momentos inesquecíveis em família.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#D9A441]/30 hover:border-[#D9A441] transition-all text-center">
            <span className="text-4xl block mb-3">🎁</span>
            <h3 className="font-montserrat font-bold text-lg text-[#D9A441] mb-2">
              30 Caça-Palavras de Natal
            </h3>
            <p className="text-xs sm:text-sm text-[#b9ae9c]">
              Arquivo completo pronto para impressão em folhas A4.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#D9A441]/30 hover:border-[#D9A441] transition-all text-center">
            <span className="text-4xl block mb-3">🎲</span>
            <h3 className="font-montserrat font-bold text-lg text-[#D9A441] mb-2">
              Jogos de Natal
            </h3>
            <p className="text-xs sm:text-sm text-[#b9ae9c]">
              Atividades extras e dinâmicas lúdicas para brincar e se divertir.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-[#D9A441]/30 hover:border-[#D9A441] transition-all text-center">
            <span className="text-4xl block mb-3">✉️</span>
            <h3 className="font-montserrat font-bold text-lg text-[#D9A441] mb-2">
              Cartinha para o Noel
            </h3>
            <p className="text-xs sm:text-sm text-[#b9ae9c]">
              Baixe, imprima e crie um momento emocionante com as crianças neste Natal.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* DEPOIMENTOS                                              */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-[#B3131B]/10 to-transparent z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-4xl text-[#F6EEE0] mb-3">
              Quem já usou, aprovou
            </h2>
            <p className="text-[#b9ae9c] text-sm sm:text-base">
              Confira alguns dos depoimentos de famílias que já testaram o material.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Depoimento 1 */}
            <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-[#D9A441] text-lg tracking-widest mb-3">
                  ★★★★★
                </div>
                <p className="text-sm italic text-[#F6EEE0] leading-relaxed mb-6">
                  “Meu sobrinho pediu meu celular enquanto a gente arrumava a mesa. Dei
                  um caça-palavras pra ele e, quando voltei, ele e o amigo estavam disputando
                  quem terminava o caça-palavras primeiro 😂”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img
                  src="/images/avatar_mariana.jpeg"
                  alt="Mariana S."
                  className="w-11 h-11 rounded-full object-cover border border-[#D9A441]/50"
                />
                <div>
                  <b className="block text-sm text-[#F6EEE0]">Mariana S.</b>
                  <small className="text-xs text-[#b9ae9c]">Florianópolis, SC</small>
                </div>
              </div>
            </div>

            {/* Depoimento 2 */}
            <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-[#D9A441] text-lg tracking-widest mb-3">
                  ★★★★★
                </div>
                <p className="text-sm italic text-[#F6EEE0] leading-relaxed mb-6">
                  “Foi libertador ver meu filho passar a ceia sem o celular. Eu já tava
                  esperando ouvir ‘mãe, me empresta o seu?’, mas o que ele pediu foi pra eu
                  imprimir mais um desenho.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img
                  src="/images/avatar_gabriela.jpeg"
                  alt="Gabriela T."
                  className="w-11 h-11 rounded-full object-cover border border-[#D9A441]/50"
                />
                <div>
                  <b className="block text-sm text-[#F6EEE0]">Gabriela T.</b>
                  <small className="text-xs text-[#b9ae9c]">Joinville, SC</small>
                </div>
              </div>
            </div>

            {/* Depoimento 3 */}
            <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-[#D9A441]/25 flex flex-col justify-between shadow-lg">
              <div>
                <div className="text-[#D9A441] text-lg tracking-widest mb-3">
                  ★★★★★
                </div>
                <p className="text-sm italic text-[#F6EEE0] leading-relaxed mb-6">
                  “Baixei no dia da ceia e imprimi só umas folhas pra testar. A melhor parte
                  foi ouvir meu filho falar: senta aqui, mãe, pintei esse desenho pra você.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <img
                  src="/images/avatar_ana_paula.jpeg"
                  alt="Ana Paula L."
                  className="w-11 h-11 rounded-full object-cover border border-[#D9A441]/50"
                />
                <div>
                  <b className="block text-sm text-[#F6EEE0]">Ana Paula L.</b>
                  <small className="text-xs text-[#b9ae9c]">Curitiba, PR</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* GARANTIA DE 7 DIAS                                        */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left bg-[#0e0e0e]/80 border border-[#D9A441]/30 p-8 sm:p-12 rounded-3xl shadow-xl">
          {/* Selo Duplo Circular de Garantia */}
          <div className="gseal shrink-0">
            <span className="font-garamond font-bold text-5xl text-[#D9A441] leading-none">
              7
            </span>
            <span className="text-[11px] font-bold tracking-widest text-[#F6EEE0] uppercase">
              DIAS DE
            </span>
            <span className="text-[10px] font-extrabold tracking-wider text-[#D9A441] uppercase">
              GARANTIA
            </span>
          </div>

          <div>
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-[#F6EEE0] mb-3 text-left">
              Risco zero para você
            </h2>
            <p className="text-sm sm:text-base text-[#b9ae9c] leading-relaxed mb-4 text-left">
              Baixe as atividades, imprima e faça o teste com as crianças. Se por qualquer motivo
              você achar que o material não valeu a pena, basta nos enviar um e-mail em até 7 dias
              que devolveremos 100% do seu dinheiro, sem burocracia nem perguntas.
            </p>
            <p className="text-xs text-[#D9A441] font-semibold text-left">
              Seu investimento está 100% protegido.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* PERGUNTAS FREQUENTES (FAQ)                                */}
      {/* ========================================================= */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-montserrat font-extrabold text-2xl sm:text-4xl text-[#F6EEE0] mb-3">
            Perguntas frequentes
          </h2>
          <p className="text-[#b9ae9c] text-sm sm:text-base">
            Tire suas dúvidas antes de garantir o combo com desconto.
          </p>
        </div>

        <FAQAccordion />
      </section>

      {/* ========================================================= */}
      {/* CTA FINAL                                                 */}
      {/* ========================================================= */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 text-center z-10 overflow-hidden bg-gradient-to-t from-[#0a0a0a] via-[#0D5C3B]/20 to-transparent">
        <div className="glow g-red w-80 h-80 left-1/2 -translate-x-1/2 top-10" />

        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-montserrat font-extrabold text-3xl sm:text-5xl text-[#F6EEE0] mb-6">
            Seu Natal mais bonito começa agora
          </h2>

          <p className="price-old text-lg mb-1">De R$ 197</p>

          <div className="price-final-now">
            R$ 19,90
          </div>

          <a
            href={SYNCPAY_CHECKOUT_URL}
            onClick={handleCheckoutClick}
            className="btn-cta text-lg sm:text-xl py-5 px-10 sm:px-14 w-full sm:w-auto shadow-2xl"
          >
            QUERO RECEBER AGORA
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-[#b9ae9c]">
            <span className="flex items-center gap-1.5">
              <span className="text-[#D9A441] font-bold">✓</span> Compra segura
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#D9A441] font-bold">✓</span> 7 dias de garantia
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#D9A441] font-bold">✓</span> Reembolso garantido
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* RODAPÉ                                                    */}
      {/* ========================================================= */}
      <footer className="relative py-8 px-4 text-center text-xs text-[#6f6759] border-t border-white/5 z-10">
        <div className="max-w-3xl mx-auto space-y-2">
          <p>© 2026 Combo Natal sem Telas. Todos os direitos reservados.</p>
          <p className="text-[11px] text-[#6f6759]/80">
            Pagamentos processados com tecnologia segura via SyncPay. Ao clicar em comprar, você
            será redirecionado com segurança para concluir seu pedido.
          </p>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* BARRA FIXA MOBILE (STICKY CTA)                            */}
      {/* ========================================================= */}
      <div
        className={`fixed left-0 right-0 bottom-0 z-40 p-3 sm:hidden bg-[#050505]/95 backdrop-blur-md border-t border-[#D9A441]/40 transition-transform duration-400 ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <a
          href={SYNCPAY_CHECKOUT_URL}
          onClick={handleCheckoutClick}
          className="btn-cta w-full py-4 text-sm font-bold shadow-xl flex items-center justify-center gap-2"
        >
          <span>QUERO RECEBER AGORA</span>
          <span className="text-[#39FF14] font-black text-base drop-shadow-[0_0_8px_rgba(57,255,20,0.7)]">· R$ 19,90</span>
        </a>
        <div className="flex items-center justify-center gap-3 text-[10px] text-[#b9ae9c] mt-2">
          <span>✓ Compra 100% Segura</span>
          <span>✓ Acesso Imediato</span>
          <span>✓ 7 Dias de Garantia</span>
        </div>
      </div>
    </div>
  );
}
