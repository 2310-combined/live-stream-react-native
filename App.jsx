import {SafeAreaView, StyleSheet, View} from 'react-native';
import LandingPage from './Screens/LandingPage';
import StreamingPage from './Screens/StreamingPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';

const Stack = createNativeStackNavigator();


export default function App() {
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(false); // Client role

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          children={() => <LandingPage setIsHost={setIsHost} setIsJoined={setIsJoined} />}
        />
        <Stack.Screen
          options={{headerTitle: '', headerShown: false}}
          name="StreamingPage"
          children={() => <StreamingPage setIsHost={setIsHost} setIsJoined={setIsJoined} isHost={isHost} isJoined={isJoined} />}
        />
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
