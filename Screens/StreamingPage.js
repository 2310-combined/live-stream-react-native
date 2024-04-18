import {View, Text, StyleSheet} from 'react-native';
import {LiveStream} from '../Components/LiveStream';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';

const StreamingPage = ({
  setIsHost,
  isHost,
  isJoined,
  setIsJoined,
  setTimestamps,
  setTripCoordinates,
  sendDataToBackend
}) => {

  if (!firebase.apps.length) {
    firebase.initializeApp();
  }

  const [region, setRegion] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    Geolocation.requestAuthorization();

    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude, heading} = position.coords;
        const timestamp = new Date(position.timestamp).toISOString();

        setLocations(prevLocations => [
          ...prevLocations,
          {latitude, longitude, heading},
        ]);

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0015,
          longitudeDelta: 0.0015,
        });

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

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        followsUserLocation={true}
      ></MapView>
      <LiveStream
        sendDataToBackend={sendDataToBackend}
        setIsHost={setIsHost}
        setIsJoined={setIsJoined}
        isHost={isHost}
        isJoined={isJoined}
        />
    </View>
  );
};

export default StreamingPage;

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
