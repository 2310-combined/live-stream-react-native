
// import React, { useState } from 'react';
// import AgoraUIKit from 'agora-rn-uikit';
// import { Text, View } from 'react-native';

// const App = () => {
//   const [videoCall, setVideoCall] = useState(false);
//   const connectionData = {
//     appId: '8a73ac85930045bb87043fece3155ff4', // Replace with your Agora App ID
//     channel: 'test',
//     token: '007eJxTYJhzNtYouqOv/siEH3rvfWfmKqu3rdvhX+ti0h/S0sTc80yBwSLR3Dgx2cLU0tjAwMQ0KcnC3MDEOC01OdXY0NQ0Lc0k7hpDWkMgI0NXxjtmRgYIBPFZGEpSi0sYGAA9sR86', // Enter your channel token as a string if you have one
//   };

//   const callbacks = {
//     EndCall: () => {
//       setVideoCall(false);
//     },
//   };

//   return videoCall ? (
//     <AgoraUIKit
//       connectionData={connectionData}
//       callbacks={callbacks}
//     />
//   ) : (
//     <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
//     <Text onPress={() => setVideoCall(true)}>Join</Text>
//     </View>
//   );
// };

// export default App;


// import React, {useRef, useState, useEffect} from 'react';
// import {
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
//     Switch,
// } from 'react-native';
// import {PermissionsAndroid, Platform} from 'react-native';
// import {
//     ClientRoleType,
//     createAgoraRtcEngine,
//     IRtcEngine,
//     RtcSurfaceView,
//     ChannelProfileType,
// } from 'react-native-agora';



// const appId = '8a73ac85930045bb87043fece3155ff4';
// const channelName = 'test';
// const token = '007eJxTYJhzNtYouqOv/siEH3rvfWfmKqu3rdvhX+ti0h/S0sTc80yBwSLR3Dgx2cLU0tjAwMQ0KcnC3MDEOC01OdXY0NQ0Lc0k7hpDWkMgI0NXxjtmRgYIBPFZGEpSi0sYGAA9sR86';
// const uid = 0;

// const App = () => {
//     const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
//     const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
//     const [isHost, setIsHost] = useState(true); // Client role
//     const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
//     const [message, setMessage] = useState(''); // Message to the user

//     useEffect(() => {
//         // Initialize Agora engine when the app starts
//         setupVideoSDKEngine();
//      });
     
//      const setupVideoSDKEngine = async () => {
//         try {
//         // use the helper function to get permissions
//         if (Platform.OS === 'android') { await getPermission()};
//         agoraEngineRef.current = createAgoraRtcEngine();
//         const agoraEngine = agoraEngineRef.current;
//         agoraEngine.registerEventHandler({
//             onJoinChannelSuccess: () => {
//                 showMessage('Successfully joined the channel ' + channelName);
//                 setIsJoined(true);
//             },
//             onUserJoined: (_connection, Uid) => {
//                 showMessage('Remote user joined with uid ' + Uid);
//                 setRemoteUid(Uid);
//             },
//             onUserOffline: (_connection, Uid) => {
//                 showMessage('Remote user left the channel. uid: ' + Uid);
//                 setRemoteUid(0);
//             },
//         });
//         agoraEngine.initialize({
//             appId: appId,
//             channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
//         });
//         agoraEngine.enableVideo();
//         } catch (e) {
//             console.log(e);
//         }
//      };
//      const join = async () => {
//         if (isJoined) {
//             return;
//         }
//         try {
//             agoraEngineRef.current?.setChannelProfile(
//                 ChannelProfileType.ChannelProfileLiveBroadcasting,
//             );
//             if (isHost) {
//                 agoraEngineRef.current?.startPreview();
//                 agoraEngineRef.current?.joinChannel(token, channelName, uid, {
//                     clientRoleType: ClientRoleType.ClientRoleBroadcaster});
//             } else {
//                 agoraEngineRef.current?.joinChannel(token, channelName, uid, {
//                     clientRoleType: ClientRoleType.ClientRoleAudience});
//             }
//         } catch (e) {
//             console.log(e);
//         }
//     };
    
//      const leave = () => {
//     try {
//         agoraEngineRef.current?.leaveChannel();
//         setRemoteUid(0);
//         setIsJoined(false);
//         showMessage('You left the channel');
//     } catch (e) {
//         console.log(e);
//     }
// };

//     return (
//         <SafeAreaView style={styles.main}>
//             <Text style={styles.head}>
//                 Agora Interactive Live Streaming Quickstart
//             </Text>
//             <View style={styles.btnContainer}>
//                 <Text onPress={join} style={styles.button}>
//                     Join
//                 </Text>
//                 <Text onPress={leave} style={styles.button}>
//                     Leave
//                 </Text>
//             </View>
//             <View style={styles.btnContainer}>
//                 <Text>Audience</Text>
//                 <Switch
//                     onValueChange={switchValue => {
//                         setIsHost(switchValue);
//                         if (isJoined) {
//                         leave();
//                         }
//                     }}
//                     value={isHost}
//                 />
//                 <Text>Host</Text>
//             </View>
//           <ScrollView
//                 style={styles.scroll}
//                 contentContainerStyle={styles.scrollContainer}>
//                 {isJoined && isHost ? (
//                 <React.Fragment key={0}>
//                     <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
//                     <Text>Local user uid: {uid}</Text>
//                 </React.Fragment>
//                 ) : (
//                     <Text>{isHost ? 'Join a channel' : ''}</Text>
//                 )}
//                 {isJoined && !isHost && remoteUid !== 0 ? (
//                     <React.Fragment key={remoteUid}>
//                         <RtcSurfaceView
//                             canvas={{uid: remoteUid}} style={styles.videoView} />
//                         <Text>Remote user uid: {remoteUid}</Text>
//                     </React.Fragment>
//                 ) : (
//                     <Text>{isJoined && !isHost ? 'Waiting for a remote user to join' : ''}</Text>
//                 )}
//                 <Text style={styles.info}>{message}</Text>
//             </ScrollView>
//         </SafeAreaView>
//     );
    
//     function showMessage(msg: string) {
//         setMessage(msg);
//     }
// };

// const styles = StyleSheet.create({
//     button: {
//         paddingHorizontal: 25,
//         paddingVertical: 4,
//         fontWeight: 'bold',
//         color: '#ffffff',
//         backgroundColor: '#0055cc',
//         margin: 5,
//     },
//     main: {flex: 1, alignItems: 'center'},
//     scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
//     scrollContainer: {alignItems: 'center'},
//     videoView: {width: '90%', height: 200},
//     btnContainer: {flexDirection: 'row', justifyContent: 'center'},
//     head: {fontSize: 20},
//     info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'}
// });

// export default App;


import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
 const [region, setRegion] = useState(null);
 const [locations, setLocations] = useState([]);

 useEffect(() => {
    // Request location permission
    Geolocation.requestAuthorization();

    // Set up a watcher to capture the longitude and latitude every 10 seconds
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude, speed, heading, timestamp, altitude } = position.coords;

    
        // Update the locations array with the new location
        setLocations(prevLocations => [...prevLocations, { latitude, longitude, speed, heading}]);
        // Update the map region to the current location
        setRegion({
          latitude,
          longitude,

          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, distanceFilter: 10, interval: 10000, fastestInterval: 5000 }
    );

    // Clean up the watcher when the component unmounts
    return () => {
      Geolocation.clearWatch(watchId);
    };
 }, []);

 const logTrip = () => {
  console.log("Trip Locations:", locations);
};

// Log the trip every time the locations state changes
useEffect(() => {
  logTrip();
}, [locations]);


 return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true} // This prop shows the user's location with a blue dot
        followsUserLocation={true}
         // Optional: This prop makes the map follow the user's location
      >
      </MapView>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
 },
 map: {
    flex: 1,
 },
});

export default App;
