import {useState, useEffect} from 'react'
import { RiTimerFill } from "react-icons/ri";
import { Params } from 'react-router-dom';

interface RaceType {
    position:string;
    driver:{firstName:string, lastName:string};
    time?:string;
    constructor:string;
    statusRace:string;
    points:string;
    fastestLap:string;
    driverId:string;
    constructorId:string;
  }
  
  interface ResultMap{ 
    position: string; 
    Driver: { 
      givenName: string; 
      familyName: string; 
      driverId: string; 
    }; 
    Time: { time: undefined; }; 
    Constructor: { name: string; constructorId: string; }; 
    status: string; 
    points: string; 
    FastestLap: { rank: string; }; 
  }

export default function useRaceResultsFetch(age:string | undefined, params:Readonly<Params<string>>) {

    const [singleRaceData, setSingleRaceData] = useState<RaceType[]>([]);
    const [raceName, setRaceName] = useState<string>('');
    useEffect(()=>{
      fetch(`http://ergast.com/api/f1/${age}/${params.id}/results.json`)
      .then((response) => response.json())
      .then((result) => {
            const resultMap = result.MRData.RaceTable?.Races[0]?.Results?.map((el: ResultMap)=>{
              return{
                position:el.position,
                driver:{firstName:el.Driver.givenName, lastName:el.Driver.familyName},
                time:el.Time?.time === undefined? "-" : el.Time?.time,
                constructor:el.Constructor.name,
                statusRace: el.status,
                points:el.points,
                fastestLap:el.FastestLap?.rank === "1" ? <RiTimerFill size={28} /> : '',
                driverId:el.Driver.driverId,
                constructorId: el.Constructor.constructorId
              }
            })
            setRaceName(result.MRData.RaceTable?.Races[0].raceName);
            setSingleRaceData(resultMap);
      })
      .catch((error:undefined | null | string) => console.log('error', error));
    },[])

  return {singleRaceData, raceName};
}
