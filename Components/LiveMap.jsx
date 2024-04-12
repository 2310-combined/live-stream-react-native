import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function LiveMap(tripCoordinates, setTimestamps) {
  if (!firebase.apps.length) {
    firebase.initializeApp();
  }

  const [region, setRegion] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Request location permission
    Geolocation.requestAuthorization();

    // Set up a watcher to capture the longitude and latitude every 10 seconds
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude, heading} = position.coords;
        const timestamp = new Date(position.timestamp).toISOString();

        // Update the locations array with the new location
        setLocations(prevLocations => [
          ...prevLocations,
          {latitude, longitude, heading},
        ]);
        // Update the map region to the current location
        // setRegion({
        //   latitude,
        //   longitude,

        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // });

        const locationRef = database().ref('locations');
        locationRef.push({
          latitude,
          longitude,
          timestamp,
        });
      },
      error => console.log(error.message),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 1000,
        fastestInterval: 1000,
      },
    );

    // Set up a listener for real-time changes to the 'locations' node
    const onValueChange = database()
      .ref('locations')
      .on('value', snapshot => {
        const newLocations = snapshot.val();

        if (newLocations) {
          const locationValues = Object.values(newLocations);
          const locationsArray = locationValues.map(location => [
            location.latitude,
            location.longitude,
          ]);
          const timestamps = locationValues.map(location => location.timestamp);
          setTripCoordinates(locationsArray);
          setTimestamps(timestamps);
        }

        if (newLocations) {
          // Convert the object to an array of its values
          const locationsArray = Object.values(newLocations);

          // Get the last location object from the array
          const lastLocation = locationsArray[locationsArray.length - 1];

          // Update the region state with the latitude and longitude of the last location
          setRegion({
            latitude: lastLocation.latitude,
            longitude: lastLocation.longitude,
            latitudeDelta: 0.0015,
            longitudeDelta: 0.0015,
          });
        }
      });

    // Clean up the watcher and listener when the component unmounts
    return () => {
      Geolocation.clearWatch(watchId);
      database().ref('locations').off('value', onValueChange);
    };
  }, []);

  return (
    <View>
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
  map: {
    width: '100%',
    height: '100%',
  },
});
