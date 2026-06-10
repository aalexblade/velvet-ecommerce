"use client";

import React from "react";
import { cn } from "@/shared/lib";

interface StepItemProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const StepItem: React.FC<StepItemProps> = ({ number, title, children }) => (
  <div className="flex flex-col gap-4 w-full">
    <div className="flex items-center gap-4 border-b border-border pb-3">
      <span className="text-foreground font-bold text-xl md:text-2xl">{number}</span>
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
    <section className="w-full px-4 py-16 md:py-24 bg-accent/5">
      <div className="container mx-auto max-w-7xl flex justify-center lg:justify-start">
        {/* Adheres to premium UI specs with 100% width fields and clear result labeling. */}
        <div className="w-full max-w-3xl flex flex-col gap-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Як заміряти свої параметри?
          </h2>

          <div className="flex flex-col gap-10 w-full">
            {/* Step 1 */}
            <StepItem number="1." title="Зніміть мірки">
              <div className="flex flex-col gap-3">
                {[
                  "Обхват грудей — вимірюється по найвищій точці грудей (без пуш-апу).",
                  "Обхват під грудьми — щільно під грудьми.",
                  "Обхват талії — найвужча частина тіла.",
                  "Обхват стегон — по найширшій частині сідниць."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1 shrink-0 text-lg">•</span>
                    <p className="text-foreground/90">{text}</p>
                  </div>
                ))}
              </div>
            </StepItem>

            {/* Step 2 */}
            <StepItem number="2." title="Введіть дані в калькулятор">
              <div className="flex flex-col gap-3">
                {[
                  "Введіть мірки у відповідні поля калькулятора (зазвичай у сантиметрах).",
                  "Натисніть кнопку \"Розрахувати\".",
                  "Коли розмір визначений, натисніть кнопку \"Знайти мій розмір в каталозі\"."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1 shrink-0 text-lg">•</span>
                    <p className="text-foreground/90">{text}</p>
                  </div>
                ))}
              </div>
            </StepItem>

            {/* Step 3 */}
            <StepItem number="3." title="Отримайте свій розмір">
              <div className="flex flex-col gap-6">
                <p className="text-foreground/90 font-medium">
                  Калькулятор автоматично покаже ваш розмір у відповідній системі:
                </p>
                
                <div className="flex flex-col gap-3">
                  {[
                    "Європейська (EU)",
                    "Українська (UA)",
                    "Англійська (UK)",
                    "Американська (US)"
                  ].map((sys, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-accent font-bold mt-1 shrink-0 text-lg">•</span>
                      <p className="text-foreground/90">{sys}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-background border border-border mt-2 shadow-sm">
                  <p className="text-foreground/80 italic text-base">
                    <span className="font-bold text-accent not-italic mr-2">Порада:</span>
                    Мірки краще знімати в тонкій білизні або без неї, стоячи рівно перед дзеркалом. Для білизни — наприклад, 75B, 80C тощо.
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
