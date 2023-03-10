import SelectYears from "./SelectYears";
import RaceTable from './RaceTable';
import './Races.css';
import useYears from "./useYears";
import useDarkTheme from "./useDarkTheme";

export default function Races() {
  const {darkTheme} = useDarkTheme();
  const {age} = useYears();
  const darkColor = !darkTheme ? 'darkTheme textColor' : '';

  return (
    <>
      <SelectYears  />
        <div className={`raceScheduleDiv ${darkColor}`}>
          <div>{age} Race Schedule</div>
        </div>
      <RaceTable />
    </>
  )
}
