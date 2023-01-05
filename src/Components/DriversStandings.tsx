import SelectYears from "./SelectYears";
import {useEffect, useState} from 'react'
import DataTable, {createTheme} from "react-data-table-component";
import { Link } from "react-router-dom";
import './DriverStandings.css';
import LoadingImg from "./LoadingImg";
import useYears from "./useYears";
import useDarkTheme from "./useDarkTheme";

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

export default function Standings() {
  const[driverStandings, setDriverStandings] = useState<DriverStandings[]>([]);
    const {age} = useYears();
    const {darkTheme} = useDarkTheme();
    
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

    const data: DriverStandings[] = driverStandings?.map((el:any)=>{
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
      {driverStandings.length !== 0 ?
        <>
          <SelectYears />
          <div className={`ageStandingDiv ${!darkTheme ? 'driverStandingsDivDark': ''}`}>
            <div className={`${!darkTheme ? 'driverStandingsDivDarkAge': ''}`}>{age} Standings</div>
          </div>
          <div className={`driverStandingsDiv ${!darkTheme ? 'driverStandingsDivDark' : ''}`}>
            <DataTable columns={columns}
                      data={data}
                      customStyles={customStyles}
                      theme={!darkTheme ? 'darkTheme' : ''}
            />
          </div>
        </>: <div className={`driverStandingsLoading ${!darkTheme ? 'driverStandingsLoadDark' : ''}`}><LoadingImg /></div>
        }
      </>
    )
}
