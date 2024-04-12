import {SafeAreaView, StyleSheet, View} from 'react-native';
import LandingPage from './Screens/LandingPage';
import StreamingPage from './Screens/StreamingPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [tripCoordinates, setTripCoordinates] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  const getStartTime = () => {
    const date = new Date(timestamps[0]);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getStartLocation = () => {
    return tripCoordinates[0];
  };

  const getEndLocation = () => {
    return tripCoordinates[tripCoordinates.length - 1];
  };

  const getTripDuration = () => {
    const startTime = new Date(timestamps[0]);
    const endTime = new Date(timestamps[timestamps.length - 1]);

    const duration = (endTime - startTime) / 1000;

    return duration;
  };

  const backendData = () => {
    return {
      start_location: getStartLocation(),
      end_location: getEndLocation(),
      time_of_trip: getStartTime(),
      trip_duration: getTripDuration(),
    };
  };

  const sendDataToBackend = () => {
    // implement post functionality once BE is running on Heroku
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          children={() => (
            <LandingPage setIsHost={setIsHost} setIsJoined={setIsJoined} />
          )}
        />
        <Stack.Screen
          options={{headerTitle: '', headerShown: false}}
          name="StreamingPage"
          children={() => (
            <StreamingPage
              setTimestamps={setTimestamps}
              setTimestamps={setTimestamps}
              setIsHost={setIsHost}
              setIsJoined={setIsJoined}
              isHost={isHost}
              isJoined={isJoined}
              sendDataToBackend={sendDataToBackend}
            />
          )}
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
