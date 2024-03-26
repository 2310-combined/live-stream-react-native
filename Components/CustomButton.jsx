import React from 'react';
import {Text, StyleSheet, Pressable, View} from 'react-native';

export const CustomButton = ({name, onPress}) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{color: 'white'}}
        style={({pressed}) =>
          pressed ? [styles.button, styles.pressed] : styles.button
        }
        onPress={onPress}>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#22223B',
    padding: 10,
    borderRadius: 40,
    width: '90%',
    height: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  pressed: {
    backgroundColor: '#303053',
    opacity: 1,
  },
});
