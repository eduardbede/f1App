import  { useEffect, useState } from 'react'
import wtf from 'wtf_wikipedia'
import { useLocation } from 'react-router-dom'
import LoadingImg from './LoadingImg'
import './Driver.css'
import useDarkTheme from './useDarkTheme'

interface DriverData {
  nationality:string;
  name:string;
  birthDate:string;
  image:any;
  numberRace:string;
}

export default function Driver() {
  const {darkTheme}=useDarkTheme();
  const [driverWiki, setDriverWiki] = useState<DriverData>(
        {
          nationality:'',
          name:'',
          birthDate:'',
          image:'',
          numberRace:''
        }
      )
  
  const location = useLocation();

  useEffect(()=>{
    fetch(`http://ergast.com/api/f1/drivers/${location.pathname}.json`)
      .then(response => response.json())
      .then(result => {
         wtf.fetch(`${result.MRData?.DriverTable.Drivers[0].url}`).then((res:any)=>{
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
            setDriverWiki({ 
              numberRace:result.MRData.DriverTable.Drivers[0]?.permanentNumber,
              nationality:result.MRData.DriverTable.Drivers[0]?.nationality,
              birthDate:driverData.sections[0].infoboxes[0].birth_date?.text,
              name:driverData.sections[0].infoboxes[0].name?.text,
              image: driverImage.driverImg.imageinfo[0]?.url
            }
          )
          })
        })
      })
      .catch(error => console.log('error', error));
},[])

  return (
    <div className={`centredDriverDiv ${!darkTheme ? 'centredDriverDivDark' : ''}`}>
      {driverWiki.image === '' ?  <LoadingImg /> : 
      <div className={`driverCard ${!darkTheme ? 'driverCardDark' : ''}`}>
        <div className='imgDivRes'><img src={driverWiki.image}  className='imgDriverDiv' alt={''}></img></div>
        <div className='nameDiv'>Name: </div>
        <div className='resNameDiv'>{driverWiki.name}</div>
        <div className='bornDiv'>Born: </div>
        <div className='resBornDiv'>{driverWiki.birthDate}</div>
        <div className='natDiv'>Nationality: </div>
        <div className='resNadDiv'>{driverWiki.nationality}</div>
        <div className='numberDiv'>Race Number: </div>
        <div className='resNumberDiv'>{driverWiki.numberRace}</div>
      </div>
      }
    </div>
  )
}
