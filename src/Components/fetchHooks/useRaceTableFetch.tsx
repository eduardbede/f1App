import {useEffect, useState} from 'react';

export default function useRaceTableFetch(age:string | undefined){

    const [dataRace, setDataRace] = useState<string[]>([]);

    useEffect(()=>{
      setDataRace([]);
        fetch(`https://ergast.com/api/f1/${age}.json`)
          .then(response => response.json())
          .then(result => {
              setDataRace(result.MRData.RaceTable.Races);
          })
          .catch(error => console.log('error', error));
    },[age]);
  return {dataRace};
  
}
