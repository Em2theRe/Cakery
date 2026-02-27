"use client";

import { useEffect, useMemo, useState } from "react";
import { cakeTemplates, CakeTemplate, CakeShape } from "@/lib/cakeTemplates";
import Link from "next/link";
import { Chip } from "@/components/ui";
import CakerySelect from "@/components/CakerySelect";

type BuilderState = {
  templateId: string;
  shape: CakeShape;
  sizeId: string;
  flavorId: string;
  fillingId: string;
  colorId: string;
  decorationId: string;
  message: string;
};

function priceFor(template: CakeTemplate, s: BuilderState) {
  const size = template.sizes.find((x) => x.id === s.sizeId)!;
  const flavor = template.flavors.find((x) => x.id === s.flavorId)!;
  const filling = template.fillings.find((x) => x.id === s.fillingId)!;
  const color = template.colors.find((x) => x.id === s.colorId)!;
  const deco = template.decorations.find((x) => x.id === s.decorationId)!;

  return (
    template.basePrice +
    size.priceAdd +
    flavor.priceAdd +
    filling.priceAdd +
    color.priceAdd +
    deco.priceAdd
  );
}

export default function BuilderPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [state, setState] = useState<BuilderState>(() => {
    const t = cakeTemplates[0];
    return {
      templateId: t.id,
      shape: t.shapes[0],
      sizeId: t.sizes[0].id,
      flavorId: t.flavors[0].id,
      fillingId: t.fillings[0].id,
      colorId: t.colors[0].id,
      decorationId: t.decorations[0].id,
      message: "",
    };
  });

  const template = useMemo(
    () => cakeTemplates.find((t) => t.id === state.templateId)!,
    [state.templateId]
  );

  const totalPrice = useMemo(() => priceFor(template, state), [template, state]);

    useEffect(() => {
    const payload = {
      state,
      totalPrice,
      templateName: template.name,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("cakery_builder", JSON.stringify(payload));
  }, [state, totalPrice, template.name]);

  // Wenn Template wechselt, setzen wir Defaults passend zum Template
  function setTemplate(nextTemplateId: string) {
    const t = cakeTemplates.find((x) => x.id === nextTemplateId)!;
    setState((prev) => ({
      ...prev,
      templateId: t.id,
      shape: t.shapes[0],
      sizeId: t.sizes[0].id,
      flavorId: t.flavors[0].id,
      fillingId: t.fillings[0].id,
      colorId: t.colors[0].id,
      decorationId: t.decorations[0].id,
    }));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
      {/* Links: Controls */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Kuchen gestalten</h1>
          <p className="text-black/70">
            Wähle eine Schablone und passe Geschmack & Design an.
          </p>
        </div>

        {/* Stepper */}
        <div className="flex gap-2">
          {[
            { id: 1, label: "Schablone" },
            { id: 2, label: "Kuchen" },
            { id: 3, label: "Design" },
          ].map((x) => (
            <Chip
                key={x.id}
                active={step === x.id}
                onClick={() => setStep(x.id as 1 | 2 | 3)}
                >
                {x.id}. {x.label}
            </Chip>

          ))}
        </div>

        {/* Step content */}
        {step === 1 && (
          <section className="space-y-3">
            <h2 className="text-lg font-medium">Schablone wählen</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {cakeTemplates.map((t) => {
                const active = t.id === state.templateId;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={[
                        "rounded-xl border p-4 text-left transition",
                        active ? "ring-2 ring-offset-2" : "hover:bg-black/5",
                      ].join(" ")}
                      style={
                        active
                          ? { borderColor: "var(--border)", }
                          : { borderColor: "var(--border)" }
                      }
                      
                  >
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-black/70">{t.description}</p>
                    <p className="mt-2 text-sm">
                      ab <span className="font-semibold">{t.basePrice}€</span>
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2">
        <button
            onClick={() => setStep(2)}
            className="rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
        >
            Weiter
        </button>
        </div>

          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Kuchen</h2>

            <div className="grid gap-4 sm:grid-cols-2">
            <CakerySelect
                label="Form"
                value={state.shape}
                onChange={(v) => setState((p) => ({ ...p, shape: v as CakeShape }))}
                options={template.shapes.map((s) => ({
                    value: s,
                    label:
                    s === "round"
                        ? "Rund"
                        : s === "square"
                        ? "Eckig"
                        : s === "heart"
                        ? "Herz"
                        : s === "star"
                        ? "Stern"
                        : s === "oval"
                        ? "Oval"
                        : s === "hex"
                        ? "Hexagon"
                        : s,
                }))}
                />


                <CakerySelect
                label="Größe"
                value={state.sizeId}
                onChange={(v) => setState((p) => ({ ...p, sizeId: v }))}
                options={template.sizes.map((x) => ({
                    value: x.id,
                    label: `${x.label}${x.priceAdd ? ` (+${x.priceAdd}€)` : ""}`,
                }))}
                />


                <CakerySelect
                label="Geschmack"
                value={state.flavorId}
                onChange={(v) => setState((p) => ({ ...p, flavorId: v }))}
                options={template.flavors.map((x) => ({
                    value: x.id,
                    label: `${x.label}${x.priceAdd ? ` (+${x.priceAdd}€)` : ""}`,
                }))}
                />


                <CakerySelect
                label="Füllung"
                value={state.fillingId}
                onChange={(v) => setState((p) => ({ ...p, fillingId: v }))}
                options={template.fillings.map((x) => ({
                    value: x.id,
                    label: `${x.label}${x.priceAdd ? ` (+${x.priceAdd}€)` : ""}`,
                }))}
                />

            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="rounded-md border px-4 py-2 hover:bg-black/5"
              >
                Zurück
              </button>
              <button
                onClick={() => setStep(3)}
                className="rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
              >
                Weiter
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
        <section className="space-y-4">
            <h2 className="text-lg font-medium">Design</h2>

            <div className="grid gap-4 sm:grid-cols-2">
            <CakerySelect
                label="Farbe"
                value={state.colorId}
                onChange={(v) => setState((p) => ({ ...p, colorId: v }))}
                options={template.colors.map((x) => ({
                value: x.id,
                label: `${x.label}${x.priceAdd ? ` (+${x.priceAdd}€)` : ""}`,
                }))}
            />

            <CakerySelect
                label="Deko"
                value={state.decorationId}
                onChange={(v) => setState((p) => ({ ...p, decorationId: v }))}
                options={template.decorations.map((x) => {
                  const price = x.priceAdd ? ` (+${x.priceAdd}€)` : "";
                
                  const icon =
                    x.id === "sprinkles" ? "✨" :
                    x.id === "berries" ? "🍓" :
                    x.id === "drip" ? "🍫" :
                    x.id === "flowers" ? "🌸" :
                    x.id === "gold" ? "⭐" :
                    x.id === "topper" ? "🎉" :
                    x.id === "naked" ? "◻️" :
                    x.id === "ombre" ? "🌈" :
                    x.id === "marble" ? "🌀" :
                    x.id === "ganache" ? "💧" :
                    "";
                
                  return {
                    value: x.id,
                    label: `${x.label}${price}`,
                    icon: icon ? <span className="text-base leading-none">{icon}</span> : undefined,
                  };
                })}
            />

            <label className="space-y-1 sm:col-span-2">
                <span className="cakery-label">Text auf dem Kuchen</span>
                <input
                className="cakery-input"
                placeholder="z.B. Alles Gute Sandro!"
                value={state.message}
                onChange={(e) => setState((p) => ({ ...p, message: e.target.value }))}
                maxLength={30}
                />
                <p className="text-xs text-black/50">
                max. 30 Zeichen
                </p>
            </label>
            </div>

            <div className="flex gap-2">
            <button
                onClick={() => setStep(2)}
                className="rounded-md border px-4 py-2 hover:bg-black/5"
                style={{ borderColor: "var(--border)" }}
            >
                Zurück
            </button>

            <Link
                href="/checkout"
                className="inline-flex items-center rounded-md bg-black px-4 py-2 text-white hover:opacity-90"
            >
                Zur Bestellung
            </Link>
            </div>
        </section>
        )}

      </div>

      {/* Rechts: Vorschau */}
      <aside className="space-y-4">
        <div className="rounded-2xl border p-4">
          <p className="text-sm text-black/70">Vorschau</p>

          <CakePreview template={template} state={state} />

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-black/70">Preis</p>
            <p className="text-2xl font-semibold">{totalPrice}€</p>
          </div>
        </div>

        <div className="rounded-2xl border p-4 text-sm text-black/70">
          <p className="font-medium text-black">Zusammenfassung</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>{template.name}</li>
            <li>Form: {state.shape === "round" ? "Rund" : "Eckig"}</li>
            <li>
              Größe: {template.sizes.find((x) => x.id === state.sizeId)?.label}
            </li>
            <li>
              Geschmack: {template.flavors.find((x) => x.id === state.flavorId)?.label}
            </li>
            <li>
              Füllung: {template.fillings.find((x) => x.id === state.fillingId)?.label}
            </li>
            <li>
              Farbe: {template.colors.find((x) => x.id === state.colorId)?.label}
            </li>
            <li>
              Deko:{" "}
              {template.decorations.find((x) => x.id === state.decorationId)?.label}
            </li>
            {state.message.trim() ? <li>Text: “{state.message.trim()}”</li> : null}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function ShapeSvg({
        shape,
        size,
        fill,
        stroke = "rgba(0,0,0,0.10)",
    }: {
        shape: CakeShape;
        size: number;
        fill: string;
        stroke?: string;
    }) {
        const common = { fill, stroke, strokeWidth: 1.2, vectorEffect: "non-scaling-stroke" as const };
    
        const svgProps = {
        width: size,
        height: size,
        viewBox: "0 0 100 100",
        style: { display: "block", background: "transparent" as const },
        };
    
        if (shape === "round") {
        return (
            <svg {...svgProps}>
            <circle cx="50" cy="50" r="45" {...common} />
            </svg>
        );
        }
    
        if (shape === "square") {
        return (
            <svg {...svgProps}>
            <rect x="10" y="10" width="80" height="80" rx="14" {...common} />
            </svg>
        );
        }
    
        if (shape === "heart") {
        return (
            <svg {...svgProps}>
            <path
                {...common}
                d="M50 84
                C20 66 10 52 10 36
                C10 22 20 14 32 14
                C41 14 47 19 50 24
                C53 19 59 14 68 14
                C80 14 90 22 90 36
                C90 52 80 66 50 84 Z"
            />
            </svg>
        );
        }
    
        if (shape === "star") {
        return (
            <svg {...svgProps}>
            <path
                {...common}
                d="M50 12
                L61 38
                L89 40
                L67 58
                L74 86
                L50 71
                L26 86
                L33 58
                L11 40
                L39 38 Z"
            />
            </svg>
        );
        }
    
        if (shape === "oval") {
        return (
            <svg {...svgProps}>
            <ellipse cx="50" cy="52" rx="38" ry="30" {...common} />
            </svg>
        );
        }
    
        // hex
        return (
        <svg {...svgProps}>
            <path
            {...common}
            d="M50 10
                L82 28
                L82 72
                L50 90
                L18 72
                L18 28 Z"
            />
        </svg>
        );
    }
    


function CakePreview({
    template,
    state,
  }: {
    template: CakeTemplate;
    state: {
      shape: CakeShape;
      colorId: string;
      decorationId: string;
      message: string;
    };
  }) {
    const color = template.colors.find((x) => x.id === state.colorId)?.hex ?? "#F7F7F7";
    const deco = template.decorations.find((x) => x.id === state.decorationId)?.id;

    const shapeMaskStyle = (() => {
      switch (state.shape) {
        case "round":
          return { borderRadius: "9999px" };
        case "square":
          return { borderRadius: "18px" };
        case "heart":
          return {
            clipPath:
              "path('M50 84 C20 66 10 52 10 36 C10 22 20 14 32 14 C41 14 47 19 50 24 C53 19 59 14 68 14 C80 14 90 22 90 36 C90 52 80 66 50 84 Z')",
          };
        case "star":
          return {
            clipPath:
              "polygon(50% 12%, 61% 38%, 89% 40%, 67% 58%, 74% 86%, 50% 71%, 26% 86%, 33% 58%, 11% 40%, 39% 38%)",
          };
        case "oval":
          return { borderRadius: "40%" };
        default:
          return {
            clipPath: "polygon(50% 10%, 82% 28%, 82% 72%, 50% 90%, 18% 72%, 18% 28%)",
          };
      }
    })();

    const renderScatteredDecoration = ({
      icon,
      count,
      itemSize,
      seed,
      opacity = 1,
    }: {
      icon: string;
      count: number;
      itemSize: number;
      seed: number;
      opacity?: number;
    }) => {
      const goldenAngle = 137.508;
      const spread = 0.9;

      return (
        <div className="pointer-events-none absolute inset-[4%] overflow-hidden" style={shapeMaskStyle}>
          {Array.from({ length: count }).map((_, i) => {
            const normalized = (i + 0.5) / count;
            const radius = Math.sqrt(normalized) * spread;
            const angleDeg = i * goldenAngle + seed * 19;
            const angle = (angleDeg * Math.PI) / 180;
            const x = 50 + Math.cos(angle) * radius * 50;
            const y = 50 + Math.sin(angle) * radius * 50;
            const size = itemSize + (((i + seed) % 2) - 0.5);
            const rotate = (i * 17 + seed * 5) % 360;

            return (
              <span
                key={`${icon}-${seed}-${i}`}
                className="absolute select-none"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                  fontSize: `${size}px`,
                  opacity,
                  filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.18))",
                }}
              >
                {icon}
              </span>
            );
          })}
        </div>
      );
    };

    const renderTierDecoration = (isTopTier: boolean) => {
      if (!deco || deco === "none" || deco === "topper") return null;

      const sparkleCount = isTopTier ? 13 : 24;
      const fruitCount = isTopTier ? 8 : 14;
      const seed = isTopTier ? 8 : 3;

      switch (deco) {
        case "sprinkles":
          return renderScatteredDecoration({
            icon: "✨",
            count: sparkleCount,
            itemSize: isTopTier ? 11 : 12,
            seed,
            opacity: 0.9,
          });
        case "berries":
          return renderScatteredDecoration({
            icon: "🍓",
            count: fruitCount,
            itemSize: isTopTier ? 14 : 15,
            seed,
          });
        case "drip":
          return (
            <div className="pointer-events-none absolute left-[14%] right-[14%] top-[14%] h-[18%] rounded-b-2xl bg-[rgba(80,36,20,0.72)]" style={shapeMaskStyle} />
          );
        case "flowers":
          return renderScatteredDecoration({
            icon: "🌸",
            count: fruitCount,
            itemSize: isTopTier ? 14 : 15,
            seed,
          });
        case "gold":
          return renderScatteredDecoration({
            icon: "⭐",
            count: sparkleCount,
            itemSize: isTopTier ? 11 : 12,
            seed,
            opacity: 0.95,
          });
        case "naked":
          return (
            <div className="pointer-events-none absolute inset-[17%] border border-[rgba(139,94,60,0.45)] bg-[rgba(255,255,255,0.22)]" style={shapeMaskStyle} />
          );
        case "ombre":
          return (
            <div
              className="pointer-events-none absolute inset-[8%] bg-gradient-to-b from-[rgba(255,255,255,0.72)] via-transparent to-[rgba(131,79,132,0.32)]"
              style={shapeMaskStyle}
            />
          );
        case "marble":
          return (
            <div
              className="pointer-events-none absolute inset-[10%] opacity-45"
              style={{
                ...shapeMaskStyle,
                background:
                  "repeating-linear-gradient(35deg, rgba(255,255,255,0.8), rgba(255,255,255,0.8) 6px, rgba(130,130,130,0.55) 7px, rgba(130,130,130,0.55) 9px)",
              }}
            />
          );
        case "ganache":
          return (
            <div
              className="pointer-events-none absolute inset-[10%] opacity-75"
              style={{
                ...shapeMaskStyle,
                background:
                  "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.75), rgba(255,255,255,0.12) 45%, transparent 65%)",
              }}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div className="mt-3 flex items-center justify-center">
        <div
          className="relative h-64 w-full max-w-sm overflow-hidden rounded-2xl border bg-white"
          style={{ borderColor: "var(--border)" }}
        >
        {/* Cake body (top-down, nested, form-following shadow) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* soft shadow under whole cake */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                width: 210,
                height: 210,
                borderRadius: 9999,
                background: "rgba(0,0,0,0.12)",
                filter: "blur(20px)",
                opacity: 0.22,
                zIndex: 0,
                }}
            />

            {/* base tier (shadow follows the shape) */}
            <div
                style={{
                  width: 190,
                  height: 190,
                  position: "relative",
                  filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.16))",
                }}
            >
                <ShapeSvg shape={state.shape} size={190} fill={color} stroke="rgba(0,0,0,0.12)" />
                {renderTierDecoration(false)}

                {/* "inner rim" to make it look like the top tier sits inside */}
                <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: 132,
                    height: 132,
                    borderRadius: state.shape === "round" ? 9999 : 18,
                    
                    background: "rgba(255,255,255,0.06)",
                    pointerEvents: "none",
                }}
                />
            </div>

            {/* top tier (smaller, centered INSIDE base) */}
            {template.tiers === 2 ? (
                <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: 118,
                    height: 118,
                    zIndex: 2,
                    filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.18))",
                }}
                >
                <ShapeSvg shape={state.shape} size={118} fill={color} stroke="rgba(0,0,0,0.14)" />
                {renderTierDecoration(true)}

              
                </div>
            ) : null}
            </div>

          {/* Decoration overlay */}
          {deco === "topper" ? (
            <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 text-3xl drop-shadow-sm">
              🎉
            </div>
          ) : null}
  
          {/* Message */}
          {state.message.trim() ? (
            <div className="absolute bottom-6 left-1/2 w-[85%] -translate-x-1/2 text-center text-sm font-medium">
              {state.message.trim()}
            </div>
          ) : (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-black/40">
              (kein Text)
            </div>
          )}
        </div>
      </div>
    );
  }
