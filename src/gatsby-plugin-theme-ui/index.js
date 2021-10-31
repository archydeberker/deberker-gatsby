export default {
  colors: {
    text: "rgba(0,0,0)",
    background: "#fff",
    primary: "#ff6347",
    secondary: "#ff6347",
  },

  fontWeights: {
    body: 900,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  links: {
    bold: {
      fontWeight: "bold",
    },
    nav: {
      fontWeight: "bold",
      color: "inherit",
      textDecoration: "none",
    },
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      ":hover": { h2: { color: "secondary" } },
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
}
