import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

function ViewerPage() {
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
          />
        </MapView>
      )}
      <View>
        <Text>This is where the stream will go</Text>
      </View>
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
});
