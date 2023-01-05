import { useState, useEffect } from "react";
import SelectYears from "./SelectYears";
import DataTable, {createTheme} from "react-data-table-component";
import { Link } from "react-router-dom";
import './ConstructorStandings.css'
import LoadingImg from "./LoadingImg";
import useYears from "./useYears";
import useDarkTheme from "./useDarkTheme";

interface ConstStandings{
    position:string;
    points:string;
    constructor:string;
    constructorId:string;
}

export default function ConstructorStandings() {
    const {age} = useYears();
    const {darkTheme} = useDarkTheme()
    const[constructorStandings, setConstructorStandings] = useState<ConstStandings[]>([]);

    useEffect(()=>{
        fetch(`http://ergast.com/api/f1/${age}/constructorStandings.json`)
        .then((response:any) => response.json())
        .then((result:any) => {
            const driverData = result.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings.map((el:any)=>{
                return {
                    position:el.position,
                    points: el.points,
                    constructor: el.Constructor.name,
                    constructorId: el.Constructor.constructorId
                }
            })
            setConstructorStandings(driverData);
    })
        .catch((error:any) => console.log('error', error));
      },[age])


      const data: ConstStandings[] = constructorStandings?.map((el:any)=>{
        return {
            position:el.position,
            points:el.points,
            constructor:el.constructor,
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
    {constructorStandings.length !== 0 ?
      <>
        <SelectYears />
        <div className={`ageStandingDiv ${!darkTheme ? "darkConstructorsStandings" : ''}`}>
            <div>{age} Standings</div>
        </div>
         
            <div className={`constructorStandingsDiv ${!darkTheme ? "darkConstructors" : ''}`}>
            <DataTable columns={columns}
                        data={data}
                        customStyles={customStyles}
                        theme={!darkTheme ? 'darkTheme' : ''}
            />
            </div> 
        </> : <div className={`loadImgConstructors ${!darkTheme ? "darkConstructors" : ''}`}><LoadingImg /></div>}
        
        </>
    
  )
}
