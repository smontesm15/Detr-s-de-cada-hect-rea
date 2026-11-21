import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CoverSection } from "./components/CoverSection";
import { DayReader } from "./components/DayReader";
import { ReadingClockBar } from "./components/ReadingClockBar";
import { ReferencesSection } from "./components/ReferencesSection";
import {
  DesktopTimelineSidebar,
  MobileTimelineStrip,
} from "./components/TimelineNav";
import { CREDITOS_IMAGENES, DIAS, PROYECTO, REFERENCIAS } from "./content";
import { calcularSegundosTotales } from "./utils/readingTime";

const THEME_STORAGE_KEY = "montes-maria-tema";

export default function App() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [visitedDays, setVisitedDays] = useState<Set<number>>(() => new Set());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [noticeDismissed, setNoticeDismissed] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
    } catch {
      return false;
    }
  });

  const readerSectionRef = useRef<HTMLElement | null>(null);
  const wasRunningBeforeHideRef = useRef<boolean>(false);

  const totalEstimatedSeconds = useMemo(
    () => calcularSegundosTotales(DIAS),
    []
  );

  // Sincronizar clase .dark en <html> (modo claro por defecto)
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [isDark]);

  // Cronómetro por segundo cuando está activo
  useEffect(() => {
    if (!isRunning) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isRunning]);

  // Pausa automática si la pestaña no está visible; reanuda si estaba corriendo al volver
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        setIsRunning((currentlyRunning) => {
          wasRunningBeforeHideRef.current = currentlyRunning;
          return false;
        });
      } else if (document.visibilityState === "visible") {
        if (wasRunningBeforeHideRef.current) {
          wasRunningBeforeHideRef.current = false;
          setIsRunning(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const scrollToReader = useCallback(() => {
    const el = readerSectionRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    el.scrollIntoView({
      behavior: prefersReduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const handleSelectDay = useCallback(
    (dayNumber: number) => {
      const clamped = Math.max(1, Math.min(DIAS.length, dayNumber));
      setActiveDay(clamped);
      scrollToReader();
    },
    [scrollToReader]
  );

  // Navegación por teclado (flechas izquierda y derecha)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && activeDay > 1) {
        event.preventDefault();
        handleSelectDay(activeDay - 1);
      } else if (event.key === "ArrowRight" && activeDay < DIAS.length) {
        event.preventDefault();
        handleSelectDay(activeDay + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeDay, handleSelectDay]);

  const handleStartReading = useCallback(() => {
    setHasStarted(true);
    setIsRunning(true);
    setActiveDay(1);
    scrollToReader();
  }, [scrollToReader]);

  const handleToggleRun = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    wasRunningBeforeHideRef.current = false;
    setIsRunning((prev) => !prev);
  }, [hasStarted]);

  const handleResetTimer = useCallback(() => {
    wasRunningBeforeHideRef.current = false;
    setIsRunning(false);
    setElapsedSeconds(0);
    setNoticeDismissed(false);
  }, []);

  const handleMarkVisited = useCallback((dayNumber: number) => {
    setVisitedDays((prev) => {
      if (prev.has(dayNumber)) return prev;
      const next = new Set(prev);
      next.add(dayNumber);
      return next;
    });
  }, []);

  const currentDia =
    DIAS.find((d) => d.numero === activeDay) ?? DIAS[0];

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      {/* Enlace de salto accesible */}
      <a
        href="#lectura"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-[var(--accent-olive)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#FBF9F4]"
      >
        Saltar al contenido de lectura
      </a>

      {/* Barra superior fija con reloj de lectura y línea de tiempo móvil */}
      <div className="sticky top-0 z-40">
        <ReadingClockBar
          elapsedSeconds={elapsedSeconds}
          isRunning={isRunning}
          hasStarted={hasStarted}
          totalEstimatedSeconds={totalEstimatedSeconds}
          isDark={isDark}
          noticeDismissed={noticeDismissed}
          onToggleRun={handleToggleRun}
          onReset={handleResetTimer}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onDismissNotice={() => setNoticeDismissed(true)}
        />
        <MobileTimelineStrip
          dias={DIAS}
          activeDay={activeDay}
          visitedDays={visitedDays}
          onSelectDay={handleSelectDay}
        />
      </div>

      <main>
        {/* Portada breve */}
        <CoverSection
          proyecto={PROYECTO}
          onStartReading={handleStartReading}
        />

        {/* Área principal de lectura por días */}
        <section
          id="lectura"
          ref={readerSectionRef}
          aria-label="Lectura por días"
          className="scroll-mt-24 py-10 sm:py-12 lg:py-14"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:gap-12">
            <DesktopTimelineSidebar
              dias={DIAS}
              activeDay={activeDay}
              visitedDays={visitedDays}
              onSelectDay={handleSelectDay}
            />

            <DayReader
              dia={currentDia}
              totalDias={DIAS.length}
              tesis={PROYECTO.tesis}
              isVisited={visitedDays.has(currentDia.numero)}
              onMarkVisited={handleMarkVisited}
              onPrev={() => handleSelectDay(activeDay - 1)}
              onNext={() => handleSelectDay(activeDay + 1)}
            />
          </div>
        </section>

        {/* Sección final: Referencias y créditos */}
        <ReferencesSection
          referencias={REFERENCIAS}
          creditosImagenes={CREDITOS_IMAGENES}
          proyecto={PROYECTO}
        />
      </main>
    </div>
  );
}
