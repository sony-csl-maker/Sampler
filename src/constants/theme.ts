const themeConfig = {
  palette: {
    darkGrey: "#28272c",
    lightGrey: "#3F4043",
    black: "#1A191E",
    blue: "#3B3650",
    green: "#496854",
    purple: "#5A5374",
    red: "#B44055",
    shinyPurple: "#7762CB",
    shinyPurpleLowOpacity: "rgba(119, 98, 203, 0.2)",
    darkYellow: "#DB9C3B",
    darkYellowLowOpacity: "rgba(219, 156, 59, 0.2)",
    lightPink: "rgba(255, 99, 132, 0.8)",
    lightPinkLowOpacity: "rgba(255, 99, 132, 0.2)",
    darkPink: "#D45FB9",
    darkPinkLowOpacity: "rgba(212, 95, 185, 0.2)",
    orange: "#FF9473",
    orangeLowOpacity: "rgba(255, 148, 115, 0.2)",
    lightYellow: "#EDD039",
    lightYellowLowOpacity: "rgba(237, 208, 57, 0.2)",
    navyBlue: "#197FD2",
    navyBlueLowOpacity: "rgba(25, 127, 210, 0.2)",
    lightGreen: "#008F74",
    lightGreenLowOpacity: "rgba(0, 143, 116, 0.2)",
  },

  spacingUnit: 8,
};

/* Do not modify here, edit themeConfig instead */
export const theme = {
  palette: {
    ...themeConfig.palette,
  },
  spacing: (...units: number[]) =>
    units.map((unit) => `${themeConfig.spacingUnit * unit}px`).join(" "),
};
