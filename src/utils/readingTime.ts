import type { DiaContenido } from "../content";

export const PALABRAS_POR_MINUTO = 200;
export const LIMITE_LECTURA_SEGUNDOS = 8 * 60; // 480 s (08:00)
export const UMBRAL_AMBAR_SEGUNDOS = 7 * 60; // 420 s (07:00)

function contarPalabrasTexto(texto?: string): number {
  if (!texto) return 0;
  const trimmed = texto.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

/**
 * Determina si un día tiene texto redactado para lectura.
 * Los campos de fuente/contextualización precargados en días 2 a 6 no cuentan
 * como texto publicado hasta que exista al menos un bloque de análisis o párrafo.
 */
export function diaTieneTexto(dia: DiaContenido): boolean {
  const tieneParrafos = dia.parrafos.some((p) => p.trim().length > 0);
  const tieneAnalisis = Boolean(
    dia.contexto?.trim() ||
      dia.perspectiva?.trim() ||
      dia.aporteALaTesis?.trim() ||
      dia.dilemaEtico?.trim() ||
      dia.cita?.trim() ||
      dia.nuestraPostura?.trim()
  );
  return tieneParrafos || tieneAnalisis;
}

/**
 * Cuenta únicamente las palabras de los textos de lectura que existan en el día.
 * Si el día no tiene texto aún, devuelve 0.
 */
export function contarPalabrasDia(dia: DiaContenido): number {
  if (!diaTieneTexto(dia)) return 0;

  let total = 0;
  for (const p of dia.parrafos) {
    total += contarPalabrasTexto(p);
  }
  total += contarPalabrasTexto(dia.contexto);
  total += contarPalabrasTexto(dia.perspectiva);
  total += contarPalabrasTexto(dia.aporteALaTesis);
  total += contarPalabrasTexto(dia.dilemaEtico);
  total += contarPalabrasTexto(dia.cita);
  total += contarPalabrasTexto(dia.nuestraPostura);

  return total;
}

export function calcularSegundosLecturaDia(dia: DiaContenido): number {
  const palabras = contarPalabrasDia(dia);
  if (palabras === 0) return 0;
  return Math.max(1, Math.round((palabras / PALABRAS_POR_MINUTO) * 60));
}

export function calcularSegundosTotales(dias: DiaContenido[]): number {
  return dias.reduce((acc, dia) => acc + calcularSegundosLecturaDia(dia), 0);
}

export function formatearRelojMMSS(segundos: number): string {
  const safe = Math.max(0, Math.floor(segundos));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function formatearMinYS(segundos: number): string {
  const safe = Math.max(0, Math.round(segundos));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins} min ${secs} s`;
}

export type EstadoPresupuestoTiempo = "verde" | "ambar" | "rojo";

export function obtenerEstadoPresupuesto(
  totalSegundos: number
): {
  nivel: EstadoPresupuestoTiempo;
  etiqueta: string;
} {
  if (totalSegundos > LIMITE_LECTURA_SEGUNDOS) {
    return {
      nivel: "rojo",
      etiqueta: "Supera el límite de 8 min",
    };
  }
  if (totalSegundos >= UMBRAL_AMBAR_SEGUNDOS) {
    return {
      nivel: "ambar",
      etiqueta: "Entre 7 y 8 min",
    };
  }
  return {
    nivel: "verde",
    etiqueta: "Menor a 7 min",
  };
}
