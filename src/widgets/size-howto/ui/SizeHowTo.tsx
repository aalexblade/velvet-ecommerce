"use client";

import React from "react";

interface StepItemProps {
  number: string;
  title: string;
  children: React.ReactNode;
}

const StepItem: React.FC<StepItemProps> = ({ number, title, children }) => (
  <div className="flex flex-col gap-3 w-full">
    <div className="flex items-center gap-3 border-b border-border/40 pb-2">
      <span className="text-foreground font-semibold text-lg md:text-xl">{number}</span>
      <h3 className="text-foreground font-semibold text-lg md:text-xl tracking-tight">
        {title}
      </h3>
    </div>
    <div className="flex flex-col gap-2 pl-6 text-muted-foreground text-sm md:text-base leading-relaxed">
      {children}
    </div>
  </div>
);

export const SizeHowTo = () => {
  return (
    <section className="w-full px-4 py-12 md:py-20 bg-[#F9BBD2]/10">
      <div className="container mx-auto max-w-7xl flex justify-center lg:justify-start">
        {/* Максимальна ширина контенту на десктопі, яка автоматично адаптується під планшети та мобільні */}
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
            Як заміряти свої параметри?
          </h2>

          <div className="flex flex-col gap-8 w-full">
            {/* Крок 1 */}
            <StepItem number="1." title="Зніміть мірки.">
              <div className="flex flex-col gap-2">
                {[
                  "Обхват грудей — вимірюється по найвищій точці грудей (без пуш-апу).",
                  "Обхват під грудьми — щільно під грудьми.",
                  "Обхват талії — найвужча частина тіла.",
                  "Обхват стегон — по найширшій частині сідниць."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#F16393] font-bold mt-0.5 shrink-0">•</span>
                    <p className="text-foreground/80">{text}</p>
                  </div>
                ))}
              </div>
            </StepItem>

            {/* Крок 2 */}
            <StepItem number="2." title="Введіть дані в калькулятор.">
              <div className="flex flex-col gap-2">
                {[
                  "Введіть мірки у відповідні поля калькулятора (зазвичай у сантиметрах).",
                  "Натисніть кнопку \"Розрахувати\".",
                  "Коли розмір визначений, натисніть кнопку \"Знайти мій розмір в каталозі\"."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#F16393] font-bold mt-0.5 shrink-0">•</span>
                    <p className="text-foreground/80">{text}</p>
                  </div>
                ))}
              </div>
            </StepItem>

            {/* Крок 3 — Виправлено структуру списку та текстовий блок відповідно до макетів */}
            <StepItem number="3." title="Отримайте свій розмір">
              <div className="flex flex-col gap-4">
                <p className="text-foreground/80">
                  Калькулятор автоматично покаже ваш розмір у відповідній системі:
                </p>
                
                <div className="flex flex-col gap-2">
                  {[
                    "Європейська (EU)",
                    "Українська (UA)",
                    "Англійська (UK)",
                    "Американська (US)"
                  ].map((sys, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#F16393] font-bold mt-0.5 shrink-0">•</span>
                      <p className="text-foreground/80">{sys}</p>
                    </div>
                  ))}
                </div>

                <p className="text-foreground/80 pt-2">
                  Для білизни — наприклад, 75B, 80C тощо. Порада: Мірки краще знімати в тонкій білизні або без неї, стоячи рівно перед дзеркалом.
                </p>
              </div>
            </StepItem>
          </div>
        </div>
      </div>
    </section>
  );
};