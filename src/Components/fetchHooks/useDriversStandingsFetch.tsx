import {useEffect, useState} from 'react';

interface DriverStandings{
    position:string;
    driverName:DriverName;
    points:string;
    constructor:string;
    constructorId:string;
    wins:string;
    driverId:string;
  }
  
  interface DriverName{
    firstName:string;
    lastName:string
  }
export default function useDriversStandingsFetch(age:string | undefined){
    const[driverStandings, setDriverStandings] = useState<DriverStandings[]>([]);

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/${age}/driverStandings.json`)
        .then((response:any) => response.json())
        .then((result:any) => {
          const driverData = result.MRData.StandingsTable.StandingsLists[0]?.DriverStandings.map((el:any)=>{
            return {
              position: el.position,
              driverName:{firstName:el.Driver.givenName, lastName:el.Driver.familyName},
              driverId:el.Driver.driverId,
              points: el.points,
              constructor: el.Constructors[0]?.name,
              constructorId: el.Constructors[0]?.constructorId,
              wins:el.wins
            }
          })
          setDriverStandings(driverData)
        })
        .catch((error:any) => console.log('error', error));
      },[age])

  return {driverStandings};
}
