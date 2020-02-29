import React from 'react';
import {View, PermissionsAndroid, StyleSheet} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {globalStyles} from '../styles/global';

import RepeatOptions from '../components/RepeatOptions';
import PlaybackButtons from '../components/PlaybackButtons';

const NowPlaying = () => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.nowPlaying}>
        <RepeatOptions styles={styles} />
        <PlaybackButtons styles={styles} />
      </View>
    </View>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  nowPlaying: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },

  options: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderWidth: 1,
  },

  button: {
    borderWidth: 1,
    width: 50,
    height: 50,
    justifyContent: 'center',
    margin: 10,
  },

  buttonText: {
    textAlign: 'center',
    fontFamily: 'iosevka-regular',
    fontSize: 18,
  },

  buttonBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#81A1C1',
  },

  optionContainer: {
    flexDirection: 'row',
  },

  repeat: {
    alignItems: 'center',
  },
});
