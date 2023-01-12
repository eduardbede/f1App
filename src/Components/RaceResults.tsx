import { useParams, Link, Params }from 'react-router-dom';
import DataTable, {createTheme} from 'react-data-table-component';
import LoadingImg from './LoadingImg';
import './RaceResult.css';
import useYears from './useYears';
import useDarkTheme from './useDarkTheme';
import useRaceResultsFetch from './fetchHooks/useRaceResultsFetch';


export default function RaceResults(){

  const params = useParams<Readonly<Params<string>>>();
  const {darkTheme} = useDarkTheme();
  const {age} = useYears();
  const {raceName, singleRaceData} = useRaceResultsFetch(age, params);

  const data = singleRaceData.map((el)=>{
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
   });

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

const tabeleTheme = createTheme('darkTheme', {
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

const darkTable = !darkTheme ? 'darkTheme' : ''

  return (
    <>
    {singleRaceData.length === 0 ? <div className={`raceResultsLoadImg ${!darkTheme ? 'raceResultsLoadDark' : ''}`}><LoadingImg /></div>:
    <div className={`raceResultDiv ${!darkTheme ? "pResultsDark" : ''}`}>
      <p className={`pResults ${!darkTheme ? "pResultsDark" : ''}`}>{age} {raceName}</p>
      <DataTable columns={columns}
                 data={data}
                 customStyles={customStyles}
                 theme={darkTable}
      />
    </div>}
    </>
  )
}
