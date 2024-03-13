import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/AllPlaces';
import AddPlaces from './screens/AddPlaces';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
