import { useWindowSize, useOnClickOutside } from 'usehooks-ts'
import logo from '../img/F1_logo.svg.png'
import './Navbar.css'
import ListDesktop from './ListDesktop'
import ListMobile from './ListMobile'
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'


export const Navbar = () => {
    const { width } = useWindowSize();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const btnRefClose = useRef<any>();

    const handleClickOutside = () => {
      setTimeout(() => {
        setMenuOpen(false);
      }, 200);
    };
    
    useOnClickOutside(btnRefClose, handleClickOutside);

    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      if(scrollPosition !== position){
        setMenuOpen(false);
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <nav className='navClass'>
        <Link to='/' className='logoImgLink' >
            <motion.img src={logo} 
                        className="logoImg" alt={logo}
                        initial={{opacity:0}}  
                        animate={{opacity:1}} 
                        transition={{duration: 0.8}}>
            </motion.img>
          </Link> 
         {width > 768 ? <ListDesktop /> :
            <motion.div className='menuMobile'
                        initial={!menuOpen ? {x:'100%'} : {x:0}} 
                        animate={!menuOpen ? {x:'100%'} : {x:0}} 
                        transition={{duration: 0.5}} 
                        exit={{ x: 200 }}>
                <ListMobile />
            </motion.div>}
        {width < 768 && <div ref={btnRefClose} className='hamburgerMenu'><GiHamburgerMenu onClick={()=>setMenuOpen(prevMenu=>!prevMenu)} className='hamburgerMenu'/></div> }
    </nav>
  )
}
