import { useParams } from "react-router-dom"
import './Teams.css'
import LoadingImg from './LoadingImg';
import useDarkTheme from './useDarkTheme';
import useTeams from './fetchHooks/useTeams';

export default function Teams(){
  const {darkTheme}=useDarkTheme();
  const params = useParams<string>();
  const {constructorData} = useTeams(params)
  
  const divTeamDark = !darkTheme ? 'divTeamDark' : '';
  const dataDivTeamDark = !darkTheme ? 'dataDivTeamDark' : '';
  
    return (
      <div className={`divTeam ${divTeamDark}`}>
        {constructorData.image === '' ? <LoadingImg /> :
        <div className={`dataDivTeam ${dataDivTeamDark}`}>
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
