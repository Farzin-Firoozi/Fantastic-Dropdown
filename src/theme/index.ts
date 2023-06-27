const theme = {
  colors: {
    black: 'rgb(0, 0, 0)',
    primary: 'rgb(65, 101, 196)',
    white: 'rgb(255, 255, 255)',
    generateBlack: (alpha: number) => `rgba(0, 0, 0, ${alpha})`,
    generatePrimary: (alpha: number) => `rgba(65, 101, 196, ${alpha})`,
  },
  spacing: 16,
  radius: 12,
}

export type ThemeType = typeof theme

export default theme
