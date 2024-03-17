import PlaceForm from '../components/Places/PlaceForm';

function AddPlaces({ navigation }) {
  const createPlaceHandler = (place) => {
    navigation.navigate('AllPlaces', { place: place });
  };

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
export default AddPlaces;
