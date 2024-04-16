import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

function ViewerPage({tripCoordinates}) {
  const [streamerLocation, setStreamerLocation] = useState(null);

  if (!firebase.apps.length) {
    firebase.initializeApp();
  }

  //logs the streamer's location
  // useEffect(() => {
  //   streamerLocation && console.log(streamerLocation);
  // }, [streamerLocation]);

  useEffect(() => {
    // const onValueChange = database()
    //   .ref('locations')
    //   .on('value', snapshot => {
    //     const newLocations = snapshot.val();

    //     if (newLocations) {
    //       const locationsArray = Object.values(newLocations);
    //       const lastLocation = locationsArray[locationsArray.length - 1];
    //       setStreamerLocation(lastLocation);
    //     }
    //   });

    // // Cleanup function
    // return () => {
    //   database().ref('locations').off('value', onValueChange);
    // };

    const fetchLastLocation = () => {
      database()
         .ref('locations')
         .orderByChild('timestamp')
         .limitToLast(1)
         .once('value')
         .then(snapshot => {
           const newLocations = snapshot.val();
           if (newLocations) {
             // Since limitToLast(1) returns an object, we need to extract the value
             const lastLocation = Object.values(newLocations)[0];
             setStreamerLocation(lastLocation);
           }
         });
     };
     

    // Fetch the last location immediately
    fetchLastLocation();

    // Set an interval to fetch the last location every 5 seconds (or any desired interval)
    const intervalId = setInterval(fetchLastLocation, 1000);

    // Cleanup function to clear the interval when the component unmounts
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
  markerImage: {
    height: 100,
    width: 100,
  }
});
