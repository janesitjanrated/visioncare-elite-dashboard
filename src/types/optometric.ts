
export interface OptometricData {
  phoriaNear: number | null;             // Prism Δ, Exo(-), Eso(+)
  biBlur: number | null;                 // Prism Δ
  biBreak: number | null;                // Prism Δ
  biRecovery: number | null;             // Prism Δ
  boBlur: number | null;                 // Prism Δ
  boBreak: number | null;                // Prism Δ
  boRecovery: number | null;             // Prism Δ
  nra: number | null;                    // Diopters (D)
  pra: number | null;                    // Diopters (D) – negative
  npc: number | null;                    // Centimeters (cm)
  amplitudeAccommodation?: number | null;// Diopters (optional)
}

export interface AnalysisResult {
  interpretation: string; // รายงานสรุปผลเป็นข้อความ, แต่ละบรรทัดคือ 1 finding
}

export interface DataPoint {
  x: number;
  y: number;
  label: string;
  symbol: 'X' | '○' | '□' | '△';
  color?: string;
}
