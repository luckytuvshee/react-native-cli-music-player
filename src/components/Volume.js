import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Volume = ({styles, volume, volumeUp, volumeDown}) => {
  const format = volume => {
    return Math.ceil((volume * 100) / 15);
  };

  return (
    <View style={styles.volumeContainer}>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => volumeUp()}>
          <Text style={styles.volumeText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => volumeDown()}>
          <Text style={styles.volumeText}>-</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => volumeUp()}>
          <Text style={styles.volumeText}>{format(volume)}</Text>
        </TouchableOpacity>
        <View style={[styles.button, styles.hide]}></View>
      </View>
      <View style={[styles.button, styles.hide]}></View>
    </View>
  );
};

export default Volume;
