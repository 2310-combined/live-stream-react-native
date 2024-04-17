import {Text, StyleSheet, View, Image, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomButton} from '../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const LandingPage = ({setIsJoined, setIsHost}) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#C6FFDD', '#FBD786', '#FF7777']}
        style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.imageRow}>
            <Image
              style={styles.image}
              source={require('../assets/selfie2.jpg')}
            />
            <Image
              style={styles.image}
              source={require('../assets/selfie3.jpg')}
            />
            <Image
              style={styles.image}
              source={require('../assets/selfie1.jpg')}
            />
          </View>
          <View style={styles.imageRow}>
            <Image
              style={styles.image}
              source={require('../assets/selfie4.jpg')}
            />
            <Image
              style={styles.image}
              source={require('../assets/selfie5.jpg')}
            />
            <Image
              style={styles.image}
              source={require('../assets/selfie6.jpg')}
            />
          </View>
        </View>
        <View style={styles.navigationContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Streamers</Text>
            <Text style={styles.title}>On-The-Go</Text>
          </View>
          <View>
            <CustomButton
              style={styles.button}
              name={'Join as Host'}
              onPress={() => {
                setIsHost(true);
                setIsJoined(true);
                navigation.navigate('StreamingPage')
              }}
            />
            <CustomButton
              style={styles.button}
              name={'Join as Viewer'}
              onPress={() => {
                setIsHost(false);
                setIsJoined(true);
                navigation.navigate('ViewerPage')
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#22223B',
  },
  imageContainer: {
    position: 'fixed',
    bottom: 100,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    transform: [{rotate: '30deg'}],
  },
  image: {
    width: 175,
    height: 265,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navigationContainer: {
    position: 'fixed',
    bottom: 50,
    justifyContent: 'center',
    width: '100%',
  },
  titleContainer: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});

export default LandingPage;
