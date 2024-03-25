import LiveMap from './LiveMap';
import LiveStream from './LiveStream';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function App() {
 
return (
  <SafeAreaView style={styles.safeView}>
    <LiveMap  />
    <LiveStream />
  </SafeAreaView>
)
}


const styles = StyleSheet.create({
safeView: {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-end",
  alignContent: "center",
  height: "100%",
}
})
