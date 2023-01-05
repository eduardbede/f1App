import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import useYears from './useYears';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './SelectYears.css';
import useDarkTheme from './useDarkTheme';

export default function SelectYears() {
  const {darkTheme} = useDarkTheme();
  const [allSeason, setAllSeason] = useState<string[]>([]);
  const {age, setAge} = useYears();
  const handleChange = (event: SelectChangeEvent<string>) => {
    setAge?.(event.target.value as string);
  };
    
      useEffect(()=>{
          fetch("http://ergast.com/api/f1/seasons.json?limit=1000")
            .then(response => response.json())
            .then(result => {
                const totalSeasons = result.MRData.SeasonTable.Seasons.map((el: { season: string; })=>{
                    return el.season 
                })
                setAllSeason(totalSeasons.reverse());
            })
            .catch(error => console.log('error', error));
      },[])
      
      
      const allMenu = allSeason.map((el:string)=>{
        return <MenuItem key={el} value={el}>{el}</MenuItem>
      })

      const style = ({
        color:`${!darkTheme ? '#fff':''}`,

        '& .MuiSvgIcon-root': {
          color: `${!darkTheme ? 'white' : 'black'}`,
        },

        "&:hover": {
          "&& fieldset": {
            border: `${!darkTheme ? '1px solid white' : '"1px solid black"'}`
          }
      },

        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "gray"
        },
     
      });
      
   
   
      return (
      <div className={`formSelect ${!darkTheme ? 'darkTheme textColorDark' : ''}`}>
          <FormControl size='medium' sx={{height: 40}} className={`${!darkTheme ? 'textColorDark' : ''}`} >
              <InputLabel id="demo-simple-select-label" 
                          sx={style}
                         
              >Season</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Season"
                onChange={handleChange}
                MenuProps={{ PaperProps: { sx: { maxHeight: 300 }}}}
                sx={style}
                
              >
              {allMenu}
              </Select>
            </FormControl>
        </div>
      );
    }
