import {View, Text, StyleSheet} from 'react-native';
import {LiveStream} from '../Components/LiveStream';

const StreamingPage = ({
  setIsHost,
  isHost,
  isJoined,
  setIsJoined,
  setTimestamps,
  setTripCoordinates,
  sendDataToBackend
}) => {
  return (
    <View style={styles.container}>
      <LiveStream
        sendDataToBackend={sendDataToBackend}
        setTimestamps={setTimestamps}
        setTripCoordinates={setTripCoordinates}
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
});
