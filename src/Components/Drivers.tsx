import useYears from "./useYears"
import { useEffect, useState } from "react";
import SelectYears from "./SelectYears";
import wtf from "wtf_wikipedia";
import { Link } from "react-router-dom";
import './Drivers.css';
import LoadingImg from "./LoadingImg";
import useDarkTheme from "./useDarkTheme";

interface DriversData{
  firstName:string;
  lastName:string;
  driverId:string;
  image:string;
}

export default function Drivers() {
  const {darkTheme} = useDarkTheme()
  const {age} = useYears()
  const [driversData, setDriversData] = useState<DriversData[]>([])

  useEffect(()=>{
    setDriversData([])
    fetch(`http://ergast.com/api/f1/${age}/drivers.json`)
    .then((response:any) => response.json())
    .then((result:any) => {
    result.MRData?.DriverTable.Drivers.map((el:any)=>{
       wtf.fetch(el.url).then((res:any)=>{
        const driverData = res.json();
        let spaceReplace = driverData.sections[0]?.infoboxes[0].image.text.replace(/\s/g, '_');
         if(spaceReplace.includes("File:")){
           spaceReplace = spaceReplace.replace("File:", "");
          }
          fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&format=json&titles=File:${spaceReplace}&iiprop=url&origin=*`)
          .then((response:any)=>response.json())
          .then(dataRes=>{
            const driverImage = dataRes.query.pages;
            delete Object.assign(driverImage, {'driverImg': driverImage['-1']})['-1'];
            setDriversData((prevData:any)=>{
              return[...prevData,{
                firstName:el?.givenName,
                lastName:el?.familyName,
                driverId:el?.driverId,
                image:driverImage.driverImg.imageinfo[0]?.url
              }]
            })
          })
       })
      })
    })
    .catch((error:any) => console.log('error', error));
  },[age])
  const sortedDrivers= [...driversData].sort((a,b):any=>a.firstName > b.firstName ? 1:-1);
  const driversCardMop = sortedDrivers.map((el:any)=>{
    return <Link to={`/drivers/${el.driverId}`} key={el.driverId} >
              <div className={`singleCardDivDriver ${!darkTheme ? 'singleCardDivDriverDark' : ''}`}>
                  <img className="cardDriversImage" src={el.image} alt='' ></img>
                  <div className={`${!darkTheme ? 'singleDivCardsDarkNames' : ''}`}>{el.firstName} {el.lastName}</div>
              </div>
           </Link>
    
  })
    return (
      <>
        <SelectYears />
        {driversData.length === 0 ? <div className={`loadingDriversImg ${!darkTheme ? 'singleDivCardsDark' : ''}`}><LoadingImg /></div> : 
          <div className={`singleDivCards ${!darkTheme ? 'singleDivCardsDark' : ''}`}>
              {driversCardMop}
          </div>}
      </>
    )
}
