import {useContext} from 'react'
import { DarkThemeContext } from '../App'

export default function useDarkTheme() {
    const darkContextTheme = useContext<any>(DarkThemeContext)
    const darkTheme = darkContextTheme.darkTheme;
    const darkLightToggle = darkContextTheme.darkLightToggle;
  return (
    {darkTheme, darkLightToggle}
  )
}
