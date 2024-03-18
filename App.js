import { useEffect, useState,useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import Map from './screens/Map';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import { init } from './utils/database';
import * as SplashScreen from 'expo-splash-screen';
import PlaceDetails from './screens/PlaceDetails';

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  // This is the db initializing for the first time
  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        init();
      } catch (e) {
        console.warn(e);
      } finally {
        setDbInitialized(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) return null;

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer  onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}>
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            // Can access the navigation from turning options in to a function and returning an object
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  size={24}
                  color={tintColor}
                  icon='add'
                  onPress={() => navigation.navigate('AddPlaces')}
                />
              )
            })}
          />
          <Stack.Screen
            name='AddPlaces'
            component={AddPlaces}
            options={{
              title: 'Add A New Place',
              headerBackTitle: 'Back' //if not set and there is space the previous screen will show as headerBackTitle
            }}
          />
          <Stack.Screen
            name='Map'
            component={Map}
            options={{
              title: 'Map'
            }}
          />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{
            title:'Loading Place.....'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
