import { useLocation } from 'react-router-dom';
import LoadingImg from './LoadingImg';
import './Driver.css';
import useDarkTheme from './useDarkTheme';
import useDriverFetch from './fetchHooks/useDriverFetch';

export default function Driver() {
  const {darkTheme}=useDarkTheme();
  const location = useLocation();
  const {driverWiki} = useDriverFetch(location);

  const centredDriverDivDark = !darkTheme ? 'centredDriverDivDark' : '';
  const driverCardDark = !darkTheme ? 'driverCardDark' : '';

  return (
    <div className={`centredDriverDiv ${centredDriverDivDark}`}>
      {driverWiki.image === '' ?  <LoadingImg /> : 
      <div className={`driverCard ${driverCardDark}`}>
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
