import { Link } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkTheme from './useDarkTheme';

export default function ListDesktop() {
  const {darkTheme, darkLightToggle} = useDarkTheme()
    const linkNames = [
        {name: "Races",id:"races",},
        {name: "Standings",id:"standings",},
        {name: "Drivers",id:"drivers",},
        {name: "Teams",id:"teams",},
        {name: "News",id:"news",},
          ]

    const mappedNames = linkNames.map((el,i)=>{
        return <Link to={el.id} key={i}>
                    <li>{el.name}</li>
                </Link>
    })
  return (
    <ul className='listNav'>
            {mappedNames}
            <DarkModeSwitch checked={darkTheme}
                            onChange={darkLightToggle}
                            size={20}
                            sunColor='#EAC55F'
            />
     </ul>
  )
}
