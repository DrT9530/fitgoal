"use client";

import { useState } from "react";
import CalculatorForm from "@/components/calculator";
import { getCalorieRecommendation } from "@/lib/fuzzy";

export default function Home() {
  const [result, setResult] = useState<{
    bmi: number;
    diff: number;
    recommendedCalories: number;
    category: string;
  } | null>(null);

  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (data: any) => {
    // We run the fuzzy engine with weight, height, targetWeight, duration
    const calcResult = getCalorieRecommendation(
      parseFloat(data.weight),
      parseFloat(data.height),
      parseFloat(data.targetWeight),
      parseFloat(data.duration)
    );
    setResult(calcResult);
    setIsCalculated(true);
  };

  const handleReset = () => {
    setIsCalculated(false);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row shadow-2xl relative">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-12 lg:p-24 bg-white relative z-10">
        <header className="absolute top-12 left-12 lg:left-24 flex gap-4 w-full">
          <h1 className="text-3xl font-black tracking-tight text-primary">
            FIT<span className="text-accent">GOAL</span>
          </h1>
        </header>

        {!isCalculated ? (
          <section className="text-left w-full max-w-xl animate-in fade-in slide-in-from-left-8 duration-700 mt-20">
            <div className="w-16 h-16 rounded-full border-4 border-accent flex items-center justify-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-accent">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m10-10H2" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-primary tracking-tighter uppercase leading-[0.9]">
              CALORIES<br/>CALCULATOR
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base mb-8 max-w-md">
              Calculate optimal macronutrient ratios for your body. Enter your age, height, weight, gender, goals, and activity level.
            </p>
            <div className="flex gap-4">
               <button className="text-muted-foreground w-12 h-12 flex items-center justify-center border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
                   <span className="sr-only">Go to Calculator</span>
                   →
               </button>
            </div>
          </section>
        ) : (
          <section className="text-left w-full max-w-xl animate-in fade-in slide-in-from-left-8 duration-700 mt-20">
            <h3 className="text-2xl text-muted-foreground mb-4 font-normal">Your Result</h3>
            <div className="text-[6rem] leading-none font-black text-primary mb-4 tracking-tighter">
              {result?.recommendedCalories.toLocaleString()} <span className="text-4xl text-primary font-bold">kcal</span>
            </div>
            <p className="text-primary font-semibold text-lg max-w-sm mb-12">
              Suggested amount of calories <br/> <span className="font-black">per day.</span>
            </p>

            <div className="text-left bg-secondary p-8 rounded-2xl mb-8 border border-border">
              <h4 className="font-bold flex items-center gap-2 mb-3 text-primary">
                <span className="text-accent text-xl">●</span> Lifestyle Advisor
              </h4>
              <p className="text-primary/70 leading-relaxed text-sm">
                {result?.category === 'Sedikit' 
                  ? "Batas kalori yang disarankan cukup ketat. Kombinasikan defisit kalori ini dengan asupan protein tinggi agar massa otot tetap terjaga dan minimalkan makanan manis (gula tambahan)."
                  : result?.category === 'Banyak'
                  ? "Kalori yang direkomendasikan cukup tinggi, menandakan perlunya fase surplus (bulking). Jangan lupa untuk melatih otot dan mengonsumsi karbohidrat kompleks."
                  : "Target kalori berada dalam rentang normal untuk tubuh Anda. Fokus pada nutrisi seimbang, pertahankan tingkat aktivitas harian, dan pantau perubahan Anda secara rutin."}
              </p>
            </div>

            <button 
              onClick={handleReset}
              className="text-primary border-b-2 border-primary font-bold hover:text-accent hover:border-accent transition-colors pb-1 uppercase tracking-wider text-sm"
            >
              ← Recalculate
            </button>
          </section>
        )}
      </div>

      {/* RIGHT COLUMN: Conditional Background based on state */}
      {/* Light Grey For Form, White for Results (as per prompt request for Right Column Results) */}
      <div className={`w-full md:w-1/2 min-h-screen flex flex-col justify-center p-8 lg:p-16 relative shadow-inner transition-colors duration-500 ${!isCalculated ? 'bg-secondary' : 'bg-white'}`}>
        <div className="w-full max-w-2xl mx-auto mt-16 md:mt-0">
          <CalculatorForm 
             isCalculated={isCalculated}
             result={result}
             onCalculate={handleCalculate} 
          />
        </div>
      </div>
    </main>
  );
}
