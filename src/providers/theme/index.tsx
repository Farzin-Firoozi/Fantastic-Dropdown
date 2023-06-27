import { FC, PropsWithChildren } from 'react'

import { ThemeProvider as JSSThemeProvider } from 'react-jss'

import theme from '../../theme'

const ThemeProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props

  return <JSSThemeProvider theme={theme}>{children}</JSSThemeProvider>
}

export default ThemeProvider
