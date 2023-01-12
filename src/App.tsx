import { useState, createContext } from 'react'
import { Routes, Route } from "react-router-dom";
import { Navbar } from './Components/Navbar';
import HomeComponent from "./Components/HomeComponent";
import Races from "./Components/Races";
import Standings from "./Components/Standings";
import Drivers from "./Components/Drivers";
import Driver from './Components/Driver';
import Teams from "./Components/Teams";
import News from "./Components/News";
import RaceResults from "./Components/RaceResults";
import AllTeams from './Components/AllTeams';
import Footer from './Components/Footer';

interface Context{
    age:string;
    setAge:React.Dispatch<React.SetStateAction<string>>;
}

interface DarkContext{
  darkTheme:boolean;
  darkLightToggle:()=>void;
}

interface AllYearsContextAPI{
  allSeason:string[];
  setAllSeason:React.Dispatch<React.SetStateAction<string[]>>;
}

export const YearsSelectContext = createContext<Context | null | undefined>(null);
export const DarkThemeContext = createContext<DarkContext | null>(null);
export const AllYearsContext = createContext<AllYearsContextAPI | null>(null);

function App() {
  const [age, setAge] = useState<string>(sessionStorage.getItem('age') ||  /* (new Date().getFullYear()).toString() */ '2022');
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [allSeason, setAllSeason] = useState<string[]>([]);

    if(age !== sessionStorage.getItem("age")){
      sessionStorage.setItem("age", age);
    };

  function darkLightToggle(){
    setDarkTheme((prevDark: boolean) => !prevDark );
  };

  return (
    <>
      <DarkThemeContext.Provider value={{darkTheme, darkLightToggle}}>
        <Navbar />
          <AllYearsContext.Provider value={{allSeason, setAllSeason}}>
            <YearsSelectContext.Provider value={{age, setAge}}>
                  <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/races" element={<Races />} />
                    <Route path="/standings" element={<Standings />} />
                    <Route path="/drivers" element={<Drivers />} />
                    <Route path="/teams/:constructorId" element={<Teams />} />
                    <Route path="/teams/" element={<AllTeams />}/>
                    <Route path="/news" element={<News />} />
                    <Route path={`/results/${age}/:id`} element={<RaceResults />} />
                    <Route path="/drivers/:driverId" element={<Driver />} />
                  </Routes>
            </YearsSelectContext.Provider>
          </AllYearsContext.Provider>
        <Footer />
      </DarkThemeContext.Provider>
    </>
  );
}

export default App;
