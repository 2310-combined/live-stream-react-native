import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';



export default function LiveMap() {
  
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
        const {latitude, longitude, speed, heading, timestamp, altitude} =
        position.coords;
        
        // Update the locations array with the new location
        setLocations(prevLocations => [
          ...prevLocations,
          {latitude, longitude, speed, heading},
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
      
       // Set up a listener for real-time changes to the 'locations' node
       const onValueChange = database()
       .ref('locations')
       .on('value', snapshot => {
          const newLocations = snapshot.val();
          // console.log(newLocations);

          if (newLocations) {
      
          // Convert the object to an array of its values
          const locationsArray = Object.values(newLocations);
      
          // Get the last location object from the array
          const lastLocation = locationsArray[locationsArray.length - 1];
      
          // Update the region state with the latitude and longitude of the last location
          setRegion({
            latitude: lastLocation.latitude,
            longitude: lastLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          }
      });

    // Clean up the watcher and listener when the component unmounts
    return () => {
      Geolocation.clearWatch(watchId);
      database().ref('locations').off('value', onValueChange);
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
