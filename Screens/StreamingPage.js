import {View, Text, StyleSheet} from 'react-native';
import {LiveStream} from '../Components/LiveStream';

const StreamingPage = () => {
  return (
    <View style={styles.container}>
      <Text>Streaming Page</Text>
      <LiveStream />
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
