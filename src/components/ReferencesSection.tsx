import { ExternalLink } from "lucide-react";
import type { CreditoImagen, ProyectoInfo, ReferenciaItem } from "../content";

interface ReferencesSectionProps {
  referencias: ReferenciaItem[];
  creditosImagenes: CreditoImagen[];
  proyecto: ProyectoInfo;
}

export function ReferencesSection({
  referencias,
  creditosImagenes,
  proyecto,
}: ReferencesSectionProps) {
  const creditosValidos = creditosImagenes.filter(
    (c) => c.descripcion.trim() || c.credito.trim()
  );

  return (
    <section
      id="referencias"
      aria-labelledby="titulo-referencias"
      className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)]/55"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-ochre)] uppercase">
            Archivo bibliográfico
          </p>
          <h2
            id="titulo-referencias"
            className="font-serif-editorial mt-2 text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl"
          >
            Referencias y créditos
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Fuentes primarias, informes de memoria histórica, prensa y
            cartografía consultadas para este ejercicio académico. Los enlaces se
            abren en una pestaña nueva.
          </p>

          <ol className="mt-7 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {referencias.map((ref, idx) => (
              <li
                key={idx}
                className="flex flex-col gap-1.5 py-3.5 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="leading-relaxed text-[var(--text-primary)]">
                  <span className="font-mono-clock mr-2 text-xs text-[var(--text-muted)]">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  {ref.cita}
                </span>

                {ref.enlace && ref.enlace.trim() && (
                  <a
                    href={ref.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--accent-olive)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent-olive-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] whitespace-nowrap"
                  >
                    <span>Consultar enlace</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ol>

          {/* Créditos de imágenes (solo se muestra si hay entradas en content.ts) */}
          {creditosValidos.length > 0 && (
            <div className="mt-9">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                Créditos de imágenes
              </h3>
              <ul className="mt-3 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)] text-sm">
                {creditosValidos.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="text-[var(--text-primary)]">
                      {item.descripcion}{" "}
                      {item.credito && (
                        <span className="text-[var(--text-secondary)]">
                          — {item.credito}
                        </span>
                      )}
                    </span>
                    {item.enlace && item.enlace.trim() && (
                      <a
                        href={item.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--accent-olive)] underline underline-offset-4 whitespace-nowrap"
                      >
                        <span>Fuente</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pie editorial sobrio */}
          <footer className="mt-10 border-t border-[var(--border-hairline)] pt-6 text-xs text-[var(--text-muted)]">
            <p className="font-medium text-[var(--text-secondary)]">
              {proyecto.grupo} · {proyecto.curso}
            </p>
            <p className="mt-1">
              {proyecto.integrantes.map((i) => i.nombre).join(" · ")}
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
