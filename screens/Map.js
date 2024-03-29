import React, { useLayoutEffect, useState, useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../constants/colors';
import IconButton from '../components/UI/IconButton';
// https://github.com/react-native-maps/react-native-maps
// This component has the screen prop navigation since it's registered as screen
const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  //   Set the marker to a location on the map in the LocationPicker

  const selectLocationHandler = (event) => {
    // This makes read only when the Map component is rendered for a marked location in place details
    if (initialLocation) {
      return;
    }
    // Event sent from the MapView package
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  };

  /*
  The useLayoutEffect calls this function and it's dependency and it's necessary to wrap in a useCallback so its not a recreated function unless the navigation or selectedLocation state change. Helps control the useLayoutEffect from causing infinite loop
  */

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No Location Picked',
        'You have to pick a location (by tapping on the map) first'
      );
      return;
    }
    navigation.navigate('AddPlaces', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng
    });
  }, [navigation, selectedLocation]);
  /* 
    UseLayoutEffect allows to run code to add header button and execute saving the selected marker location
    This needs to render the data when the component is mounted not after.
    I want to add the header button for when a location is saved 
*/

  useLayoutEffect(() => {
    // Need this to handle showing a save icon only on when marking a location and not when viewing the place details
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      )
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
const styles = StyleSheet.create({
  map: { flex: 1 },
  marker: {
    color: Colors.primary200
  }
});
