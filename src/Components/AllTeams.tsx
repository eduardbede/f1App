import useYears from "./useYears"
import { useEffect, useState } from "react";
import SelectYears from "./SelectYears";
import wtf from "wtf_wikipedia";
import { Link } from "react-router-dom";
import './AllTeams.css';
import LoadingImg from "./LoadingImg";
import useDarkTheme from "./useDarkTheme";

interface TeamsData{
  constructorName:string;
  teamId:string;
  image:string;
}

export default function AllTeams() {
  const {age} = useYears();
  const [teamsData, setTeamsData] = useState<TeamsData[]>([]);
  const {darkTheme} = useDarkTheme();
  useEffect(()=>{
    setTeamsData([]);
    fetch(`http://ergast.com/api/f1/${age}/constructors.json`)
    .then((response:any) => response.json())
    .then((result:any) => {
    result.MRData?.ConstructorTable.Constructors.map((el:any)=>{
       wtf.fetch(el.url).then((res:any)=>{
        const teamsData = res.json();
        let spaceReplace = teamsData.sections[0]?.infoboxes[0].logo.text.replace(/\s/g, '_');
         if(spaceReplace.includes("File:")){
           spaceReplace = spaceReplace.replace("File:", "");
          }
         
          fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&format=json&titles=File:${spaceReplace}&iiprop=url&origin=*`)
          .then((response:any)=>response.json())
          .then(dataRes=>{
            const driverImage = dataRes.query.pages;
            let firstKey = Object.keys(driverImage)[0];
            delete Object.assign(driverImage, {'driverImg': driverImage[firstKey]})['-1'];
            setTeamsData((prevData:any)=>{
              return[...prevData,{
                constructorName:el?.name,
                teamId:el?.constructorId,
                image:driverImage?.driverImg?.imageinfo[0]?.url
              }]
            })
          })
       })
      })
    })
    .catch((error:any) => console.log('error', error));
  },[age])
  const sortedDrivers= [...teamsData].sort((a,b):any=>a.constructorName > b.constructorName ? 1:-1);
  const driversCardMap = sortedDrivers.map((el:any)=>{
    return <Link to={`/teams/${el.teamId}`} key={el.teamId} >
              <div className={`singleCardDivTeam ${!darkTheme ? 'singleCardDivTeamDark' : ''}`}>
                  <img className="cardTeamsImage" src={el.image} alt='' ></img>
                  <div>{el.constructorName}</div>
              </div>
           </Link>
  });

    return (
      <>
        <SelectYears />
        {teamsData.length === 0 ? <div className={`loadingDriversImg ${!darkTheme ? 'loadingDriversImgDark' : ''}`}><LoadingImg /></div> : 
          <div className={`singleDivCardsTeam ${!darkTheme ? 'singleDivCardsTeamDark' : ''}`}>
              {driversCardMap}
          </div>}
      </>
    )
}
