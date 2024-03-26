import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Platform } from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import LiveMap from './LiveMap';

const appId = '1fd28176ade84ba0a3dd5a788c44469a';
const channelName = 'test';
const token =
  '007eJxTYFjP/f//9wVsx1Zd2PlB8H/Fi9JLKlLuP7l+W+9uu2S9685aBQbDtBQjC0Nzs8SUVAuTpESDROOUFNNEcwuLZBMTEzPLxI9vmNIaAhkZ1OT3MTBCIYjPwlCSWlzCwAAAjTYjLQ==';
const uid = 0;

export const LiveStream = () => {
  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(false); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user

  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
  });

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  const joinAsHost = async () => {
    if (isJoined) return;
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      agoraEngineRef.current?.startPreview();
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });

      setIsHost(true);
    } catch (e) {
      console.log(e);
    }
  };

  const joinAsAudience = async () => {
    if (isJoined) return;
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleAudience,
      });
      setIsHost(false);
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      {isJoined && <LiveMap />}
      <View style={styles.btnContainer}>
        <Text onPress={joinAsHost} style={styles.button}>
          Join as Host
        </Text>
        <Text onPress={joinAsAudience} style={styles.button}>
          Join as Viewer
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave
        </Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}>
        {isJoined && isHost ? (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>{isHost ? 'Join a channel' : ''}</Text>
        )}
        {isJoined && !isHost && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{uid: remoteUid}}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>
            {isJoined && !isHost ? 'Waiting for a remote user to join' : ''}
          </Text>
        )}
        <Text style={styles.info}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );

  function showMessage(msg: string) {
    setMessage(msg);
  }
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {width: '90%', height: 200},
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 20},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
});
function getPermission() {
  throw new Error('Function not implemented.');
}

