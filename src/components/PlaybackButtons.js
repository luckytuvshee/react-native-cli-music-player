import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {next, prev, seekBackward, seekForward, togglePlay} from '../utils';

const ButtonText = ({text, styles}) => {
  return (
    <Text style={[styles.buttonText, styles.playbackButtonText]}>{text}</Text>
  );
};

const PlaybackButtons = ({styles}) => {
  return (
    <View style={styles.options}>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => prev()}>
          <ButtonText text="prev" styles={styles} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => togglePlay()}>
          <ButtonText text="c" styles={styles} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => next()}>
          <ButtonText text="next" styles={styles} />
        </TouchableOpacity>
      </View>

      {/* Seek */}
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => seekBackward(-5)}>
          <ButtonText text="h" styles={styles} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonBorder]}
          onPress={() => seekForward(5)}>
          <ButtonText text="l" styles={styles} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaybackButtons;
