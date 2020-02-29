import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {next, prev, seekBackward, seekForward, togglePlay} from '../utils';

const PlaybackButtons = ({styles}) => {
  return (
    <View style={styles.options}>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => prev()}>
          <Text style={styles.buttonText}>prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => togglePlay()}>
          <Text style={styles.buttonText}>c</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => next()}>
          <Text style={styles.buttonText}>next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => seekBackward(-5)}>
          <Text style={styles.buttonText}>h</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => seekForward(5)}>
          <Text style={styles.buttonText}>l</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaybackButtons;
