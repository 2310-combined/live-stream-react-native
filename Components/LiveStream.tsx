import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import { CustomButton } from './CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LiveStreamProps = {
  setIsHost: React.Dispatch<React.SetStateAction<boolean>>;
  isJoined: boolean;
  isHost: boolean;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  setTimestamps: React.Dispatch<React.SetStateAction<string[]>>;
  setTripCoordinates: React.Dispatch<React.SetStateAction<string[]>>;
  sendDataToBackend: React.Dispatch<React.SetStateAction<any>>;
};

type RootStackParams = {
  Home: undefined;
}

const appId = 'ca72c7a8387f4ad48e50a54dbef844f1';
const channelName = 'test';
const token =
  '007eJxTYFie3Pabz8mJKzw0u0TsYSSz7KHiw4/e1/050ygncsO0/ooCQ3KiuVGyeaKFsYV5mkliiolFqqlBoqlJSlJqmoWJSZphZbNCWkMgI4PigvMsjAwQCOKzMISkFpcwMAAAJMsfEA==';
const uid = 0;

export const LiveStream: React.FC<LiveStreamProps> = ({
  setIsHost,
  isJoined,
  isHost,
  setIsJoined,
  setTimestamps,
  setTripCoordinates,
  sendDataToBackend,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const agoraEngineRef = useRef<IRtcEngine>();
  const [remoteUid, setRemoteUid] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setupVideoSDKEngine();
  });

  useEffect(() => {
    join();
  }, []);

  const setupVideoSDKEngine = async () => {
    try {
      if (Platform.OS === 'android') {
        // await getPermission();
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

  const join = async () => {
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
      } else {
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      setIsHost(false);
      showMessage('You left the channel');
      // sendDataToBackend();
      navigation.navigate('Home' as keyof RootStackParams);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.main}>
      <View style={[styles.btnContainer, {width: isHost ? '40%' : '30%'}]}>
        <CustomButton
          name={isHost ? 'End Stream' : 'Leave'}
          onPress={leave}
        />
      </View>
      <View >
        {isJoined && isHost && (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
          </React.Fragment>
        )}
        {isJoined && !isHost && remoteUid !== 0 && (
          <View>
            <React.Fragment key={remoteUid}>
              <RtcSurfaceView
                canvas={{uid: remoteUid}}
                style={styles.videoView}
              />
              <Text style={styles.noHostText}>
                Waiting for a host to start a stream
              </Text>
            </React.Fragment>
          </View>
        )}
      </View>
    </View>
  );

  function showMessage(msg: string) {
    setMessage(msg);
  }
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  mapContainer: {
    width: '100%',
    height: '25%',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
    bottom: '5%',
  },
  videoView: {
    width: '100%',
    height: '100%',
  },
  head: {
    fontSize: 20,
  },
  info: {
    backgroundColor: '#ffffe0',
    paddingHorizontal: 8,
    color: '#0000ff',
  },
  noHostText: {
    fontSize: 90,
  },
});
