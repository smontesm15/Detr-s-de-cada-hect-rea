import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  Check,
  ExternalLink,
  FileText,
} from "lucide-react";
import type { DiaContenido } from "../content";
import {
  calcularSegundosLecturaDia,
  diaTieneTexto,
  formatearMinYS,
} from "../utils/readingTime";

interface DayReaderProps {
  dia: DiaContenido;
  totalDias: number;
  tesis: string;
  isVisited: boolean;
  onMarkVisited: (dayNumber: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

function renderTextoMultiparrafo(texto: string) {
  const bloques = texto
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  return bloques.map((bloque, idx) => (
    <p
      key={idx}
      className="prose-editorial text-[var(--text-primary)] [&:not(:first-child)]:mt-4"
    >
      {bloque}
    </p>
  ));
}

export function DayReader({
  dia,
  totalDias,
  tesis,
  isVisited,
  onMarkVisited,
  onPrev,
  onNext,
}: DayReaderProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [imageError, setImageError] = useState(false);

  const hasText = diaTieneTexto(dia);
  const readingSeconds = calcularSegundosLecturaDia(dia);
  const showTesis = dia.numero === 1 || dia.numero === 7;
  const isSourceDay = dia.numero >= 2 && dia.numero <= 6;
  const tituloMostrado = dia.titulo.trim() || `Día ${dia.numero}`;

  useEffect(() => {
    setImageError(false);
  }, [dia.numero, dia.imagen?.src]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || isVisited) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onMarkVisited(dia.numero);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [dia.numero, isVisited, onMarkVisited]);

  const metaFuente = dia.fuente
    ? [dia.fuente.autor, dia.fuente.tipo, dia.fuente.anio]
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return (
    <article
      aria-labelledby={`dia-titulo-${dia.numero}`}
      className="min-w-0 flex-1 max-w-[68ch]"
    >
      {/* Encabezado del día */}
      <header className="border-b border-[var(--border-hairline)] pb-6">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[var(--text-muted)]">
          <span className="font-semibold tracking-wider text-[var(--accent-olive)] uppercase">
            Día {dia.numero} de {totalDias}
          </span>

          {dia.integrante.trim() && (
            <>
              <span aria-hidden="true">·</span>
              <span>Por {dia.integrante}</span>
            </>
          )}

          {isVisited && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-semibold text-[var(--accent-olive)]">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Visto</span>
              </span>
            </>
          )}
        </div>

        <h2
          id={`dia-titulo-${dia.numero}`}
          className="font-serif-editorial mt-2 text-2xl font-semibold leading-tight text-[var(--text-primary)] [text-wrap:balance] sm:text-3xl"
        >
          {tituloMostrado}
        </h2>

        {dia.subtitulo.trim() && (
          <p className="mt-2 text-base text-[var(--text-secondary)]">
            {dia.subtitulo}
          </p>
        )}

        {hasText && (
          <p className="mt-3 text-xs font-medium text-[var(--text-muted)]">
            Lectura estimada:{" "}
            <span className="font-mono-clock text-[var(--text-secondary)]">
              {formatearMinYS(readingSeconds)}
            </span>
          </p>
        )}
      </header>

      {/* Bloque destacado de Tesis en Día 1 y Día 7 */}
      {showTesis && (
        <section
          aria-label="Tesis central de la investigación"
          className="mt-7 rounded-sm border border-[var(--border-strong)] bg-[var(--bg-surface)] p-5 sm:p-6"
        >
          <p className="text-xs font-semibold tracking-wider text-[var(--accent-ochre)] uppercase">
            Tesis central
          </p>
          <p className="font-serif-editorial mt-2 text-[17px] leading-relaxed font-medium text-[var(--text-primary)] sm:text-lg">
            “{tesis}”
          </p>
        </section>
      )}

      {/* Plantilla de fuente y contextualización para Días 2 a 6 */}
      {isSourceDay && (
        <section aria-label="Ficha de la fuente analizada" className="mt-7 space-y-4">
          {dia.fuente && dia.fuente.titulo.trim() && (
            <div className="rounded-sm border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[var(--accent-ochre)] uppercase">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>La fuente</span>
              </div>

              <h3 className="font-serif-editorial mt-2 text-lg font-semibold leading-snug text-[var(--text-primary)]">
                {dia.fuente.titulo}
              </h3>

              {metaFuente.length > 0 && (
                <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                  {metaFuente.map((item, idx) => (
                    <span key={idx}>
                      {idx > 0 && (
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                      )}
                      {item}
                    </span>
                  ))}
                </p>
              )}

              {dia.fuente.enlace.trim() && (
                <a
                  href={dia.fuente.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-olive)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--accent-olive-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)]"
                >
                  <span>Abrir fuente en pestaña nueva</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          )}

          {dia.contextualizacion && dia.contextualizacion.titulo.trim() && (
            <p className="border-b border-[var(--border-hairline)] pb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">
                Se lee junto con:{" "}
              </span>
              {dia.contextualizacion.enlace.trim() ? (
                <a
                  href={dia.contextualizacion.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-1 text-[var(--accent-olive)] underline decoration-[var(--border-strong)] underline-offset-4 hover:text-[var(--accent-olive-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)]"
                >
                  <span>{dia.contextualizacion.titulo}</span>
                  <ExternalLink
                    className="inline h-3 w-3 shrink-0 self-center"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <span>{dia.contextualizacion.titulo}</span>
              )}
            </p>
          )}
        </section>
      )}

      {/* Aviso cuando el día aún no tiene texto (Días 2 a 6) */}
      {!hasText ? (
        <div
          role="status"
          className="mt-8 rounded-sm border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)]/60 px-6 py-10 text-center"
        >
          <BookMarked
            className="mx-auto h-5 w-5 text-[var(--text-muted)]"
            aria-hidden="true"
          />
          <p className="font-serif-editorial mt-3 text-lg font-medium text-[var(--text-primary)]">
            Este día se publicará pronto
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            La ficha de la fuente y su lectura de contextualización ya están
            registradas para el análisis del equipo.
          </p>
        </div>
      ) : (
        <div className="mt-7 space-y-7">
          {/* Imagen opcional (solo si existe src real) */}
          {dia.imagen && dia.imagen.src.trim() && !imageError && (
            <figure className="overflow-hidden rounded-sm border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
              <img
                src={dia.imagen.src}
                alt={
                  dia.imagen.alt.trim() ||
                  dia.imagen.pieDeFoto.trim() ||
                  `Documento visual del Día ${dia.numero}`
                }
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-auto w-full object-cover"
              />
              {(dia.imagen.pieDeFoto.trim() || dia.imagen.credito.trim()) && (
                <figcaption className="border-t border-[var(--border-hairline)] px-4 py-2.5 text-xs text-[var(--text-muted)]">
                  {dia.imagen.pieDeFoto.trim() && (
                    <span className="font-serif-editorial italic text-[var(--text-secondary)]">
                      {dia.imagen.pieDeFoto}
                    </span>
                  )}
                  {dia.imagen.pieDeFoto.trim() && dia.imagen.credito.trim() && (
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                  )}
                  {dia.imagen.credito.trim() && (
                    <span>Crédito: {dia.imagen.credito}</span>
                  )}
                </figcaption>
              )}
            </figure>
          )}

          {/* Párrafos principales */}
          {dia.parrafos.some((p) => p.trim().length > 0) && (
            <div className="space-y-5">
              {dia.parrafos
                .filter((p) => p.trim().length > 0)
                .map((parrafo, index) => (
                  <p
                    key={index}
                    className={`prose-editorial text-[var(--text-primary)] ${
                      index === 0
                        ? "first-letter:font-serif-editorial first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:text-5xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-[var(--accent-olive)]"
                        : ""
                    }`}
                  >
                    {parrafo}
                  </p>
                ))}
            </div>
          )}

          {/* Bloques analíticos de los días 2 a 6 (solo se muestran si tienen contenido) */}
          {dia.contexto?.trim() && (
            <section className="border-t border-[var(--border-hairline)] pt-5">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--accent-ochre)] uppercase">
                Contexto: quién habla y cuándo
              </h3>
              <div className="mt-2.5">
                {renderTextoMultiparrafo(dia.contexto)}
              </div>
            </section>
          )}

          {dia.perspectiva?.trim() && (
            <section className="border-t border-[var(--border-hairline)] pt-5">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--accent-ochre)] uppercase">
                Perspectiva
              </h3>
              <div className="mt-2.5">
                {renderTextoMultiparrafo(dia.perspectiva)}
              </div>
            </section>
          )}

          {dia.aporteALaTesis?.trim() && (
            <section className="border-t border-[var(--border-hairline)] pt-5">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--accent-ochre)] uppercase">
                Qué aporta a nuestra tesis
              </h3>
              <div className="mt-2.5">
                {renderTextoMultiparrafo(dia.aporteALaTesis)}
              </div>
            </section>
          )}

          {dia.dilemaEtico?.trim() && (
            <section className="border-t border-[var(--border-hairline)] pt-5">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--accent-ochre)] uppercase">
                Dilema ético
              </h3>
              <div className="mt-2.5">
                {renderTextoMultiparrafo(dia.dilemaEtico)}
              </div>
            </section>
          )}

          {/* Cita destacada opcional */}
          {dia.cita?.trim() && (
            <blockquote className="border-y border-[var(--border-strong)] py-5">
              <p className="font-serif-editorial text-xl leading-relaxed italic text-[var(--text-primary)]">
                “{dia.cita.trim()}”
              </p>
            </blockquote>
          )}

          {/* Bloque editable "Nuestra postura" en Día 7 (oculto si está vacío) */}
          {dia.numero === 7 && dia.nuestraPostura?.trim() && (
            <section className="rounded-sm border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 sm:p-6">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--accent-olive)] uppercase">
                Nuestra postura
              </h3>
              <div className="mt-2.5">
                {renderTextoMultiparrafo(dia.nuestraPostura)}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Centinela de final de lectura para marcar el día como "visto" */}
      <div
        ref={sentinelRef}
        className="mt-8 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4 text-xs text-[var(--text-muted)]"
      >
        <span>
          {isVisited
            ? `Día ${dia.numero} marcado como visto`
            : `Fin del Día ${dia.numero}`}
        </span>
        {isVisited && (
          <span className="inline-flex items-center gap-1 font-medium text-[var(--accent-olive)]">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Lectura registrada</span>
          </span>
        )}
      </div>

      {/* Navegación Anterior / Siguiente */}
      <nav
        aria-label="Navegación entre días"
        className="mt-6 flex flex-col gap-4 border-t border-[var(--border-hairline)] pt-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={dia.numero <= 1}
            className="inline-flex min-h-[44px] items-center gap-2 rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Anterior</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={dia.numero >= totalDias}
            className="inline-flex min-h-[44px] items-center gap-2 rounded bg-[var(--accent-olive)] px-4 py-2 text-sm font-medium text-[#FBF9F4] transition-colors hover:bg-[var(--accent-olive-hover)] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] cursor-pointer whitespace-nowrap"
          >
            <span>Siguiente</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          Atajo de teclado: flechas ← y →
        </p>
      </nav>
    </article>
  );
}
