"use client";

import React from "react";
import { Ruler, Calculator, Sparkles } from "lucide-react";

interface StepItemProps {
  number: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const StepItem: React.FC<StepItemProps> = ({ number, title, icon, children }) => (
  <div className="flex flex-col gap-4 w-full">
    <div className="flex items-center gap-3 border-b border-border pb-3">
      <span className="text-accent font-bold text-xl md:text-2xl">{number}</span>
      {icon && <span className="text-accent">{icon}</span>}
      <h3 className="text-foreground font-bold text-xl md:text-2xl tracking-tight">
        {title}
      </h3>
    </div>
    <div className="flex flex-col gap-3 pl-8 text-muted-foreground text-base md:text-lg leading-relaxed">
      {children}
    </div>
  </div>
);

export const SizeHowTo = () => {
  return (
    <section id="size-how-to" className="w-full px-4 py-16 md:py-24 bg-muted/30 scroll-mt-20">
      <div className="container mx-auto max-w-7xl flex justify-center lg:justify-start">
        <div className="w-full max-w-3xl flex flex-col gap-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Як заміряти свої параметри?
          </h2>

          <div className="flex flex-col gap-10 w-full">
            {/* Step 1:check your size */}
            <StepItem number="1." title="Зніміть мірки" icon={<Ruler className="w-6 h-6" />}>
              <div className="flex flex-col gap-3">
                {[
                  "Обхват грудей — вимірюється по найвищій точці грудей (без пуш-апу).",
                  "Обхват під грудьми — щільно під грудьми на видиху.",
                  "Обхват стегон — по найширшій частині сідниць.",
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1 shrink-0 text-lg">•</span>
                    <p className="text-foreground/90">{text}</p>
                  </div>
                ))}
              </div>
            </StepItem>

            {/* Step 2: answer calc*/}
            <StepItem number="2." title="Введіть дані в калькулятор" icon={<Calculator className="w-6 h-6" />}>
              <div className="flex flex-col gap-3">
                {[
                  "Введіть свої мірки у відповідні поля калькулятора в сантиметрах.",
                  'Натисніть кнопку "Розрахувати".',
                  'Коли розмір визначений, натисніть кнопку "Знайти мій розмір в каталозі".',
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1 shrink-0 text-lg">•</span>
                    <p className="text-foreground/90">{text}</p>
                  </div>
                ))}
              </div>
            </StepItem>

            {/* Step 3: get your size*/}
            <StepItem number="3." title="Отримайте свій розмір" icon={<Sparkles className="w-6 h-6" />}>
              <div className="flex flex-col gap-4">
                <p className="text-foreground/90 font-medium">
                  Калькулятор автоматично визначить ваш розмір (XXS – XXL) для швидкого фільтрування білизни в каталозі.
                </p>

                <div className="p-6 rounded-2xl bg-card border border-border mt-2 shadow-xs">
                  <p className="text-muted-foreground italic text-sm md:text-base leading-relaxed">
                    <span className="font-bold text-accent not-italic mr-2">Порада:</span>
                    Мірки краще знімати в тонкій білизні або без неї, стоячи рівно перед дзеркалом.
                  </p>
                </div>
              </div>
            </StepItem>
          </div>
        </div>
      </div>
    </section>
  );
};