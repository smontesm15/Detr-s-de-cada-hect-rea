import { Check } from "lucide-react";
import type { DiaContenido } from "../content";
import { diaTieneTexto } from "../utils/readingTime";

interface TimelineNavProps {
  dias: DiaContenido[];
  activeDay: number;
  visitedDays: Set<number>;
  onSelectDay: (dayNumber: number) => void;
}

export function MobileTimelineStrip({
  dias,
  activeDay,
  visitedDays,
  onSelectDay,
}: TimelineNavProps) {
  return (
    <nav
      aria-label="Línea de tiempo de lectura (7 días)"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/95 backdrop-blur-sm lg:hidden"
    >
      <div className="mx-auto max-w-6xl px-3 py-1 sm:px-6">
        <div className="relative flex items-center justify-between">
          <div
            className="pointer-events-none absolute right-5 left-5 top-1/2 h-px -translate-y-1/2 bg-[var(--border-hairline)]"
            aria-hidden="true"
          />
          {dias.map((dia) => {
            const isActive = dia.numero === activeDay;
            const isVisited = visitedDays.has(dia.numero);
            const hasText = diaTieneTexto(dia);
            const labelBase = dia.titulo.trim() || `Día ${dia.numero}`;

            return (
              <button
                key={dia.numero}
                type="button"
                onClick={() => onSelectDay(dia.numero)}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Día ${dia.numero}: ${labelBase}${
                  isVisited ? ", visto" : ""
                }${!hasText ? ", se publicará pronto" : ""}`}
                className="relative z-10 flex min-h-[38px] min-w-[36px] items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] cursor-pointer"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                    isActive
                      ? "border-[var(--accent-olive)] bg-[var(--accent-olive)] text-[#FBF9F4]"
                      : isVisited
                      ? "border-[var(--accent-olive)] bg-[var(--accent-olive-soft)] text-[var(--accent-olive)]"
                      : "border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:border-[var(--accent-olive)]"
                  }`}
                >
                  {isVisited && !isActive ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <span className="font-mono-clock">{dia.numero}</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function DesktopTimelineSidebar({
  dias,
  activeDay,
  visitedDays,
  onSelectDay,
}: TimelineNavProps) {
  const totalVistos = visitedDays.size;

  return (
    <aside className="hidden lg:block lg:w-64 lg:shrink-0">
      <nav
        aria-label="Línea de tiempo de lectura (7 días)"
        className="sticky top-20 border-r border-[var(--border-hairline)] pr-6"
      >
        <div className="flex items-baseline justify-between border-b border-[var(--border-hairline)] pb-3">
          <h2 className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
            Línea de tiempo
          </h2>
          <span className="font-mono-clock text-xs text-[var(--text-muted)]">
            {totalVistos}/7 vistos
          </span>
        </div>

        <ol className="relative mt-5 space-y-3">
          <div
            className="pointer-events-none absolute top-4 bottom-4 left-[15px] w-px bg-[var(--border-hairline)]"
            aria-hidden="true"
          />
          {dias.map((dia) => {
            const isActive = dia.numero === activeDay;
            const isVisited = visitedDays.has(dia.numero);
            const hasText = diaTieneTexto(dia);
            const tituloCorto = dia.titulo.trim()
              ? dia.titulo
              : dia.fuente?.autor
              ? `Fuente: ${dia.fuente.autor}`
              : "Por publicar";

            return (
              <li key={dia.numero} className="relative">
                <button
                  type="button"
                  onClick={() => onSelectDay(dia.numero)}
                  aria-current={isActive ? "step" : undefined}
                  className={`group flex w-full items-start gap-3 rounded py-1.5 pr-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] cursor-pointer ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span
                    className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                      isActive
                        ? "border-[var(--accent-olive)] bg-[var(--accent-olive)] text-[#FBF9F4]"
                        : isVisited
                        ? "border-[var(--accent-olive)] bg-[var(--accent-olive-soft)] text-[var(--accent-olive)]"
                        : "border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] group-hover:border-[var(--accent-olive)]"
                    }`}
                  >
                    {isVisited && !isActive ? (
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <span className="font-mono-clock">{dia.numero}</span>
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-semibold ${
                          isActive
                            ? "text-[var(--accent-olive)]"
                            : "text-[var(--text-muted)]"
                        }`}
                      >
                        Día {dia.numero}
                      </span>
                      {isVisited && (
                        <span className="text-[11px] font-medium text-[var(--accent-olive)]">
                          Visto
                        </span>
                      )}
                    </span>
                    <span
                      className={`mt-0.5 block text-sm leading-snug ${
                        isActive ? "font-semibold" : "font-normal"
                      } ${!hasText ? "italic text-[var(--text-muted)]" : ""}`}
                    >
                      {tituloCorto}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex flex-col gap-2 border-t border-[var(--border-hairline)] pt-4 text-xs">
          <a
            href="#portada"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--accent-olive)]"
          >
            ↑ Volver a la portada
          </a>
          <a
            href="#referencias"
            className="text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--accent-olive)]"
          >
            ↓ Referencias y créditos
          </a>
        </div>
      </nav>
    </aside>
  );
}