import useDarkTheme from "./useDarkTheme"
import './HomeComponent.css'

export default function HomeComponent() {
  const {darkTheme}=useDarkTheme();
  return (
    <div className={`textDivHome ${!darkTheme ? 'textDivHomeDark': ''}`}>Welcome to our Formula 1 website! Here you will find all the latest news, results, and analysis from the world of Formula 1 racing. 
      We cover every Grand Prix race and keep you up-to-date with the latest standings and points for all the drivers and teams. 
      Whether you are a die-hard fan or a newcomer to Formula 1, our site has something for everyone. 
      Stay with us for all the action from the fast-paced and exciting world of Formula 1!
    </div>
  )
}
