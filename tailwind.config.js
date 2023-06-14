/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      width: {
        container: "960px",
      },
      borderWidth: {
        3: "3px",
      },
      fontFamily: {
        sans: "Helvetica Neue,Arial,Hiragino Kaku Gothic ProN,Hiragino Sans,Meiryo,sans-serif",
      },
      boxShadow: {
        card: "0px 1px 4px 1px rgba(0, 0, 0, 0.1)",
        "card-drag": "8px 8px 0px 0px rgba(0, 0, 0, 0.15)",
        popper:
          "0px 7px 14px rgba(0, 0, 0, .05), 0px 0px 3px rgba(0, 0, 0, .08), 0px 0px 1px rgba(0, 0, 0, .2)",
        // "section-card": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        "section-card": "0 4px 8px rgba(0,0,0,.08)",
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite 0.5s",
        "spin-slow": "spin 6s linear infinite",
        slideDown: `slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)`,
        slideUp: `slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1) reverse`,
        overlayShow: "overlayShow 150ms ease-in-out",
        contentShow: "contentShow 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        slideDown: {
          "0%": {
            height: 0,
          },
          "100%": {
            height: "var(--radix-accordion-content-height)",
          },
        },
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, 50%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      colors: {
        block: "var(--block-color)",
        socket: "var(--socket-color)",
        accent: "#777777",
      },
    },
    data: {
      selected: 'state="selected"',
      occupied: 'state="occupied"',
      open: 'state="open"',
      closed: 'state="closed"',
      active: 'state="active"',
      error: 'error="true"',
      highlighted: "highlighted",
    },
  },
  plugins: [],
}
