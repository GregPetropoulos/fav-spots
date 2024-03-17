import { useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';

import PlacesList from '../components/Places/PlacesList';

function AllPlaces({route}) {
const [loadedPlaces, setLoadedPlaces]= useState([])
  const isFocused = useIsFocused();

  // Need this side effect to update the page when ever a form is submitted
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces(prev => [...prev, route.params.place])
    }
  }, [route, isFocused]);



  return <PlacesList places={loadedPlaces} />;
}
export default AllPlaces;
