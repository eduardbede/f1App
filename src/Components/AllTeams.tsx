import useYears from "./useYears"
import SelectYears from "./SelectYears";
import { Link } from "react-router-dom";
import './AllTeams.css';
import LoadingImg from "./LoadingImg";
import useDarkTheme from "./useDarkTheme";
import useAllTeamsFetch from "./fetchHooks/useAllTeamsFetch";

export default function AllTeams() {
  const {age} = useYears();
  const {darkTheme} = useDarkTheme();
  const {teamsData} = useAllTeamsFetch(age);

  const sortedDrivers= [...teamsData].sort((a,b)=>a.constructorName > b.constructorName ? 1:-1);
  const singleCardDivTeamDark = !darkTheme ? 'singleCardDivTeamDark' : '';
  
  const driversCardMap = sortedDrivers.map((el)=>{
    return <Link to={`/teams/${el.teamId}`} key={el.teamId} >
              <div className={`singleCardDivTeam ${singleCardDivTeamDark}`}>
                  <img className="cardTeamsImage" src={el.image} alt='' ></img>
                  <div>{el.constructorName}</div>
              </div>
           </Link>
  });

const loadingDriversImgDark = !darkTheme ? 'loadingDriversImgDark' : '';
const singleDivCardsTeamDark= !darkTheme ? 'singleDivCardsTeamDark' : '';

    return (
      <>
        <SelectYears />
        {teamsData.length === 0 ? <div className={`loadingDriversImg ${loadingDriversImgDark}`}><LoadingImg /></div> : 
          <div className={`singleDivCardsTeam ${singleDivCardsTeamDark}`}>
              {driversCardMap}
          </div>}
      </>
    )
}
