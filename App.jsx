import {SafeAreaView, StyleSheet, View} from 'react-native';
import LandingPage from './Screens/LandingPage';
import StreamingPage from './Screens/StreamingPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name='Home' component={LandingPage} />
          <Stack.Screen options={{headerTitle: ''}} name='StreamingPage' component={StreamingPage} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignContent: 'center',
    height: '100%',
  },
});
