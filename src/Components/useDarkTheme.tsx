import {useContext} from 'react'
import { DarkThemeContext } from '../App'

export default function useDarkTheme() {
    const darkContextTheme = useContext(DarkThemeContext);
    const darkTheme = darkContextTheme!.darkTheme;
    const darkLightToggle = darkContextTheme!.darkLightToggle;
  return (
    {darkTheme, darkLightToggle}
  )
}
