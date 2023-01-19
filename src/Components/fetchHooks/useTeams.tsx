import { useState, useEffect } from "react";
import wtf from "wtf_wikipedia";
import noImg from '../../img/noImg.svg';
import { Params } from 'react-router-dom';

interface ConstructorData {
    constName:string;
    owner:string;
    base:string;
    image:any;
    chassis:string;
    engine:string;
    constChamp:string;
  }

export default function useTeams(params:Readonly<Params<string>>) {

    const [constructorData, setConstructorData] = useState<ConstructorData>({
        constName:'',
        owner:'',
        base:'',
        image:'',
        chassis:'',
        engine:'',
        constChamp:'',
      })
    
      useEffect(()=>{
        fetch(`http://ergast.com/api/f1/constructors/${params.constructorId}.json`)
        .then((response) => response.json())
        .then((result) => {
          wtf.fetch(`${result.MRData.ConstructorTable.Constructors[0]?.url}`).then((res:any)=>{
            const constructorData = res.json();
            if(constructorData.sections[0].infoboxes !== undefined && constructorData.sections[0].infoboxes[0].logo !== undefined){
              let spaceReplace = constructorData.sections[0]?.infoboxes[0]?.logo?.text.replace(/\s/g, '_');
              if(spaceReplace.includes("File:")){
                spaceReplace = spaceReplace.replace("File:", "");
               }
               fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&format=json&titles=File:${spaceReplace}&iiprop=url&origin=*`)
               .then((response)=>response.json())
               .then((dataRes)=>{
                 const driverImage = dataRes.query.pages;
                   setConstructorData({ 
                     constName: constructorData.sections[0]?.infoboxes[0].long_name?.text,
                     owner: constructorData.sections[0]?.infoboxes[0].principal?.text,
                     base: constructorData.sections[0]?.infoboxes[0].base?.text,
                     image: driverImage[Object.keys(driverImage)[0]]?.imageinfo[0]?.url,
                     chassis: constructorData.sections[0]?.infoboxes[0][`${new Date().getFullYear().toString()} chassis`]?.text,
                     constChamp: constructorData.sections[0]?.infoboxes[0].cons_champ?.text,
                     engine: constructorData.sections[0]?.infoboxes[0][`${new Date().getFullYear().toString()} engine`]?.text
                   })
               })
            } else{
              setConstructorData({ 
                constName: result.MRData.ConstructorTable.Constructors[0]?.name,
                owner: '-',
                base: '-',
                image: noImg,
                chassis: '-',
                constChamp: '-',
                engine: '-',
              })
            }
          })
     })
        .catch((error:string | undefined | null) => console.log('error', error));
      },[])

  return {constructorData}
}
