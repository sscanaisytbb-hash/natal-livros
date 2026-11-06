import React, { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Como recebo o produto?',
    a: 'Logo após a confirmação do pagamento pela SyncPay, você recebe o acesso diretamente no seu e-mail para baixar todos os arquivos em PDF imediatamente no celular, tablet ou computador.',
  },
  {
    q: 'O que vem no Combo Natal sem Telas?',
    a: 'Você recebe o Livro principal com 50 páginas com desenhos de Natal para colorir, além de 3 super bônus: 30 Caça-Palavras natalinos em vários níveis, Jogos de Natal interativos para brincar em família, e o molde oficial da Cartinha para o Papai Noel. Tudo pronto para imprimir quantas vezes quiser.',
  },
  {
    q: 'Serve para crianças que ainda não sabem ler?',
    a: 'Sim, com certeza! Os menores se divertem muito colorindo os desenhos e desenvolvendo a coordenação motora. Nos caça-palavras e jogos, pais ou irmãos mais velhos podem ler e participar juntos estimulando a união familiar.',
  },
  {
    q: 'Dá para brincar em família?',
    a: 'Com certeza! É o objetivo principal: reunir a família na mesa durante o mês de dezembro e na noite de Natal, longe das telas, fortalecendo laços e criando memórias afetivas inesquecíveis.',
  },
  {
    q: 'E se eu não gostar?',
    a: 'Você conta com nossa garantia incondicional de 7 dias. Se por qualquer motivo você não ficar 100% satisfeito(a), basta solicitar o reembolso e devolvemos cada centavo do seu dinheiro.',
  },
];

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="max-w-[760px] mx-auto space-y-3">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-[#0e0e0e] ${
              isOpen
                ? 'border-[#D9A441] shadow-[0_4px_20px_rgba(217,164,65,0.15)]'
                : 'border-white/10 hover:border-white/25'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
            >
              <span className="font-montserrat font-bold text-base sm:text-lg text-[#F6EEE0]">
                {faq.q}
              </span>
              <span
                className={`text-[#D9A441] text-2xl font-light transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-45' : 'rotate-0'
                }`}
              >
                +
              </span>
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 text-[#b9ae9c] text-sm sm:text-base leading-relaxed animate-fade-in border-t border-white/5 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
