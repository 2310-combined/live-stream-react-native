// import React, {useEffect, useState} from 'react';
// import {StyleSheet, View} from 'react-native';
// import MapView from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import firebase from '@react-native-firebase/app';
// import database from '@react-native-firebase/database';

// export default function LiveMap({ setTripCoordinates, setTimeStamps }) {
//   if (!firebase.apps.length) {
//     firebase.initializeApp();
//   }

//   const [region, setRegion] = useState(null);
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     Geolocation.requestAuthorization();

//     const watchId = Geolocation.watchPosition(
//       position => {
//         const {latitude, longitude, heading} = position.coords;
//         const timestamp = new Date(position.timestamp).toISOString();

//         setLocations(prevLocations => [
//           ...prevLocations,
//           {latitude, longitude, heading},
//         ]);

//         setRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0015,
//           longitudeDelta: 0.0015,
//         });

//         const locationRef = database().ref('locations');
//         locationRef.push({
//           latitude,
//           longitude,
//           timestamp,
//         });
//       },
//       error => console.log(error.message),
//       {
//         enableHighAccuracy: true,
//         distanceFilter: 10,
//         interval: 1000,
//         fastestInterval: 1000,
//       },
//     );

//     return () => {
//       Geolocation.clearWatch(watchId);
//     };
//   }, []);

//   return (
//     <View>
//       <MapView
//         style={styles.map}
//         region={region}
//         showsUserLocation={true}
//         followsUserLocation={true}
//       ></MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   map: {
//     width: '100%',
//     height: '100%',
//   },
// });
