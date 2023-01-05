import { useContext } from 'react';
import { YearsSelectContext } from '../App';

export default function useYears() {
    const contextData = useContext(YearsSelectContext);
    const age = contextData?.age;
    const setAge = contextData?.setAge;
    return{age, setAge};
}
