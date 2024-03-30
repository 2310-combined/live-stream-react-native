import {View, Text, StyleSheet} from 'react-native';
import {LiveStream} from '../Components/LiveStream';

const StreamingPage = ({isHost, isJoined, setIsJoined}) => {
  return (
    <View style={styles.container}>
      <LiveStream setIsJoined={setIsJoined} isHost={isHost} isJoined={isJoined} />
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
