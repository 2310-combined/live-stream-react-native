import {View, Text, StyleSheet} from 'react-native'
import LiveMap from '../Components/LiveMap';
import LiveStream from '../Components/LiveStream';

const StreamingPage = () => {
    return (
        <View style={styles.container}>
            <Text>Streaming Page</Text>
            <LiveMap />
            <LiveStream />
        </View>
    )
}

export default StreamingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})