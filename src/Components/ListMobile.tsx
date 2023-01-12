import { useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { DarkThemeContext } from "../App";


export default function ListMobile() {
  const darkThemeSelect = useContext<any>(DarkThemeContext);
    const linkNames = [
        {name: "Races",id:"races",},
        {name: "Standings",id:"standings",},
        {name: "Drivers",id:"drivers",},
        {name: "Teams",id:"teams",},
        {name: "News",id:"news",},
          ]

    const mappedNames = linkNames.map((el)=>{
        return <Link to={el.id} key={el.id}>
                    <li>{el.name}</li>
                </Link>
    })

  return (
    <>
        <AiOutlineCloseCircle className="closeMobileMenu"  />
        <ul className='mobileList'>
          {mappedNames}
          <li>
            <DarkModeSwitch checked={darkThemeSelect?.darkTheme}
                            onChange={darkThemeSelect?.darkLightToggle}
                            size={20}
                            sunColor='#EAC55F'
            />
          </li>
        </ul>
    </>
  )
}
