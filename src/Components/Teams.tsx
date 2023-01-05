import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import './Teams.css'
import noImg from '../../src/img/noImg.svg'
import wtf from 'wtf_wikipedia';
import LoadingImg from './LoadingImg';
import useDarkTheme from './useDarkTheme';

interface ConstructorData {
  constName:string;
  owner:string;
  base:string;
  image:any;
  chassis:string;
  engine:string;
  constChamp:string;
}

export default function Teams(){
  const {darkTheme}=useDarkTheme();
  const params = useParams<string>();
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
    .then((response:any) => response.json())
    .then((result:any) => {
      wtf.fetch(`${result.MRData.ConstructorTable.Constructors[0]?.url}`).then((res:any)=>{
        const constructorData = res.json();
        if(constructorData.sections[0].infoboxes !== undefined && constructorData.sections[0].infoboxes[0].logo !== undefined){
          let spaceReplace = constructorData.sections[0]?.infoboxes[0]?.logo?.text.replace(/\s/g, '_');
          if(spaceReplace.includes("File:")){
            spaceReplace = spaceReplace.replace("File:", "");
           }
           fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&format=json&titles=File:${spaceReplace}&iiprop=url&origin=*`)
           .then((response:any)=>response.json())
           .then((dataRes:any)=>{
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
    .catch((error:any) => console.log('error', error));
  },[])

    return (
      <div className={`divTeam ${!darkTheme ? 'divTeamDark' : ''}`}>
        {constructorData.image === '' ? <LoadingImg /> :
        <div className={`dataDivTeam ${!darkTheme ? 'dataDivTeamDark' : ''}`}>
          <div className='conImg'><img src={constructorData.image} alt='' className='logoConstructor'></img></div>
          <div className='conName'>Constructor Name:</div>
          <div className='resName'>{constructorData.constName}</div>
          <div className='conOwner'>Owner:</div>
          <div className='resOwner'>{constructorData.owner}</div>
          <div className='conBase'>Constructor Base: </div>
          <div className='resBase'>{constructorData.base}</div>
          <div className='conChassis'>Constructor Chassis: </div>
          <div className='resChassis'>{constructorData.chassis}</div>
          <div className='conChamp'>Constructor Champ: </div>
          <div className='resChamp'>{constructorData.constChamp}</div>
          <div className='conEngine'>Constructor Engine: </div>
          <div className='resEngine'>{constructorData.engine}</div>
        </div>}
      </div>
    )
}
