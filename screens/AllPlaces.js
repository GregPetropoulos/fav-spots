import { useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../utils/database';
import PlacesList from '../components/Places/PlacesList';

function AllPlaces() {

const [loadedPlaces, setLoadedPlaces]= useState([])
  const isFocused = useIsFocused();

  // Need this side effect to update the page when ever a form is submitted and toi load data from the db for the first time
  useEffect(() => {

    const loadPlaces = async ()=>{
      const places  = await fetchPlaces()
      setLoadedPlaces(places)
    }

    if (isFocused) {
      // setLoadedPlaces(prev => [...prev, route.params.place])
      loadPlaces()
    }
  }, [isFocused]);



  return <PlacesList places={loadedPlaces} />;
}
export default AllPlaces;
