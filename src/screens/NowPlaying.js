import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {globalStyles} from '../styles/global';

import RepeatOptions from '../components/RepeatOptions';
import PlaybackButtons from '../components/PlaybackButtons';

const NowPlaying = () => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.nowPlaying}>
        <RepeatOptions styles={styles} />
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/tux.png')}
            style={styles.image}
          />
        </View>
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

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  options: {
    marginTop: 'auto',
    alignItems: 'center',
    // borderWidth: 1,
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
    fontSize: 18,
  },

  playbackButtonText: {
    fontFamily: 'iosevka-bold',
    color: '#81A1C1',
  },

  buttonBorder: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },

  optionContainer: {
    flexDirection: 'row',
  },

  repeat: {
    alignItems: 'center',
  },
});
