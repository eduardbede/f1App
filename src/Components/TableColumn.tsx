import DataTable, { ExpanderComponentProps, createTheme } from 'react-data-table-component'
import {getCode} from 'country-list'
import Flag from 'react-world-flags'
import { Link } from 'react-router-dom'
import './TableColumn.css'
import useYears from './useYears'
import useDarkTheme from './useDarkTheme'

interface Props{ 
    dataRace:string[];
}

interface RaceType {
    countryFlag: string;
    grandPrix: string;
    circuitName: string;
    raceDay: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    results: string
    raceHours:RaceHours
}

interface RaceHours{
    practiceOne: DateTimeRace;
    practiceTow: DateTimeRace;
    practiceSprint: {name:string, practice:DateTimeRace};
    qualifying: DateTimeRace;
    race:DateTimeRace
}

interface DateTimeRace{
    date:string
    time:string
}

export default function TableColumn({dataRace}: Props) {
    const {darkTheme} = useDarkTheme()
    const {age} = useYears()

    function getNameCountry(el:string){
        if(el === "Russia"){
            return "ru"
        }else if(el === 'UAE'){
            return 'sa'
        }else if(el==="USA"){
            return 'us'
        }else if(el==="UK"){
            return 'gb'
        }else if(el==="Turkey"){
            return 'tr'
        }else if(el==="Korea"){
            return 'kr'
        }else if(el==='United States'){
            return 'us'
        }else{
            return getCode(el)
        }
    }


    function formatDay(day:string | undefined){
        if(day === undefined) return
        let d = new Date(day)
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return da
    }

    function formatMonth(month:string | undefined):string | undefined{
        if(month === undefined) return
        let d = new Date(month)
        let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        return mo
    }
    
    function formatDayMonth(dayMonth:string){
        if(dayMonth === undefined) return
        const time =  new Date(dayMonth).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
        return time
            
    }

    function formatTime(time:string){
        if(time === undefined) return
        let timp = new Date(time).toLocaleTimeString()
        if(timp === 'Invalid Date'){
            return ''
        }else{
            return timp
        }
    }

   const data:any = dataRace.map((el:any)=>{
    return {
        countryFlag:<div className='flagDiv' >
                        <Flag code={getNameCountry(el.Circuit.Location.country)} 
                              height={30} width={40} className='flagComponent'/>
                    </div>,
        grandPrix:el.raceName,
        circuitName: el.Circuit.circuitName,
        raceDay: <div className={`raceDayDiv ${!darkTheme ? 'darkRaceTheme' : ''}`}>
                    <div>{formatDay(el.date)}</div>
                    <div>{formatMonth(el.date)}</div>
                 </div>,
        results: <Link to={`/results/${age}/${el.round}`} ><div className='resultsLink'>Results</div></Link>,
        raceHours:{
            practiceOne:el.FirstPractice,
            practiceTow:el.SecondPractice,
            practiceSprint: el.ThirdPractice === undefined ? 
                {name: "Sprint", practice:el.Sprint} : 
                {name: "Third Practice", practice:el.ThirdPractice},
            qualifying: el.Qualifying,
            race:{time:el.time, date:el.date}
        }
        
    }
   })


    const columns = [
        {
            name: 'Grand Prix',
            selector: (row:any) => <div className='flagRaceName'>
                                       <div>{row.countryFlag}</div>
                                       <div>
                                            <div className='raceName grandPrixName'>{row.grandPrix}</div>
                                            <div className='raceName circuitName'>{row.circuitName}</div>
                                       </div>
                                    </div>,
            minWidth: '350px',
            center: false,
        },
        {
            name: '',
            selector: (row:any) => row.results,
            minWidth: '100px',
            center: true,
        },
        {
            name: 'Date',
            selector: (row:any) => row.raceDay,
            minWidth: '20px',
            center: true,
        },
    ];

    const ExpandedComponent: React.FC<ExpanderComponentProps<RaceType>> = ({ data }) => {
        return <div >
                    {data.raceHours.practiceOne !== undefined && 
                        <div className='expandableColumn'>
                            <div className='practiceNameDiv'>First Practice</div>
                            <div className='practiceDayDiv'>{formatDayMonth(data?.raceHours?.practiceOne?.date)}</div>
                            <div className='practiceHourDiv'>{formatTime(data?.raceHours?.practiceOne?.date +'T'+data.raceHours?.practiceOne?.time)}</div>
                        </div>} 
                    {data.raceHours.practiceTow !== undefined && 
                        <div className='expandableColumn'>
                            <div className='practiceNameDiv'>Second Practice</div>
                            <div className='practiceDayDiv'>{formatDayMonth(data.raceHours?.practiceTow?.date)}</div>
                            <div className='practiceHourDiv'>{formatTime(data.raceHours?.practiceTow?.date +'T'+data.raceHours?.practiceTow?.time)}</div>
                        </div>} 
                   {data.raceHours.practiceSprint?.practice !== undefined ? 
                    <div className='expandableColumn'>
                        <div className='practiceNameDiv'>{data.raceHours.practiceSprint.name}</div>
                        <div className='practiceDayDiv'>{formatDayMonth(data.raceHours.practiceSprint?.practice.date)}</div>
                        <div className='practiceHourDiv'>{formatTime(data.raceHours.practiceSprint?.practice.date +'T'+data.raceHours.practiceSprint?.practice.time)}</div>
                    </div>:<div></div>}
                    {data.raceHours.qualifying !== undefined ? 
                    <div className='expandableColumn'>
                        <div className='practiceNameDiv'>Qualifying</div>
                        <div className='practiceDayDiv'>{formatDayMonth(data.raceHours.qualifying?.date)}</div>
                        <div className='practiceHourDiv'>{formatTime(data.raceHours.qualifying?.date +'T'+data.raceHours.qualifying?.time)}</div>
                    </div>:<div></div>}
                    {data.raceHours.race.date !== undefined ? 
                    <div className='expandableColumn'>
                        <div className='practiceNameDiv'>Race</div>
                        <div className='practiceDayDiv'>{formatDayMonth(data.raceHours.race?.date)}</div>
                        <div className='practiceHourDiv'>{formatTime(data.raceHours.race?.date +'T'+data.raceHours.race?.time)}</div>
                    </div>:<div></div>}
                 </div>
    };

    const customStyles = {
        head: {
            style: {
                fontSize: '20px',
                fontWeight: 500,
                fontFamily:'Roboto'
            },
        },
        background: {
            default: 'red',
          },
        rows: {
            style: {
                minHeight: '72px', // override the row height
                fontSize: '18px',
			    fontWeight: 500,
                fontFamily:'Roboto'
            },
        }
      };

    const tableDark =  createTheme('darkTheme', {
        text: {
          primary: '#A2EAB6',
          secondary: '#2aa198',
        },
        background: {
          default: '#121212',
        },
        context: {
          background: '#cb4b16',
          text: '#FFFFFF',
        },
        divider: {
          default: '#073642',
        },
        action: {
          button: 'rgba(0,0,0,.54)',
          hover: 'rgba(0,0,0,.08)',
          disabled: 'rgba(0,0,0,.12)',
        },
      }, 'dark');

    
    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                customStyles={customStyles}
                theme={!darkTheme ? 'darkTheme' : ''}
            />
        </>
    );
  
}
