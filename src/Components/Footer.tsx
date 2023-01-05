import './Footer.css';
import useDarkTheme from './useDarkTheme';

export default function Footer(){
    const {darkTheme}=useDarkTheme()
    const date = new Date();
    let year = date.getFullYear();
    const an = year + " @eduardbede ";
    return(
            <footer className={`footer ${!darkTheme ? 'footerDark' : ''}`}>
                <div>{an}</div>
                <a href="https://github.com/eduardbede" target="_blank"  rel="noreferrer" className="underline">Visit GitHub</a>
              </footer>
    )
}