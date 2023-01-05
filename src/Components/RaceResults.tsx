import { useState, useEffect } from 'react';
import { useParams, Link }from 'react-router-dom'
import DataTable, {createTheme} from 'react-data-table-component';
import LoadingImg from './LoadingImg';
import { RiTimerFill } from "react-icons/ri";
import './RaceResult.css';
import useYears from './useYears';
import useDarkTheme from './useDarkTheme';

interface RaceType {
  position:string;
  driver:{firstName:string, lastName:string};
  time:string;
  constructor:string;
  statusRace:string;
  points:string;
  fastestLap:string;
  driverId:string;
  constructorId:string;
}

export default function RaceResults() {
  const params = useParams<string>();
  const {darkTheme} = useDarkTheme()
  const {age} = useYears();
  const [singleRaceData, setSingleRaceData] = useState<string[]>([]);
  const [raceName, setRaceName] = useState<string>('');
  useEffect(()=>{
    fetch(`http://ergast.com/api/f1/${age}/${params.id}/results.json`)
    .then((response:any) => response.json())
    .then((result:any) => {
          const resultMap = result.MRData.RaceTable?.Races[0]?.Results?.map((el:any)=>{
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
    .catch((error:any) => console.log('error', error));
  },[])
  const data: RaceType[] = singleRaceData.map((el:any)=>{
    return {
        position:el.position,
        driver:el.driver,
        time:el.time,
        constructor:el.constructor,
        statusRace: el.statusRace,
        points:el.points,
        fastestLap: el.fastestLap,
        driverId:el.driverId,
        constructorId:el.constructorId,
    }
   })

  const columns = [
    {
      name: 'Position',
      selector: (row:any) => row.position,
      minWidth:'80px'
    },
    {
      name: 'Driver',
      selector: (row:any) =><Link to={`/drivers/${row.driverId}`} > 
                              <div className='raceDriverNameDiv'>
                                 <div>{row.driver.firstName}</div>
                                 <div>{row.driver.lastName}</div>
                              </div>
                            </Link>,
      minWidth:'120px'
    },
    {
      name: 'Constructor',
      selector: (row:any) =><Link to={`/teams/${row.constructorId}`} >
                                <div className='constructorIdClass'>{row.constructor}</div>
                            </Link>,
      minWidth:'140px'
    },
    {
      name: 'Time',
      selector: (row:any) => row.time,
      center:true,
      minWidth:'120px'
    },
    {
      name: 'Race Status',
      selector: (row:any) => row.statusRace,
      center:true,
      minWidth:'120px'
    },
    {
      name: 'Points',
      selector: (row:any) => row.points,
      center:true,
      minWidth:'10px'
    },
    {
      name: 'Fastest Lap',
      selector: (row:any) => row.fastestLap,
      center:true,
      minWidth:'100px'
    },
];

const customStyles = {
  rows: {
      style: {
          minHeight: '72px'
      },
  },
  head: {
    style: {
        fontSize: '20px',
        fontWeight: 500,
        fontFamily:'Roboto'
    },
  },
  cells: {
		style: {
			  fontSize: '15px',
        fontWeight: 450,
        fontFamily:'Roboto'
		},
	},
};

createTheme('darkTheme', {
  text: {
    primary: '#A2EAB6',
    secondary: '#2aa198',
  },
  background: {
    default: '#121212',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

  return (
    <>
    {singleRaceData.length === 0 ? <div className={`raceResultsLoadImg ${!darkTheme ? 'raceResultsLoadDark' : ''}`}><LoadingImg /></div>:
    <div className={`raceResultDiv ${!darkTheme ? "pResultsDark" : ''}`}>
      <p className={`pResults ${!darkTheme ? "pResultsDark" : ''}`}>{age} {raceName}</p>
      <DataTable columns={columns}
                 data={data}
                 customStyles={customStyles}
                 theme={!darkTheme ? 'darkTheme' : ''}
      />
    </div>}
    </>
  )
}
