import PlaceForm from '../components/Places/PlaceForm';
import { insertPlace } from '../utils/database';

function AddPlaces({ navigation }) {
  const createPlaceHandler = async (place) => {
    await insertPlace(place);
    navigation.navigate('AllPlaces', { place: place });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
export default AddPlaces;
