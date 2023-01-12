import {useState, useEffect} from 'react'
import wtf from 'wtf_wikipedia';

interface TeamsData{
    constructorName:string;
    teamId:string;
    image:string;
  }

interface TeamsMapInterface{ 
    url: string | number | number[] | string[]; 
    name: string; 
    constructorId: string; 
}


export default function useAllTeamsFetch(age:string | undefined) {

 const [teamsData, setTeamsData] = useState<TeamsData[]>([]);

 useEffect(()=>{
    setTeamsData([]);
    fetch(`http://ergast.com/api/f1/${age}/constructors.json`)
    .then((response) => response.json())
    .then((result) => {
    result.MRData?.ConstructorTable.Constructors.map((el: TeamsMapInterface )=>{
       wtf.fetch(el.url).then((res:any)=>{
        const teamsData = res.json();
        let spaceReplace = teamsData.sections[0]?.infoboxes[0].logo.text.replace(/\s/g, '_');
         if(spaceReplace.includes("File:")){
           spaceReplace = spaceReplace.replace("File:", "");
          }
         
          fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&format=json&titles=File:${spaceReplace}&iiprop=url&origin=*`)
          .then((response)=>response.json())
          .then(dataRes=>{
            const driverImage = dataRes.query.pages;
            let firstKey = Object.keys(driverImage)[0];
            delete Object.assign(driverImage, {'driverImg': driverImage[firstKey]})['-1'];
            setTeamsData((prevData)=>{
              return[...prevData,{
                constructorName:el?.name,
                teamId:el?.constructorId,
                image:driverImage?.driverImg?.imageinfo[0]?.url
              }]
            })
          })
       })
      })
    })
    .catch((error) => console.log('error', error));
  },[age])

  return {teamsData}
}
