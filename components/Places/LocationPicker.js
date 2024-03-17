/* 


  For configuring google maps api
  https://developers.google.com/maps/documentation/maps-static/overview
  https://console.cloud.google.com/google/maps-apis/home?project=fav-spots-maps
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, Image } from 'react-native';
import OutlineButton from '../UI/OutlineButton';
import { Colors } from '../../constants/colors';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus
} from 'expo-location';
import {
  useNavigation,
  useRoute,
  useIsFocused
} from '@react-navigation/native';
import { getMapPreview } from '../../utils/locations';

const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState();
  /* Bool, need isFocused for when on the Map screen and making an update 
     and being navigated to the AddPlaces screen which is not recreated in stack, 
     it was pushed on with the initial UI with the new update.
     - isFocused will get set in this non screen component
     - LocationPicker being a child in the AddPlaces will get set to true, if it's true the useEffect will have a changed dependency and update the screen

  */
  const isFocused = useIsFocused(); //bool
  const route = useRoute();
  const navigation = useNavigation();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      //   Waiting for the users response to grant permissions to use the camera device
      permissionResponse.granted; //bool
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      // The user did not grant permissions and is still trying to use the app
      Alert.alert(
        'Insufficient Permission!',
        'You need to grant the location permissions to use the app '
      );
      return false;
    }
    // Neither if checks apply and we already have permissions just returning true
    return true;
  };

  useEffect(() => {
    // This WORK-AROUND check makes sure the screen updates the picked location when navigated to
    if (isFocused && route.params) {
      // Picked lat coming from the state passed values from Map.js screen
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  let locationPreview = <Text>No Location Picked yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlineButton onPress={getLocationHandler} icon='location'>
          Locate User
        </OutlineButton>
        <OutlineButton onPress={pickOnMapHandler} icon='map'>
          Pick on map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;
const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
});
