"use client";

import { useState, useEffect } from "react";

type CalculatorFormProps = {
  isCalculated: boolean;
  result: any;
  onCalculate: (data: any) => void;
};

const FOOD_DB = [
  { id: "supp", name: "Shape Shifter", desc: "Natural ingredients to lose weight.", kcal: 110, img: "/protein_supp.png" },
  { id: "chicken", name: "Chicken Fit", desc: "High protein balanced meal.", kcal: 450, img: "/chicken_meal.png" },
  { id: "oats", name: "Power Oats", desc: "Complex carbs and fiber.", kcal: 320, img: "/oatmeal_bowl.png" }
];

export default function CalculatorForm({ isCalculated, result, onCalculate }: CalculatorFormProps) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState<"Lose" | "Maintain" | "Gain">("Lose");

  const [meals, setMeals] = useState<3 | 4 | 5>(3);
  const [proteinLevel, setProteinLevel] = useState<"Low" | "Normal" | "High">("Normal");

  // Auto-select goal based on weight comparison
  useEffect(() => {
    const w = parseFloat(weight);
    const tw = parseFloat(targetWeight);
    if (!isNaN(w) && !isNaN(tw) && w > 0 && tw > 0) {
      if (w > tw) setGoal("Lose");
      else if (w === tw) setGoal("Maintain");
      else setGoal("Gain");
    }
  }, [weight, targetWeight]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!weight || !height || !targetWeight || !duration) return;

    onCalculate({ weight, height, targetWeight, duration, goal });
  };

  const handleClear = () => {
    setWeight("");
    setHeight("");
    setTargetWeight("");
    setDuration("");
  };

  if (isCalculated && result) {
    // Macro logic
    let proteinPct = 30; // Normal
    if (proteinLevel === "Low") proteinPct = 20;
    if (proteinLevel === "High") proteinPct = 40;

    let fatPct = 30; 
    let carbPct = 100 - proteinPct - fatPct; // 40, 50, 30

    const totalKcal = result.recommendedCalories;
    const carbGrams = Math.round((totalKcal * (carbPct / 100)) / 4);
    const proteinGrams = Math.round((totalKcal * (proteinPct / 100)) / 4);
    const fatGrams = Math.round((totalKcal * (fatPct / 100)) / 9);

    const mealKcal = totalKcal / meals;

    return (
      <div className="w-full flex flex-col gap-12 animate-in fade-in slide-in-from-right-8 duration-700">
        <section>
          <h3 className="text-xl font-bold uppercase tracking-widest text-primary mb-6 border-b-2 border-primary pb-2 inline-block">
            Macronutrients
          </h3>
          <div className="flex flex-col gap-4 text-primary w-full max-w-sm">
            <div className="flex w-full items-center justify-between border-b border-border pb-2">
               <span className="text-muted-foreground font-semibold">Carbohydrate</span>
               <span className="font-bold">{carbGrams}g<span className="text-sm font-normal text-muted-foreground ml-1">/{carbPct}%</span></span>
            </div>
            <div className="flex w-full items-center justify-between border-b border-border pb-2">
               <span className="text-muted-foreground font-semibold">Protein</span>
               <span className="font-bold">{proteinGrams}g<span className="text-sm font-normal text-muted-foreground ml-1">/{proteinPct}%</span></span>
            </div>
            <div className="flex w-full items-center justify-between border-b border-border pb-2">
               <span className="text-muted-foreground font-semibold">Fat</span>
               <span className="font-bold">{fatGrams}g<span className="text-sm font-normal text-muted-foreground ml-1">/{fatPct}%</span></span>
            </div>
          </div>
        </section>

        <section className="flex gap-2 max-w-sm">
          <button className="flex-1 bg-primary text-secondary font-bold text-sm py-4 rounded-lg uppercase tracking-wider">Per Day</button>
          {[3,4,5].map((m) => (
             <button 
                key={m}
                onClick={() => setMeals(m as 3|4|5)}
                className={`flex-1 font-bold text-sm py-4 rounded-lg uppercase tracking-wider transition-colors ${meals === m ? 'bg-accent text-white' : 'bg-secondary text-primary hover:bg-gray-200'}`}
             >
                {m} Meals
             </button>
          ))}
        </section>

        <section className="max-w-sm">
           <h4 className="text-lg font-normal text-primary mb-2">Adjust Protein</h4>
           <div className="flex flex-col">
              <p className="text-xs text-muted-foreground mb-6">We recommend to start with normal level. If you do a lot of lifting, try "high".</p>
              
              {/* Slider UI */}
              <div className="relative w-full h-1 bg-border rounded flex items-center mb-8 mt-2">
                 <div className="absolute inset-y-0 left-0 bg-primary" style={{width: proteinLevel === 'Low' ? '0%' : proteinLevel === 'Normal' ? '50%' : '100%'}}></div>
                 {["Low", "Normal", "High"].map((pl, idx) => (
                   <button 
                     key={pl}
                     onClick={() => setProteinLevel(pl as any)}
                     style={{left: idx === 0 ? '0%' : idx === 1 ? '50%' : '100%', transform: "translateX(-50%)"}}
                     className={`absolute w-4 h-4 rounded-full border-2 ${proteinLevel === pl ? 'border-primary bg-primary w-6 h-6' : 'border-border bg-white hover:border-primary'} transition-all`}
                   ></button>
                 ))}
                 
                 <span className="absolute left-[0%] translate-x-[-50%] top-6 text-xs font-semibold uppercase text-muted-foreground">Low</span>
                 <span className="absolute left-[50%] translate-x-[-50%] top-6 text-xs font-bold uppercase text-primary">Normal</span>
                 <span className="absolute left-[100%] translate-x-[-50%] top-6 text-xs font-semibold uppercase text-muted-foreground">High</span>
              </div>
           </div>
        </section>

        <section>
          <h4 className="text-xl font-normal text-primary mb-6">Suggested Products</h4>
          <div className="flex flex-wrap items-center gap-6">
            {FOOD_DB.slice(0, mealKcal > 600 ? 3 : mealKcal > 400 ? 2 : 1).map(food => (
              <div key={food.id} className="flex items-center gap-4 group cursor-pointer hover:bg-secondary p-2 rounded-xl transition-colors pr-6">
                 <img src={food.img} alt={food.name} className={`w-16 h-16 ${food.id === 'supp' ? 'object-contain bg-white drop-shadow-md rounded p-1' : 'object-cover drop-shadow-md rounded-full border border-border'}`} />
                 <div className="flex flex-col">
                    <span className="font-bold uppercase tracking-wider text-sm flex items-center gap-2 text-primary group-hover:text-accent">
                      {food.name} <span className="text-lg font-normal hidden group-hover:inline">→</span>
                    </span>
                    <span className="text-xs text-muted-foreground">{food.desc}</span>
                    <span className="text-xs font-bold text-accent mt-1">{food.kcal} kcal</span>
                 </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // --- Form View ---
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10 animate-in fade-in duration-500">
      
      {/* Body Parameters */}
      <section>
        <h4 className="text-primary text-xl font-normal mb-6">Body Parameters</h4>

        <div className="flex flex-wrap gap-6 items-center">
          <div className="relative w-32 flex items-center border-b border-primary/20 hover:border-accent focus-within:border-accent transition-colors">
            <input type="number" required value={weight} onChange={e=>setWeight(e.target.value)} placeholder="Weight" className="w-full h-12 bg-transparent outline-none px-2 text-primary placeholder-muted-foreground" />
            <span className="text-sm font-bold text-primary mr-2">KG</span>
          </div>
          <div className="relative w-32 flex items-center border-b border-primary/20 hover:border-accent focus-within:border-accent transition-colors">
            <input type="number" required value={height} onChange={e=>setHeight(e.target.value)} placeholder="Height" className="w-full h-12 bg-transparent outline-none px-2 text-primary placeholder-muted-foreground" />
            <span className="text-sm font-bold text-primary mr-2">CM</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 items-center mt-8">
          <div className="relative w-40 flex items-center border-b border-primary/20 hover:border-accent focus-within:border-accent transition-colors">
            <input type="number" required value={targetWeight} onChange={e=>setTargetWeight(e.target.value)} placeholder="Target Wgt" className="w-full h-12 bg-transparent outline-none px-2 text-primary placeholder-muted-foreground" />
            <span className="text-sm font-bold text-primary mr-2">KG</span>
          </div>
          <div className="relative w-40 flex items-center border-b border-primary/20 hover:border-accent focus-within:border-accent transition-colors">
            <input type="number" required value={duration} onChange={e=>setDuration(e.target.value)} placeholder="Duration" className="w-full h-12 bg-transparent outline-none px-2 text-primary placeholder-muted-foreground" />
            <span className="text-sm font-bold text-primary mr-2">Months</span>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="mt-4">
         <h4 className="text-primary text-xl font-normal mb-6">Goals</h4>
         {(() => {
           const w = parseFloat(weight);
           const tw = parseFloat(targetWeight);
           const hasBoth = !isNaN(w) && !isNaN(tw) && w > 0 && tw > 0;
           const allowedGoal = hasBoth ? (w > tw ? "Lose" : w === tw ? "Maintain" : "Gain") : null;

           return (
             <div className="flex flex-wrap gap-4 max-w-2xl">
               {["Lose", "Maintain", "Gain"].map((g) => {
                 const isDisabled = hasBoth && allowedGoal !== g;
                 return (
                   <button
                     key={g}
                     type="button"
                     disabled={isDisabled}
                     onClick={() => { if (!isDisabled) setGoal(g as any); }}
                     className={`px-10 py-5 uppercase font-bold text-sm tracking-widest rounded-lg transition-all shadow-sm ${
                       goal === g
                         ? 'bg-primary text-white shadow-primary/20 scale-105'
                         : isDisabled
                           ? 'bg-[#e2e2e2] text-muted-foreground/40 opacity-40 cursor-not-allowed'
                           : 'bg-[#e2e2e2] text-muted-foreground hover:bg-[#d5d5d5]'
                     }`}
                   >
                     {g}
                   </button>
                 );
               })}
             </div>
           );
         })()}
      </section>

      {/* Constraints Footer */}
      <div className="flex w-full max-w-2xl justify-between items-center mt-12 pt-8 border-t border-border">
          <button type="button" onClick={handleClear} className="font-bold text-sm tracking-wider uppercase text-muted-foreground hover:text-accent transition-colors">
             Clear
          </button>
          
          <button 
            type="submit" 
            className="flex items-center gap-4 bg-primary text-white font-bold tracking-widest uppercase px-12 py-4 shadow-xl hover:-skew-x-6 hover:bg-black transition-all active:scale-95"
            style={{clipPath: "polygon(5% 0, 100% 0%, 95% 100%, 0% 100%)"}}
          >
             Calculate
             <span className="font-normal border-l border-white/20 pl-4">→</span>
          </button>
      </div>

    </form>
  );
}
