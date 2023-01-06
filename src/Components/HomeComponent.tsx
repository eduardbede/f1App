import useDarkTheme from "./useDarkTheme"
import './HomeComponent.css'
import {motion} from 'framer-motion'

export default function HomeComponent() {
  const {darkTheme}=useDarkTheme();
  return (
    <div className={`textDivHome ${!darkTheme ? 'textDivHomeDark': ''}`}>
      <motion.div initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}>
        Welcome to our Formula 1 website! Here you will find all the latest news, results, and analysis from the world of Formula 1 racing. 
        We cover every Grand Prix race and keep you up-to-date with the latest standings and points for all the drivers and teams. 
        Whether you are a die-hard fan or a newcomer to Formula 1, our site has something for everyone. 
        Stay with us for all the action from the fast-paced and exciting world of Formula 1!</motion.div>
    </div>
  )
}
