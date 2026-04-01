export type FuzzyMembership = {
  [key: string]: number;
};

// 1. Calculate BMI
export function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

// 2. Fuzzification Functions
function fuzzifyBMI(bmi: number): FuzzyMembership {
  let kurus = 0, normal = 0, gemuk = 0;
  // Kurus: < 18.5, fades out at 20
  if (bmi <= 18.5) kurus = 1;
  else if (bmi > 18.5 && bmi < 20) kurus = (20 - bmi) / (20 - 18.5);

  // Normal: peaks at 21, fades in from 18.5, fades out at 25
  if (bmi > 18.5 && bmi <= 21) normal = (bmi - 18.5) / (21 - 18.5);
  else if (bmi > 21 && bmi <= 25) normal = (25 - bmi) / (25 - 21);

  // Gemuk: > 25, fades in from 23
  if (bmi >= 25) gemuk = 1;
  else if (bmi > 23 && bmi < 25) gemuk = (bmi - 23) / (25 - 23);

  return { Kurus: kurus, Normal: normal, Gemuk: gemuk };
}

function fuzzifyWeightDiff(diffKg: number): FuzzyMembership {
  let kecil = 0, besar = 0;
  // Kecil: 0-3kg, fades out at 6kg
  if (diffKg <= 3) kecil = 1;
  else if (diffKg > 3 && diffKg < 6) kecil = (6 - diffKg) / (6 - 3);

  // Besar: >6kg, fades in from 3kg
  if (diffKg >= 6) besar = 1;
  else if (diffKg > 3 && diffKg < 6) besar = (diffKg - 3) / (6 - 3);

  return { Kecil: kecil, Besar: besar };
}

function fuzzifyDuration(months: number): FuzzyMembership {
  let singkat = 0, lama = 0;
  
  // Singkat: Flat at 1.0 from 0 to 1 month. Slopes down to 0 at 5 months.
  if (months <= 1) singkat = 1;
  else if (months < 5) singkat = (5 - months) / (5 - 1);
  else singkat = 0;

  // Lama: 0 for < 3 months. Slopes up from 0 at 3 to 1.0 at 8. Flat at 1.0 for >= 8.
  if (months < 3) lama = 0;
  else if (months < 8) lama = (months - 3) / (8 - 3);
  else lama = 1;

  return { Singkat: singkat, Lama: lama };
}

// 3. Rule Evaluation
export function evaluateRules(
  bmiFuzzy: FuzzyMembership,
  diffFuzzy: FuzzyMembership,
  durationFuzzy: FuzzyMembership
): { Sedikit: number; Normal: number; Banyak: number } {
  const result = { Sedikit: 0, Normal: 0, Banyak: 0 };

  const rules = [
    { bmi: 'Kurus', diff: 'Kecil', dur: 'Singkat', then: 'Normal' },
    { bmi: 'Kurus', diff: 'Kecil', dur: 'Lama', then: 'Sedikit' },
    { bmi: 'Kurus', diff: 'Besar', dur: 'Singkat', then: 'Banyak' },
    { bmi: 'Kurus', diff: 'Besar', dur: 'Lama', then: 'Normal' },
    { bmi: 'Normal', diff: 'Kecil', dur: 'Singkat', then: 'Normal' },
    { bmi: 'Normal', diff: 'Kecil', dur: 'Lama', then: 'Sedikit' },
    { bmi: 'Normal', diff: 'Besar', dur: 'Singkat', then: 'Banyak' },
    { bmi: 'Normal', diff: 'Besar', dur: 'Lama', then: 'Normal' },
    { bmi: 'Gemuk', diff: 'Kecil', dur: 'Singkat', then: 'Normal' },
    { bmi: 'Gemuk', diff: 'Kecil', dur: 'Lama', then: 'Sedikit' },
    { bmi: 'Gemuk', diff: 'Besar', dur: 'Singkat', then: 'Banyak' },
    { bmi: 'Gemuk', diff: 'Besar', dur: 'Lama', then: 'Normal' },
  ];

  for (const rule of rules) {
    const alpha = Math.min(
      bmiFuzzy[rule.bmi] || 0,
      diffFuzzy[rule.diff] || 0,
      durationFuzzy[rule.dur] || 0
    );
    // @ts-ignore
    result[rule.then] = Math.max(result[rule.then], alpha);
  }

  return result;
}

// 4. True Center of Gravity (Mamdani) Defuzzification
export function defuzzify(fuzzyOutput: { Sedikit: number; Normal: number; Banyak: number }): number {
  let numerator = 0;
  let denominator = 0;
  const step = 20; // Resolution for integration

  for (let x = 800; x <= 4000; x += step) {
    // 1. Calculate underlying MFs at x
    // Sedikit: Flat 1.0 from 800-1000, slope down to 0 at 1100
    let mfSedikit = 0;
    if (x <= 1000) mfSedikit = 1;
    else if (x < 1100) mfSedikit = (1100 - x) / 100;

    // Normal: Triangle peaking at 1500
    let mfNormal = 0;
    if (x > 1000 && x <= 1500) mfNormal = (x - 1000) / 500;
    else if (x > 1500 && x < 1800) mfNormal = (1800 - x) / 300;

    // Banyak: Slope up 1600-1800, flat 1.0 until 4000
    let mfBanyak = 0;
    if (x > 1600 && x <= 1800) mfBanyak = (x - 1600) / 200;
    else if (x > 1800) mfBanyak = 1;

    // 2. Clip the MFs by the Rule Aggregation
    const clippedSedikit = Math.min(mfSedikit, fuzzyOutput.Sedikit);
    const clippedNormal = Math.min(mfNormal, fuzzyOutput.Normal);
    const clippedBanyak = Math.min(mfBanyak, fuzzyOutput.Banyak);

    // 3. Aggregate (Union) the Clipped MFs using MAX
    const maxMembership = Math.max(clippedSedikit, clippedNormal, clippedBanyak);

    // 4. Riemann Sum formulation
    numerator += x * maxMembership;
    denominator += maxMembership;
  }

  if (denominator === 0) return 1400; // Fallback
  return Math.round(numerator / denominator);
}

// Main Engine wrapper
export function getCalorieRecommendation(
  weightKg: number,
  heightCm: number,
  targetWeightKg: number,
  durationMonths: number
) {
  const bmi = calculateBMI(weightKg, heightCm);
  // Strictly enforce Absolute Weight Difference
  const diff = Math.abs(targetWeightKg - weightKg);

  const fuzzBMI = fuzzifyBMI(bmi);
  const fuzzDiff = fuzzifyWeightDiff(diff);
  const fuzzDur = fuzzifyDuration(durationMonths);

  const evaluation = evaluateRules(fuzzBMI, fuzzDiff, fuzzDur);
  const recommendedCalories = defuzzify(evaluation);

  // Determine dominant category
  let maxDegree = 0;
  let category = 'Normal';
  for (const [cat, degree] of Object.entries(evaluation)) {
    if (degree > maxDegree) {
      maxDegree = degree;
      category = cat;
    }
  }

  return { bmi, diff, recommendedCalories, category };
}
