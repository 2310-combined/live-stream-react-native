
import { LiveStream } from './Components/LiveStream';
import {SafeAreaView, StyleSheet, View} from 'react-native';



export default function App() {
  return (
    <SafeAreaView style={styles.safeView}>
      <LiveStream />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignContent: 'center',
    height: '100%',
  },
});
