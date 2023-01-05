import {useEffect, useState } from 'react'
import TableColumn from './TableColumn';
import LoadingImg from './LoadingImg';
import './RaceTable.css'
import useYears from './useYears';
import useDarkTheme from './useDarkTheme';

export default function RaceTable() {
  const {darkTheme} = useDarkTheme();
  const { age } = useYears();
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
    
      return (
        <>
        {dataRace.length === 0 ? <div className={`loadingDivRace ${!darkTheme ? 'darkTheme' : ''}`}><LoadingImg /></div>:
          <div className={`tableDiv ${!darkTheme ? 'darkTheme' : ''}`} >
              <TableColumn dataRace={dataRace} />
          </div>
        }
        </>
      );
}