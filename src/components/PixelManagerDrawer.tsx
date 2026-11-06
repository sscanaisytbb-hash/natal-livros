import React, { useState, useEffect } from 'react';
import {
  getSavedPixelId,
  savePixelId,
  trackPurchase,
  trackInitiateCheckout,
  trackPageView,
  PixelEventLog,
} from '../lib/pixel';
import { Settings, CheckCircle2, AlertCircle, ShoppingCart, Activity, X } from 'lucide-react';

export const PixelManagerDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pixelId, setPixelId] = useState('');
  const [savedId, setSavedId] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [logs, setLogs] = useState<PixelEventLog[]>([]);

  useEffect(() => {
    const current = getSavedPixelId();
    setPixelId(current);
    setSavedId(current);

    // Carrega logs existentes
    if (window.__pixelLogs) {
      setLogs([...window.__pixelLogs]);
    }

    // Registra listener de novos logs
    window.__onPixelEvent = (newLog: PixelEventLog) => {
      setLogs((prev) => [newLog, ...prev.slice(0, 9)]);
    };

    // Suporte para URL de teste de compra: ?purchase_test=true
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('purchase_test') === 'true' || params.get('status') === 'approved') {
        trackPurchase({ orderId: 'PEDIDO-TESTE-URL' });
        setFeedback('Evento Purchase disparado automaticamente via parâmetro de URL!');
        setIsOpen(true);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    savePixelId(pixelId);
    setSavedId(pixelId.trim());
    setFeedback(
      pixelId.trim()
        ? `Pixel ID ${pixelId.trim()} ativado e salvo com sucesso!`
        : 'Pixel ID removido.'
    );
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleTestPurchase = () => {
    trackPurchase({
      orderId: `TEST-${Math.floor(100000 + Math.random() * 900000)}`,
      value: 19.90,
      currency: 'BRL',
      contentName: 'Combo Natal sem Telas',
    });
    setFeedback('Evento "Purchase" disparado com sucesso! Verifique no Meta Pixel Helper.');
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleTestCheckout = () => {
    trackInitiateCheckout();
    setFeedback('Evento "InitiateCheckout" disparado com sucesso!');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <>
      {/* Botão flutuante discreto no canto inferior direito */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-[#121212]/90 hover:bg-[#1a1a1a] text-[#F6EEE0] text-xs font-semibold px-3 py-2 rounded-full border border-[#D9A441]/50 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Configurar e testar Meta Pixel"
        >
          <Settings className="w-4 h-4 text-[#D9A441] animate-spin-slow" />
          <span className="hidden sm:inline">Meta Pixel:</span>
          {savedId ? (
            <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Ativo
            </span>
          ) : (
            <span className="text-[#b9ae9c] text-[11px]">Configurar</span>
          )}
        </button>
      </div>

      {/* Modal / Painel de Configuração do Pixel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0f0f0f] border border-[#D9A441]/40 rounded-2xl p-6 shadow-2xl text-[#F6EEE0] space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#D9A441]/10 rounded-lg border border-[#D9A441]/30">
                  <Activity className="w-5 h-5 text-[#D9A441]" />
                </div>
                <div>
                  <h3 className="font-montserrat font-bold text-base text-[#F6EEE0]">
                    Integração Meta Pixel
                  </h3>
                  <p className="text-xs text-[#b9ae9c]">
                    Configure seu Pixel ID e teste o evento Purchase
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status atual */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#b9ae9c]">Status do Pixel:</span>
                {savedId ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    ID {savedId} Conectado
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Aguardando seu Pixel ID
                  </span>
                )}
              </div>
            </div>

            {/* Formulário para definir/alterar ID */}
            <form onSubmit={handleSave} className="space-y-3">
              <label className="block text-xs font-medium text-[#b9ae9c]">
                Seu Meta Pixel ID (Facebook):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: 123456789012345"
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  className="flex-1 bg-black border border-white/15 focus:border-[#D9A441] rounded-xl px-3.5 py-2.5 text-sm text-[#F6EEE0] placeholder-white/20 outline-none font-mono"
                />
                <button
                  type="submit"
                  className="bg-[#D9A441] hover:bg-[#c49235] text-[#1a0b00] font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  Salvar
                </button>
              </div>
            </form>

            {/* Feedback */}
            {feedback && (
              <div className="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs animate-fade-in">
                {feedback}
              </div>
            )}

            {/* Botões de Teste */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <p className="text-xs font-semibold text-[#D9A441] uppercase tracking-wider">
                Área de Teste de Eventos:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleTestPurchase}
                  className="flex items-center justify-center gap-1.5 bg-[#B3131B] hover:bg-[#cf1821] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Testar Purchase
                </button>
                <button
                  type="button"
                  onClick={handleTestCheckout}
                  className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 text-[#F6EEE0] text-xs font-bold py-2.5 px-3 rounded-xl transition-all active:scale-95 cursor-pointer border border-white/10"
                >
                  Testar Checkout
                </button>
              </div>
            </div>

            {/* Histórico recente de eventos disparados */}
            <div className="space-y-1.5">
              <p className="text-[11px] text-[#b9ae9c] uppercase tracking-wider">
                Eventos disparados nesta sessão ({logs.length}):
              </p>
              <div className="max-h-28 overflow-y-auto space-y-1 p-2 bg-black/60 rounded-xl border border-white/5 font-mono text-[11px]">
                {logs.length === 0 ? (
                  <p className="text-white/30 text-center py-2">
                    Nenhum evento registrado ainda
                  </p>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0"
                    >
                      <span
                        className={
                          log.eventName === 'Purchase'
                            ? 'text-emerald-400 font-bold'
                            : log.eventName === 'InitiateCheckout'
                            ? 'text-amber-400'
                            : 'text-[#D9A441]'
                        }
                      >
                        ● {log.eventName}
                      </span>
                      <span className="text-white/40 text-[10px]">{log.timestamp}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Rodapé informativo */}
            <div className="text-[11px] text-white/50 leading-relaxed pt-2 border-t border-white/5">
              💡 Todos os botões da página direcionam para seu link SyncPay (
              <span className="text-[#D9A441] underline">link.syncpayments.com.br/o3ZxFy</span>
              ) disparando automaticamente o evento <b>InitiateCheckout</b>. O evento <b>Purchase</b> está
              100% pronto para sua página de obrigado / webhook.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
