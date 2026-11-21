import { ArrowDownRight, BookOpen } from "lucide-react";
import type { ProyectoInfo } from "../content";

interface CoverSectionProps {
  proyecto: ProyectoInfo;
  onStartReading: () => void;
}

export function CoverSection({ proyecto, onStartReading }: CoverSectionProps) {
  return (
    <section
      id="portada"
      aria-labelledby="titulo-principal"
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="max-w-4xl">
          {/* Metadatos académicos sin cápsulas */}
          <p className="text-xs font-medium tracking-wider text-[var(--text-muted)] sm:text-sm">
            <span>{proyecto.grupo}</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>{proyecto.curso}</span>
          </p>

          {/* Título principal */}
          <h1
            id="titulo-principal"
            className="font-serif-editorial mt-3 text-3xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] [text-wrap:balance] sm:text-4xl lg:text-[2.75rem]"
          >
            {proyecto.titulo}
          </h1>

          {proyecto.subtitulo?.trim() && (
            <p className="font-serif-editorial mt-2.5 text-lg leading-snug text-[var(--text-secondary)] sm:text-xl">
              {proyecto.subtitulo}
            </p>
          )}

          <p className="mt-3 text-sm text-[var(--text-muted)] sm:text-base">
            {proyecto.audiencia}
          </p>

          {/* Pregunta de indagación */}
          <div className="mt-7 rounded-sm border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 sm:p-6">
            <h2 className="text-xs font-semibold tracking-wider text-[var(--accent-ochre)] uppercase">
              Pregunta de indagación
            </h2>
            <p className="font-serif-editorial mt-2 text-lg leading-relaxed text-[var(--text-primary)] sm:text-xl">
              {proyecto.preguntaIndagacion}
            </p>
          </div>

          {/* Integrantes */}
          <div className="mt-7 border-t border-[var(--border-hairline)] pt-5">
            <h2 className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
              Equipo investigador
            </h2>
            <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {proyecto.integrantes.map((persona) => (
                <li
                  key={persona.nombre}
                  className="flex flex-col border-b border-[var(--border-hairline)]/60 pb-1.5 sm:border-b-0 sm:pb-0"
                >
                  <span className="font-medium text-[var(--text-primary)]">
                    {persona.nombre}
                  </span>
                  {persona.carrera.trim() && (
                    <span className="text-xs text-[var(--text-muted)]">
                      {persona.carrera}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Acción principal */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartReading}
              className="inline-flex min-h-[44px] items-center gap-2 rounded bg-[var(--accent-olive)] px-6 py-2.5 text-sm font-semibold text-[#FBF9F4] transition-colors hover:bg-[var(--accent-olive-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Empezar lectura</span>
            </button>

            <a
              href="#referencias"
              className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] whitespace-nowrap"
            >
              <span>Referencias y créditos</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
