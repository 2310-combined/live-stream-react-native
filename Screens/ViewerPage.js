import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { LiveStream } from '../Components/LiveStream';

const ViewerPage = ({
  setIsHost,
  isHost,
  isJoined,
  setIsJoined,
  sendDataToBackend
}) => {
  const [streamerLocation, setStreamerLocation] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp();
  }

  useEffect(() => {
    const fetchLastLocation = () => {
      database()
        .ref('locations')
        .orderByChild('timestamp')
        .limitToLast(1)
        .once('value')
        .then(snapshot => {
          const newLocations = snapshot.val();
          if (newLocations) {
            const lastLocation = Object.values(newLocations)[0];
            setStreamerLocation(lastLocation);
          }
        });
    };

    fetchLastLocation();

    const intervalId = setInterval(fetchLastLocation, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      {streamerLocation && (
        <MapView
          style={styles.map}
          region={{
            latitude: streamerLocation.latitude,
            longitude: streamerLocation.longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}>
          <Marker
            coordinate={{
              latitude: streamerLocation.latitude,
              longitude: streamerLocation.longitude,
            }}
            title={"Streamer's Location"}
            description={'This is the location of the streamer'}
          >
            <Image
              source={require('../assets/marker.png')}
              style={styles.markerImage}
            />
          </Marker>
        </MapView>
      )}
      <LiveStream
        sendDataToBackend={sendDataToBackend}
        setIsHost={setIsHost}
        setIsJoined={setIsJoined}
        isHost={isHost}
        isJoined={isJoined}
      />
    </View>
  );
}

export default ViewerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '50%',
  },
  markerImage: {
    height: 100,
    width: 100,
  }
});
