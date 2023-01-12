import {useEffect, useState} from 'react'
import wtf from 'wtf_wikipedia';

interface DriverData {
    nationality:string;
    name:string;
    birthDate:string;
    image:string;
    numberRace:string;
  }

  interface LocationState {
      pathname: string;
  }

export default function useDriverFetch(location:LocationState) {
    const [driverWiki, setDriverWiki] = useState<DriverData>(
        {
          nationality:'',
          name:'',
          birthDate:'',
          image:'',
          numberRace:''
        }
      );

    useEffect(()=>{
    fetch(`http://ergast.com/api/f1/drivers/${location?.pathname}.json`)
        .then(response => response.json())
        .then(result => {
            wtf.fetch(`${result.MRData?.DriverTable.Drivers[0].url}`).then((res:any)=>{
            const driverData = res.json();
            let spaceReplace = driverData.sections[0]?.infoboxes[0].image.text.replace(/\s/g, '_');
            if(spaceReplace.includes("File:")){
                spaceReplace = spaceReplace.replace("File:", "");
                }
            fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&format=json&titles=File:${spaceReplace}&iiprop=url&origin=*`)
            .then((response)=>response.json())
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
},[]);

  return {driverWiki};
}
