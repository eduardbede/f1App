
import TableColumn from './TableColumn';
import LoadingImg from './LoadingImg';
import './RaceTable.css'
import useYears from './useYears';
import useDarkTheme from './useDarkTheme';
import useRaceTableFetch from './fetchHooks/useRaceTableFetch';



export default function RaceTable() {
  const {darkTheme} = useDarkTheme();
  const { age } = useYears();
  const { dataRace } = useRaceTableFetch(age);
  
    const darkColor = !darkTheme ? 'darkTheme' : '';

      return (
        <>
        {dataRace.length === 0 ? <div className={`loadingDivRace ${darkColor}`}><LoadingImg /></div>:
          <div className={`tableDiv ${darkColor}`} >
              <TableColumn dataRace={dataRace} />
          </div>
        }
        </>
      );
}