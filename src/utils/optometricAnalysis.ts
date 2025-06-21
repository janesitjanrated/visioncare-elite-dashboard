
import { OptometricData, AnalysisResult } from '@/types/optometric';

export function analyzeOptometricData(data: OptometricData): AnalysisResult {
  const issues: string[] = [];

  // Check phoria near
  if (data.phoriaNear !== null) {
    if (data.phoriaNear < -6) {
      issues.push('High exophoria at near; consider CI.');
    } else if (data.phoriaNear > 6) {
      issues.push('High esophoria at near; consider CE.');
    }
  }

  // Check BI break
  if (data.biBreak !== null && data.biBreak < 12) {
    issues.push('Reduced base-in break range (<12Δ); poor negative fusional vergence.');
  }

  // Check BO break
  if (data.boBreak !== null && data.boBreak < 15) {
    issues.push('Reduced base-out break range (<15Δ); poor positive fusional vergence.');
  }

  // Check NPC
  if (data.npc !== null && data.npc > 10) {
    issues.push('NPC > 10 cm; convergence insufficiency suspected.');
  }

  // Check NRA
  if (data.nra !== null && data.nra < 1.75) {
    issues.push('NRA < +1.75; possible accommodative excess or poor relaxation.');
  }

  // Check PRA
  if (data.pra !== null && data.pra > -1.50) {
    issues.push('PRA > -1.50; poor accommodation stimulation.');
  }

  // Check amplitude of accommodation
  if (data.amplitudeAccommodation !== null && data.amplitudeAccommodation !== undefined && data.amplitudeAccommodation < 5) {
    issues.push('Low amplitude of accommodation (<5D); age-related or accommodative insufficiency.');
  }

  const interpretation = issues.length > 0 ? issues.join('\n') : 'Normal binocular vision function.';

  return { interpretation };
}
