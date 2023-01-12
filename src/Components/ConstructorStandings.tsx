import SelectYears from "./SelectYears";
import DataTable, {createTheme} from "react-data-table-component";
import { Link } from "react-router-dom";
import './ConstructorStandings.css'
import LoadingImg from "./LoadingImg";
import useYears from "./useYears";
import useDarkTheme from "./useDarkTheme";
import useConstructorFetch from "./fetchHooks/useConstructorFetch";


export default function ConstructorStandings() {
    const {age} = useYears();
    const {darkTheme} = useDarkTheme();
    const {constructorStandings} = useConstructorFetch(age)

    const data = constructorStandings?.map((el)=>{
      return {
          position:el.position,
          points:el.points,
          constructor:el.constructor,
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

   const tableThemeCreate =  createTheme('darkTheme', {
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

    const darkColor = !darkTheme ? "darkConstructors" : '';
    const darkConstructorsStandings = !darkTheme ? "darkConstructorsStandings" : '';
    const tableTheme = !darkTheme ? 'darkTheme' : ''
    
  return (
    <>
    <SelectYears />
    {constructorStandings !== undefined ?
      <>
        <div className={`ageStandingDiv ${darkConstructorsStandings}`}>
            <div>{age} Standings</div>
        </div>
         
            <div className={`constructorStandingsDiv ${darkColor}`}>
            <DataTable columns={columns}
                        data={data}
                        customStyles={customStyles}
                        theme={tableTheme}
            />
            </div> 
        </> : <div className={`loadImgConstructors ${darkColor}`}><LoadingImg /></div>}
        
        </>
    
  )
}
