import './LoadingImg.css';
import Loading from '../img/loadingGif.gif';
import useDarkTheme from './useDarkTheme';

export default function LoadingImg() {
  const {darkTheme} = useDarkTheme();
  const paragraphLoadingDark = !darkTheme ? 'paragraphLoadingDark' : '';
  return (
    <div className='loadingWait'>
        <img src={Loading} alt='' className='loadingImg'></img>
        <p className={`${paragraphLoadingDark}`}>Loading...</p>
    </div>
  )
}
