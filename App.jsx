
import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { Text, View } from 'react-native';

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const connectionData = {
    appId: '44d2a04dc15741e49a2f92dd65b70fdd', // Replace with your Agora App ID
    channel: 'test',
    token: '007eJxSYAi+M/tu+R1+Da6yqMfq+l498fZ1iq3zmUuXyzCkyH5NO6XAYGKSYpRoYJKSbGhqbmKYamKZaJRmaZSSYmaaZG6QlpLy+PWfVAdeZobwRmMGRgZGBhYGRgYQnwlMMoNJFjDJwMDMkJWbCggAAP//go0dog==', // Enter your channel token as a string if you have one
  };

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
    },
  };

  return videoCall ? (
    <AgoraUIKit
      connectionData={connectionData}
      callbacks={callbacks}
    />
  ) : (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
    <Text onPress={() => setVideoCall(true)}>Join</Text>
    </View>
  );
};

export default App;
