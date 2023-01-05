import { useState } from "react";
import DriversStandings from "./DriversStandings";
import ConstructorStandings from "./ConstructorStandings";
import useDarkTheme from "./useDarkTheme";
import './Standings.css';

export default function Standings() {
  const {darkTheme} = useDarkTheme();
  const[constDriver, setConstDriver] = useState<string>(sessionStorage.getItem('constDriver') || 'driver');

  if(constDriver !== sessionStorage.getItem('constDriver')){
    sessionStorage.setItem('constDriver', constDriver);
  }

  function selectConstDriver(item:string){
    if(constDriver === item) return;
    setConstDriver(item);
  }
const dynamicClassDriver = constDriver === 'driver' && 'selectedWho' ;
const dynamicClassConst = constDriver === 'const' &&  'selectedWho';

    return (
      <>
        <div className={`driverConstructorSelect ${!darkTheme ? 'driverConstructorSelectDark' : ''}`}>
          <div className={`constDriverSelect ${dynamicClassDriver} ${!darkTheme ? "selectedWhoDark" : ''}`} onClick={()=>{selectConstDriver('driver')}}>Driver</div>
          <div className={`constDriverSelect ${dynamicClassConst} ${!darkTheme ? "selectedWhoDark" : ''}`} onClick={()=>{selectConstDriver('const')}}>Constructor</div>
        </div>
        {
        constDriver === 'driver'? <DriversStandings /> :
                                  <ConstructorStandings />
        }
      </>
      
    )
}
