import SelectYears from "./SelectYears";
import DataTable, {createTheme} from "react-data-table-component";
import { Link } from "react-router-dom";
import './DriverStandings.css';
import LoadingImg from "./LoadingImg";
import useYears from "./useYears";
import useDarkTheme from "./useDarkTheme";
import useDriversStandingsFetch from "./fetchHooks/useDriversStandingsFetch";

export default function Standings() {
    const {age} = useYears();
    const {darkTheme} = useDarkTheme();
    const {driverStandings} = useDriversStandingsFetch(age);
   
    const data = driverStandings?.map((el)=>{
      return {
          position:el.position,
          driverName:el.driverName,
          constructor:el.constructor,
          points:el.points,
          driverId:el.driverId,
          constructorId:el.constructorId,
          wins:el.wins
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
        selector: (row:any) => <Link to={`/drivers/${row.driverId}`} > 
                                  <div className='raceDriverNameDiv'>
                                    <div>{row.driverName.firstName}</div>
                                    <div>{row.driverName.lastName}</div>
                                  </div>
                                </Link>,
                             
        minWidth:'120px'
      },
      {
        name: 'Constructor',
        selector: (row:any) => <Link to={`/teams/${row.constructorId}`} >
                                    <div className='constructorIdClass'>{row.constructor}</div>
                                </Link>,
        center:true,
        minWidth:'150px'
      },
      {
        name: 'Points',
        selector: (row:any) => row.points,
        center:true,
        minWidth:'10px'
      },
      {
        name: 'Wins',
        selector: (row:any) => row.wins,
        center:true,
        minWidth:'10px'
      },
     
  ];


  const customStyles = {
    head: {
        style: {
            fontSize: '18px',
            fontWeight: 500,
            fontFamily:'Roboto'
        },
    },
    rows: {
        style: {
            minHeight: '72px', // override the row height
            fontSize: '16px',
      fontWeight: 500,
            fontFamily:'Roboto'
        },
    }
  };

 const themeTable = createTheme('darkTheme', {
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
  }, 'dark');

const driverStandingsDivDark = !darkTheme ? 'driverStandingsDivDark': '';
const driverStandingsLoadDark = !darkTheme ? 'driverStandingsLoadDark' : '';
const driverStandingsDivDarkAge = !darkTheme ? 'driverStandingsDivDarkAge': '';
    return (
      <>
      <SelectYears />
      { driverStandings !== undefined ?
        <>
          
          <div className={`ageStandingDiv ${driverStandingsDivDark}`}>
            <div className={`${driverStandingsDivDarkAge}`}>{age} Standings</div>
          </div>
          <div className={`driverStandingsDiv ${driverStandingsDivDark}`}>
            <DataTable columns={columns}
                      data={data}
                      customStyles={customStyles}
                      theme={!darkTheme ? 'darkTheme' : ''}
            />
          </div>
        </>: <div className={`driverStandingsLoading ${driverStandingsLoadDark}`}><LoadingImg /></div>
        }
      </>
    )
}
