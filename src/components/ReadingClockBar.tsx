import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Sun,
  X,
} from "lucide-react";
import {
  LIMITE_LECTURA_SEGUNDOS,
  formatearMinYS,
  formatearRelojMMSS,
  obtenerEstadoPresupuesto,
} from "../utils/readingTime";

interface ReadingClockBarProps {
  elapsedSeconds: number;
  isRunning: boolean;
  hasStarted: boolean;
  totalEstimatedSeconds: number;
  isDark: boolean;
  noticeDismissed: boolean;
  onToggleRun: () => void;
  onReset: () => void;
  onToggleTheme: () => void;
  onDismissNotice: () => void;
}

export function ReadingClockBar({
  elapsedSeconds,
  isRunning,
  hasStarted,
  totalEstimatedSeconds,
  isDark,
  noticeDismissed,
  onToggleRun,
  onReset,
  onToggleTheme,
  onDismissNotice,
}: ReadingClockBarProps) {
  const progressPct = Math.min(
    100,
    (elapsedSeconds / LIMITE_LECTURA_SEGUNDOS) * 100
  );
  const completedEightMinutes = elapsedSeconds >= LIMITE_LECTURA_SEGUNDOS;
  const budget = obtenerEstadoPresupuesto(totalEstimatedSeconds);

  const budgetColorClasses =
    budget.nivel === "rojo"
      ? "text-[#992B2B] dark:text-[#E57B7B]"
      : budget.nivel === "ambar"
      ? "text-[#8C540B] dark:text-[#E0A346]"
      : "text-[#2F5E38] dark:text-[#7BB887]";

  return (
    <header
      className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/95 backdrop-blur-sm"
      aria-label="Barra de control y tiempo de lectura"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="flex min-h-[48px] items-center justify-between gap-2 py-1.5 sm:gap-4 sm:py-2">
          {/* Cronómetro y barra de progreso */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <Clock
                className="h-4 w-4 text-[var(--accent-olive)]"
                aria-hidden="true"
              />
              <span className="hidden text-xs font-medium text-[var(--text-secondary)] sm:inline">
                Tiempo de lectura
              </span>
              <span
                className="font-mono-clock text-sm font-medium text-[var(--text-primary)] sm:text-base"
                aria-live="off"
              >
                {formatearRelojMMSS(elapsedSeconds)}
              </span>
              <span className="font-mono-clock text-xs text-[var(--text-muted)]">
                / 08:00
              </span>
            </div>

            <div
              className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-[var(--border-hairline)] md:block lg:w-32"
              role="progressbar"
              aria-label="Progreso hacia el límite de 8 minutos"
              aria-valuemin={0}
              aria-valuemax={LIMITE_LECTURA_SEGUNDOS}
              aria-valuenow={Math.min(elapsedSeconds, LIMITE_LECTURA_SEGUNDOS)}
            >
              <div
                className="h-full bg-[var(--accent-olive)] transition-[width] duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Controles Pausa y Reiniciar */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onToggleRun}
                className="inline-flex min-h-[34px] items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] whitespace-nowrap shrink-0 cursor-pointer"
                aria-label={
                  isRunning
                    ? "Pausar cronómetro de lectura"
                    : hasStarted
                    ? "Reanudar cronómetro de lectura"
                    : "Iniciar cronómetro de lectura"
                }
              >
                {isRunning ? (
                  <>
                    <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Pausa</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{hasStarted ? "Reanudar" : "Iniciar"}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onReset}
                className="inline-flex min-h-[34px] items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] whitespace-nowrap shrink-0 cursor-pointer"
                aria-label="Reiniciar cronómetro a cero"
                title="Reiniciar cronómetro"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Total estimado + cambio de tema */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div
              className="hidden items-center gap-2 text-xs sm:flex"
              aria-label={`Total estimado de lectura: ${formatearMinYS(
                totalEstimatedSeconds
              )}. Estado: ${budget.etiqueta}`}
            >
              <span className="text-[var(--text-muted)] whitespace-nowrap">
                Total estimado:
              </span>
              <span className="font-mono-clock font-medium text-[var(--text-primary)] whitespace-nowrap">
                {formatearMinYS(totalEstimatedSeconds)}
              </span>
              <span
                className={`inline-flex items-center gap-1 font-medium whitespace-nowrap ${budgetColorClasses}`}
              >
                {budget.nivel === "rojo" ? (
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                )}
                <span>{budget.etiqueta}</span>
              </span>
            </div>

            {/* Versión compacta en móvil del total estimado */}
            <div
              className={`flex items-center gap-1 text-[11px] font-medium sm:hidden ${budgetColorClasses}`}
              title={`Total estimado: ${formatearMinYS(totalEstimatedSeconds)} (${budget.etiqueta})`}
            >
              <span className="font-mono-clock">
                Est. {formatearRelojMMSS(totalEstimatedSeconds)}
              </span>
            </div>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-pressed={isDark}
              aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              title={isDark ? "Modo claro" : "Modo oscuro"}
              className="inline-flex min-h-[34px] min-w-[34px] items-center justify-center rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-olive)] cursor-pointer"
            >
              {isDark ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
              <span className="sr-only">
                {isDark ? "Modo claro" : "Modo oscuro"}
              </span>
            </button>
          </div>
        </div>

        {/* Barra de progreso fina en móvil debajo de la fila */}
        <div
          className="mb-1 h-1 w-full overflow-hidden rounded-full bg-[var(--border-hairline)] md:hidden"
          aria-hidden="true"
        >
          <div
            className="h-full bg-[var(--accent-olive)] transition-[width] duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Aviso discreto al completar los 8 minutos (sin bloquear la lectura) */}
        {completedEightMinutes && !noticeDismissed && (
          <div
            role="status"
            aria-live="polite"
            className="mb-1.5 flex items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-1.5 text-xs text-[var(--accent-ochre)]"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>Completaste los 8 minutos. Puedes continuar leyendo libremente.</span>
            </div>
            <button
              type="button"
              onClick={onDismissNotice}
              className="inline-flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--accent-olive)] cursor-pointer"
              aria-label="Cerrar aviso de 8 minutos"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}