"use client";

import { useState } from "react";

export default function ContactoClient() {
  const [copied, setCopied] = useState(false);
  const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest">
            Estamos para ti
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Contáctanos
          </h1>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            ¿Tienes dudas o quieres hacer un pedido especial? Escríbenos, con
            gusto te atendemos.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info cards */}
          <div className="space-y-5">
            {[
              {
                icon: "📍",
                title: "Ubicación",
                lines: ["Puerto Vallarta, Jalisco", "México"],
              },
              {
                icon: "🕐",
                title: "Horario de atención",
                lines: ["Lunes a Domingo", "8:00 am – 10:00 pm"],
              },
              {
                icon: "🌹",
                title: "¿Qué ofrecemos?",
                lines: [
                  "Arreglos siempre disponibles",
                  "Flores de temporada",
                  "Pedidos especiales con previo aviso",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm border border-gray-100"
              >
                <span className="text-3xl shrink-0">{card.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {card.title}
                  </h3>
                  {card.lines.map((l) => (
                    <p key={l} className="text-gray-500 text-sm">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.535 5.855L0 24l6.335-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.573-.498-5.055-1.362L3.5 21.5l.875-3.329A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Escríbenos por WhatsApp
              </h2>
              <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                La forma más rápida de hacer tu pedido o resolver cualquier
                duda. Te respondemos a la brevedad.
              </p>
            </div>

            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                "Hola, me interesa hacer un pedido de arreglos florales. ¿Me pueden ayudar? 🌹",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.535 5.855L0 24l6.335-1.505A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.846 0-3.573-.498-5.055-1.362L3.5 21.5l.875-3.329A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Iniciar conversación en WhatsApp
            </a>

            <div className="w-full pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-500">
              <p className="font-medium text-gray-700">
                ¿Quieres copiar nuestro número?
              </p>
              <button
                onClick={() => handleCopy(waNumber)}
                className="text-primary-500 hover:text-primary-700 font-medium transition-colors"
              >
                {copied ? "✓ ¡Copiado!" : `+${waNumber}`}
              </button>
            </div>
          </div>
        </div>

        {/* Eslogan */}
        <div className="text-center mt-16 py-12 bg-charcoal-900 rounded-3xl">
          <span className="text-gold-400 text-5xl leading-none font-display">"</span>
          <p className="font-display text-white text-2xl font-semibold italic max-w-xl mx-auto px-8 -mt-2">
            Regálale a esa persona especial un detalle hermoso
          </p>
          <p className="text-gold-500 text-sm mt-4 font-medium tracking-widest uppercase">
            Mas que Flores · Puerto Vallarta
          </p>
        </div>
      </div>
    </div>
  );
}
