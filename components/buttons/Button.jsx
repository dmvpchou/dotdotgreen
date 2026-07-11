import React from "react";

/**
 * 按鈕 — 點點綠。
 * variant: primary(深林綠實心) | secondary(描邊) | ghost(純文字) | onInk(深底上的亮鈕)
 * 圓角一律 pill。可帶 leading dot 作為簽名點綴。
 */
const SIZES = {
  sm: { pad: "8px 16px", fs: "var(--fs-sm)", dot: 8 },
  md: { pad: "12px 24px", fs: "var(--fs-body)", dot: 10 },
  lg: { pad: "16px 32px", fs: "var(--fs-lg)", dot: 12 },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  dot = false,
  dotColor = "var(--honey)",
  as = "button",
  fullWidth = false,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: fullWidth ? "100%" : "auto",
    padding: s.pad,
    fontFamily: "var(--font-body)",
    fontSize: s.fs,
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: "nowrap",
    borderRadius: "var(--r-pill)",
    border: "1.5px solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background .18s ease, color .18s ease, border-color .18s ease, transform .06s ease",
  };
  const variants = {
    primary: {
      background: "var(--ink)",
      color: "var(--text-invert)",
      borderColor: "var(--ink)",
    },
    secondary: {
      background: "transparent",
      color: "var(--ink)",
      borderColor: "var(--border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      borderColor: "transparent",
    },
    onInk: {
      background: "var(--honey)",
      color: "var(--ink-900)",
      borderColor: "var(--honey)",
    },
  };
  const Tag = as;
  return (
    <Tag
      style={{ ...base, ...variants[variant], ...style }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >
      {dot ? (
        <span style={{ width: s.dot, height: s.dot, borderRadius: 999, background: dotColor, flex: "none" }} />
      ) : null}
      {children}
    </Tag>
  );
}
