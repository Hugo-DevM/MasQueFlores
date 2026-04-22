"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, total } =
    useCart();

  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

  function buildWhatsAppMsg() {
    const sep = "─────────────────────────────";
    const folio = `#MQF-${Date.now().toString().slice(-5)}`;
    const fecha = new Date().toLocaleDateString("es-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const header = `🌹 *Nuevo Pedido — Mas que Flores*\n${sep}\n\n*📋 RESUMEN DEL PEDIDO*\n`;

    const lines = items.map((i, idx) => {
      const subtotal = i.product.price * i.quantity;
      return (
        `\n*${idx + 1}.* ${i.product.name}\n` +
        `   Cantidad: ${i.quantity}  •  Precio c/u: $${i.product.price.toLocaleString("es-MX")}\n` +
        `   Subtotal: $${subtotal.toLocaleString("es-MX")}`
      );
    });

    const footer =
      `\n\n${sep}\n` +
      `💰 *Total a pagar: $${total.toLocaleString("es-MX")} MXN*\n` +
      `${sep}\n\n` +
      `📅 *Fecha:* ${fecha}\n` +
      `🔖 *Folio:* ${folio}\n\n` +
      `Hola, me gustaría confirmar este pedido. ¿Podrían indicarme los pasos a seguir para el pago y la entrega? Muchas gracias 🙏`;

    return encodeURIComponent(header + lines.join("\n") + footer);
  }

  function handleCheckout() {
    const msg = buildWhatsAppMsg();
    window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 text-lg">Mi carrito</h2>
          <button
            onClick={closeCart}
            className="p-1.5 text-gray-500 hover:text-primary-500 transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-6xl">🛍️</span>
              <p className="text-gray-500 text-sm">
                Agrega flores para comenzar
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-primary-50 shrink-0">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🌸
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-primary-600 font-semibold text-sm mt-0.5">
                      ${item.product.price.toLocaleString("es-MX")}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary-400 hover:text-primary-500 transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-primary-400 hover:text-primary-500 transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Total</span>
              <span className="text-primary-600 font-bold text-xl">
                ${total.toLocaleString("es-MX")}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.535 5.855L0 24l6.335-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.573-.498-5.055-1.362L3.5 21.5l.875-3.329A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Pedir por WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
