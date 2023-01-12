import { TwitterTimelineEmbed } from "react-twitter-embed";
import { useState } from "react";
import './News.css';
import LoadingImg from "./LoadingImg";
import useDarkTheme from "./useDarkTheme";

export default function News(){
  const {darkTheme} = useDarkTheme()
  const [emptyView, setEmptyView] = useState<boolean>(true);
  const newsDivDark =  !darkTheme ? 'newsDivDark' : '';
  
    return (
      <div className={`newsDiv ${newsDivDark}`}>
        {emptyView && <LoadingImg />}
        {<TwitterTimelineEmbed sourceType="profile" screenName="f1" options={{width:`90vw`}} theme={`${!darkTheme ? "dark" : 'light'}`}  onLoad={()=>setEmptyView(false)} /> }
      </div>
    )
}
