"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type StoredBuilder = {
  state: {
    templateId: string;
    shape: string;
    sizeId: string;
    flavorId: string;
    fillingId: string;
    colorId: string;
    decorationIds: string[];
    message: string;
  };
  totalPrice: number;
  templateName: string;
  updatedAt: string;
};

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  fulfillment: "pickup" | "delivery";
  date: string;
  notes: string;
  agree: boolean;
};

export default function CheckoutPage() {
  const [builder, setBuilder] = useState<StoredBuilder | null>(null);
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "ok" | "error"; msg?: string; orderId?: string }>({ type: "idle" });

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    phone: "",
    fulfillment: "pickup",
    date: "",
    notes: "",
    agree: false,
  });

  useEffect(() => {
    const raw = localStorage.getItem("cakery_builder");
    if (!raw) return;
    try {
      setBuilder(JSON.parse(raw));
    } catch {
      setBuilder(null);
    }
  }, []);

  const canSubmit = useMemo(() => {
    return (
      !!builder &&
      form.fullName.trim().length >= 2 &&
      form.email.includes("@") &&
      form.date.trim().length > 0 &&
      form.agree &&
      status.type !== "loading"
    );
  }, [builder, form, status.type]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Bestellung</h1>
        <p className="cakery-muted">
          Kein Login – du gibst deine Daten nur für die Bestellabwicklung an.
        </p>

        {!builder ? (
          <div className="cakery-card p-4">
            <p className="font-medium">Kein Design gefunden</p>
            <p className="cakery-muted mt-1 text-sm">
              Bitte gestalte zuerst einen Kuchen im Builder.
            </p>
            <Link href="/builder" className="cakery-btn mt-3 inline-flex">
              Zum Builder
            </Link>
          </div>
        ) : (
          <form
            className="cakery-card p-4 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!canSubmit || !builder) return;

              setStatus({ type: "loading", msg: "Sende Bestellung..." });

              try {
                const res = await fetch("/api/order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    items: {
                      templateId: builder.state.templateId,
                      shape: builder.state.shape,
                      sizeId: builder.state.sizeId,
                      flavorId: builder.state.flavorId,
                      fillingId: builder.state.fillingId,
                      colorId: builder.state.colorId,
                      decorationIds: builder.state.decorationIds ?? [],
                      message: builder.state.message,
                      totalPrice: builder.totalPrice,
                    },
                    customer: {
                      fullName: form.fullName,
                      email: form.email,
                      phone: form.phone || undefined,
                      fulfillment: form.fulfillment,
                      date: form.date,
                      notes: form.notes || undefined,
                    },
                  }),
                });

                const data = await res.json();

                if (!res.ok || !data.ok) {
                  setStatus({ type: "error", msg: data?.error ?? "Bestellung fehlgeschlagen" });
                  return;
                }

                setStatus({ type: "ok", orderId: data.orderId, msg: "Bestellung gesendet!" });
              } catch {
                setStatus({ type: "error", msg: "Netzwerkfehler" });
              }
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 sm:col-span-2">
                <span className="cakery-label">Name *</span>
                <input
                  className="cakery-input"
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                />
              </label>

              <label className="space-y-1">
                <span className="cakery-label">E-Mail *</span>
                <input
                  className="cakery-input"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                />
              </label>

              <label className="space-y-1">
                <span className="cakery-label">Telefon (optional)</span>
                <input
                  className="cakery-input"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                />
              </label>

              <label className="space-y-1">
                <span className="cakery-label">Abholung / Lieferung</span>
                <select
                  className="cakery-select"
                  value={form.fulfillment}
                  onChange={(e) => setForm((p) => ({ ...p, fulfillment: e.target.value as any }))}
                >
                  <option value="pickup">Abholung</option>
                  <option value="delivery">Lieferung</option>
                </select>
              </label>

              <label className="space-y-1">
                <span className="cakery-label">Wunschtermin *</span>
                <input
                  type="date"
                  className="cakery-input"
                  value={form.date}
                  onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                />
              </label>

              <label className="space-y-1 sm:col-span-2">
                <span className="cakery-label">Hinweise (Allergien, Details)</span>
                <textarea
                  className="cakery-input"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                />
              </label>
            </div>

            <label className="flex items-start gap-2 text-sm cakery-muted">
              <input
                type="checkbox"
                className="mt-1"
                checked={form.agree}
                onChange={(e) => setForm((p) => ({ ...p, agree: e.target.checked }))}
              />
              <span>
                Ich stimme zu, dass meine Daten zur Bestellabwicklung verarbeitet werden. *
              </span>
            </label>

            {status.type !== "idle" ? (
              <div className="text-sm">
                {status.type === "loading" ? (
                  <p className="cakery-muted">{status.msg}</p>
                ) : status.type === "ok" ? (
                  <p className="text-green-700">
                    {status.msg} Bestellnummer: <b>{status.orderId}</b>
                  </p>
                ) : (
                  <p className="text-red-700">{status.msg}</p>
                )}
              </div>
            ) : null}

            <button
              disabled={!canSubmit}
              className={canSubmit ? "cakery-btn" : "cakery-btn opacity-50 cursor-not-allowed"}
            >
              Bestellung senden
            </button>
          </form>
        )}
      </div>

      <aside className="space-y-4">
        <div className="cakery-card p-4">
          <p className="font-medium">Dein Design</p>

          {!builder ? (
            <p className="cakery-muted mt-2 text-sm">Noch kein Design vorhanden.</p>
          ) : (
            <div className="mt-2 space-y-2 text-sm cakery-muted">
              <p>
                <span className="text-black">Schablone:</span> {builder.templateName}
              </p>
              <p>
                <span className="text-black">Preis:</span>{" "}
                <span className="text-xl font-semibold text-black">{builder.totalPrice}€</span>
              </p>
              <p className="text-xs text-black/50">
                Stand: {new Date(builder.updatedAt).toLocaleString()}
              </p>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <Link href="/builder" className="cakery-btn-outline inline-flex">
              Design ändern
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}