import { useTheme as useJSSTheme } from 'react-jss'
import { ThemeType } from '../../theme'

const useTheme = () => {
  return useJSSTheme<ThemeType>()
}

export default useTheme
