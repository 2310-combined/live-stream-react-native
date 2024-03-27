import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import database from '@react-native-firebase/database';

export default function LiveMap() {
  const [region, setRegion] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
      // Request location permission
      Geolocation.requestAuthorization();

      // Set up a watcher to capture the longitude and latitude every 10 seconds
      const watchId = Geolocation.watchPosition( position => {
          const {latitude, longitude, speed, heading, timestamp, altitude} = position.coords;

          // Update the locations array with the new location
          setLocations(prevLocations => [
            ...prevLocations,
            {latitude, longitude, speed, heading},
          ]);
          // Update the map region to the current location
          setRegion({
            latitude,
            longitude,

            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });

          const locationRef = database().ref('locations');
        locationRef.push({
          latitude,
          longitude,
          speed,
          heading,
          timestamp,
          altitude,
        });

        },
        error => console.log(error.message),
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 10000,
          fastestInterval: 5000,
        },
      );

    // Clean up the watcher when the component unmounts
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const logTrip = () => {
    console.log('Trip Locations:', locations);
  };

  // Log the trip every time the locations state changes
  // useEffect(() => {
  //   logTrip();
  // }, [locations]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true} // This prop shows the user's location with a blue dot
        followsUserLocation={true}
        // Optional: This prop makes the map follow the user's location
      ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  map: {
    width: 300,
    height: 300,
    borderColor: '#DDD',
    borderWidth: 1,
  },
});
