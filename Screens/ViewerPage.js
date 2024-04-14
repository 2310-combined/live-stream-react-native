import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

function ViewerPage({tripCoordinates}) {
  const [streamerLocation, setStreamerLocation] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp();
  }

  //logs the streamer's location
  useEffect(() => {
    streamerLocation && console.log(streamerLocation);
  }, [streamerLocation]);

  useEffect(() => {
    const onValueChange = database()
      .ref('locations')
      .on('value', snapshot => {
        const newLocations = snapshot.val();

        if (newLocations) {
          const locationsArray = Object.values(newLocations);
          const lastLocation = locationsArray[locationsArray.length - 1];
          setStreamerLocation(lastLocation);
        }
      });

    // Cleanup function
    return () => {
      database().ref('locations').off('value', onValueChange);
    };
  }, [streamerLocation]);

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
