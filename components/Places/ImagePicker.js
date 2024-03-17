import { useState } from 'react';
import { Alert, Button, View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus
} from 'expo-image-picker';
const ImagePicker = ({ onTakeImage }) => {
  const [pickedImage, setPickedImage] = useState(null);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions(); //Need this because ios permissions, android automatically asks for permissions

  // because of ios need to verify permissions, this is a promise based and returns a bool for permissions
  const verifyPermissions = async () => {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      //   Waiting for the users response to grant permissions to use the camera device
      permissionResponse.granted; //bool
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      // The user did not grant permissions and is still trying to use the app
      Alert.alert(
        'Insufficient Permission!',
        'You need to grant the camera permissions to use the app '
      );
      return false;
    }
    // Neither if checks apply and we already have permissions just returning true
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri); //needed for this components internal UI
      onTakeImage(image.assets[0].uri); //passing it back to the parent form component
    }
  };
  let imagePreview = <Text>No Image Taken yet</Text>;
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon='camera' onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
};

export default ImagePicker;
const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  image: { width: '100%', height: '100%', borderRadius: 4 }
});
