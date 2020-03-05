import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, NativeModules} from 'react-native';
import {globalStyles} from '../styles/global';

import RepeatOptions from '../components/RepeatOptions';
import PlaybackButtons from '../components/PlaybackButtons';
import Volume from '../components/Volume';

const NativeVolume = NativeModules.NativeVolume;

const NowPlaying = () => {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    getVolume();
  }, []);

  const volumeUp = async () => {
    NativeVolume.volumeUp(
      err => {
        console.log(err);
      },
      msg => {
        console.log('Msg: ' + msg);
        setVolume(msg);
      },
    );
  };

  const volumeDown = async () => {
    NativeVolume.volumeDown(
      err => {
        console.log(err);
      },
      msg => {
        console.log('Msg: ' + msg);
        setVolume(msg);
      },
    );
  };

  const getVolume = async () => {
    NativeVolume.getVolume(
      err => {
        console.log(err);
      },
      msg => {
        console.log('Msg: ' + msg);
        setVolume(msg);
      },
    );
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.nowPlaying}>
        <RepeatOptions styles={styles} />
        <Volume
          styles={styles}
          volume={volume}
          volumeUp={volumeUp}
          volumeDown={volumeDown}
        />
        {/* <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/tux.png')}
            style={styles.image}
          />
        </View> */}
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

  volumeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  volume: {
    borderWidth: 1,
  },

  volumeText: {
    fontSize: 28,
    textAlign: 'center',
  },

  hide: {
    borderWidth: 0,
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },

  options: {
    marginTop: 'auto',
    alignItems: 'center',
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
