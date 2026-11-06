/**
 * Meta Pixel Integration & SyncPay Checkout Handler
 *
 * Configuração limpa e segura do Pixel da Meta para o evento Purchase e InitiateCheckout.
 * Não contém nenhum ID ou token de terceiros.
 */

export const SYNCPAY_CHECKOUT_URL = 'https://link.syncpayments.com.br/o3ZxFy';

export interface PixelEventLog {
  id: string;
  eventName: string;
  params?: Record<string, any>;
  timestamp: string;
}

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __pixelLogs?: PixelEventLog[];
    __onPixelEvent?: (log: PixelEventLog) => void;
  }
}

// Pixel ID oficial do usuário:
export const DEFAULT_META_PIXEL_ID = '1459440116119440';

const STORAGE_KEY = 'user_meta_pixel_id';

export function getSavedPixelId(): string {
  if (typeof window === 'undefined') return DEFAULT_META_PIXEL_ID;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored.trim()) {
    return stored.trim();
  }
  return (
    DEFAULT_META_PIXEL_ID.trim() ||
    (import.meta.env.VITE_META_PIXEL_ID as string) ||
    ''
  );
}

export function savePixelId(pixelId: string): void {
  if (typeof window === 'undefined') return;
  const cleanId = pixelId.trim();
  if (cleanId) {
    localStorage.setItem(STORAGE_KEY, cleanId);
    initMetaPixel(cleanId);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function initMetaPixel(pixelId?: string): boolean {
  if (typeof window === 'undefined') return false;

  const id = pixelId || getSavedPixelId();
  if (!id) {
    console.info(
      'ℹ️ [Meta Pixel] Nenhum Pixel ID configurado ainda. Insira seu Pixel ID nas configurações ou via VITE_META_PIXEL_ID.'
    );
    return false;
  }

  // Se o snippet do Facebook ainda não foi carregado
  if (!window.fbq) {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
  }

  try {
    window.fbq?.('init', id);
    trackPageView();
    console.log(`✅ [Meta Pixel] Inicializado com sucesso para o ID: ${id}`);
    return true;
  } catch (err) {
    console.error('❌ [Meta Pixel] Erro ao inicializar pixel:', err);
    return false;
  }
}

function logPixelEvent(eventName: string, params?: Record<string, any>) {
  const log: PixelEventLog = {
    id: Math.random().toString(36).substring(2, 9),
    eventName,
    params,
    timestamp: new Date().toLocaleTimeString('pt-BR'),
  };

  if (!window.__pixelLogs) {
    window.__pixelLogs = [];
  }
  window.__pixelLogs.unshift(log);

  if (window.__onPixelEvent) {
    window.__onPixelEvent(log);
  }
}

export function trackPageView(): void {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
  logPixelEvent('PageView');
}

export function trackInitiateCheckout(product = {
  name: 'Combo Natal sem Telas',
  value: 19.90,
  currency: 'BRL',
}): void {
  const payload = {
    content_name: product.name,
    content_category: 'Atividades Infantis',
    value: product.value,
    currency: product.currency,
    num_items: 1,
  };

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', payload);
  }
  logPixelEvent('InitiateCheckout', payload);
}

export function trackPurchase(data?: {
  orderId?: string;
  value?: number;
  currency?: string;
  contentName?: string;
}): void {
  const payload = {
    content_name: data?.contentName || 'Combo Natal sem Telas',
    content_type: 'product',
    content_ids: ['combo-natal-sem-telas'],
    value: data?.value ?? 19.90,
    currency: data?.currency || 'BRL',
    num_items: 1,
    order_id: data?.orderId || `PEDIDO-${Date.now()}`,
  };

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', payload);
  }
  logPixelEvent('Purchase', payload);
  console.log('🎉 [Meta Pixel] Evento PURCHASE disparado:', payload);
}

/**
 * Função para redirecionar de forma confiável para o checkout da SyncPay
 * disparando o evento de InitiateCheckout do Pixel antes.
 */
export function handleCheckoutClick(e?: React.MouseEvent) {
  if (e) {
    e.preventDefault();
  }

  // Dispara InitiateCheckout no Pixel
  trackInitiateCheckout();

  // Redireciona com segurança para a SyncPay
  window.location.href = SYNCPAY_CHECKOUT_URL;
}
