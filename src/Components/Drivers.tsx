import useYears from "./useYears";
import SelectYears from "./SelectYears";
import { Link } from "react-router-dom";
import './Drivers.css';
import LoadingImg from "./LoadingImg";
import useDarkTheme from "./useDarkTheme";
import useAllDriversFetch from "./fetchHooks/useAllDriversFetch";


export default function Drivers() {
  const {darkTheme} = useDarkTheme();
  const {age} = useYears();
  const {driversData} = useAllDriversFetch(age);

  const sortedDrivers= [...driversData].sort((a,b)=>a.firstName > b.firstName ? 1:-1);

  const singleDivCardsDarkNames = !darkTheme ? 'singleDivCardsDarkNames' : '';
  
  const driversCardMop = sortedDrivers.map((el)=>{
    return <Link to={`/drivers/${el.driverId}`} key={el.driverId} >
              <div className={`singleCardDivDriver ${!darkTheme ? 'singleCardDivDriverDark' : ''}`}>
                  <img className="cardDriversImage" src={el.image} alt='' ></img>
                  <div className={`${singleDivCardsDarkNames}`}>{el.firstName} {el.lastName}</div>
              </div>
           </Link>
    
  });
const singleDivCardsDark = !darkTheme ? 'singleDivCardsDark' : '';

    return (
      <>
        <SelectYears />
        {driversData.length === 0 ? <div className={`loadingDriversImg ${singleDivCardsDark}`}><LoadingImg /></div> : 
          <div className={`singleDivCards ${singleDivCardsDark}`}>
              {driversCardMop}
          </div>}
      </>
    )
}
