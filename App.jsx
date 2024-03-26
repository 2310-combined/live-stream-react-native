import LiveMap from './Components/LiveMap';
import LiveStream from './Components/LiveStream';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import LandingPage from './Screens/LandingPage';

export default function App() {
  return (
    <View style={styles.safeView}>
      <LandingPage />
      {/* <LiveMap />
      <LiveStream /> */}
    </View>
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
