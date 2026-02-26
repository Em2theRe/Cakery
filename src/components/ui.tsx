import React from "react";

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`cakery-card ${className}`}>{children}</div>;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
}) {
  const base =
    variant === "primary" ? "cakery-btn" : "cakery-btn-outline";
  return <button className={`${base} ${className}`} {...props} />;
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm transition",
        active ? "text-white" : "hover:bg-black/5",
      ].join(" ")}
      style={
        active
          ? { background: "var(--primary)" }
          : { border: "1px solid var(--border)", background: "transparent" }
      }
    >
      {children}
    </button>
  );
}
