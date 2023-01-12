import {useState, useEffect} from 'react'

interface ConstStandings{
    position:string;
    points:string;
    constructor:string;
    constructorId:string;
}

interface DataDriverInterface{ 
    position: any; 
    points: any; 
    Constructor: { name: string; constructorId: string; }; 
}


export default function useConstructorFetch(age:string | undefined) {
    const[constructorStandings, setConstructorStandings] = useState<ConstStandings[]>([]);

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/${age}/constructorStandings.json`)
        .then((response) => response.json())
        .then((result) => {
            const driverData = result.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings.map((el: DataDriverInterface)=>{
                return {
                    position:el.position,
                    points: el.points,
                    constructor: el.Constructor.name,
                    constructorId: el.Constructor.constructorId
                }
            })
            setConstructorStandings(driverData);
    })
        .catch((error) => console.log('error', error));
      },[age]);
      
  return {constructorStandings};

}
