import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import IconButton from './components/UI/IconButton';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            // Can access the navigation from turning options in to a function and returning an object
            options={({navigation})=>({
              headerRight: ({ tintColor }) => (
                <IconButton size={24} color={tintColor} icon='add' onPress={()=>navigation.navigate('AddPlaces')}/>
              )
            })}
          />
          <Stack.Screen name='AddPlaces' component={AddPlaces} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
