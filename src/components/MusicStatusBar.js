import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';

const MusicStatusBar = ({repeat, playlistName}) => {
  const [currentSong, setCurrentSong] = useState({});
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [state, setState] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setInterval(async () => {
      const [pos, dur, id, state] = await Promise.all([
        TrackPlayer.getPosition(),
        TrackPlayer.getDuration(),
        TrackPlayer.getCurrentTrack(),
        TrackPlayer.getState(),
      ]);
      const songName = await TrackPlayer.getTrack(id);
      if (songName !== null) {
        setCurrentSong(songName);
      }
      setPosition(pos);
      setDuration(dur);
      setState(state);

      if (pos && dur && dur - pos < 0.8) {
        if (repeat === 'ONCE') await TrackPlayer.seekTo(0);
        else if (repeat === 'SHUFFLE') {
          let queue = await TrackPlayer.getQueue();
          queue = queue.filter(item => item.id !== track.id);
          const count = queue.length - 1;
          const index = Math.floor(Math.random() * count);
          const trackId = queue[index].id;
          await TrackPlayer.skip(trackId);
        }
      }
    }, 500);
  };

  const format = value => {
    value = value.toFixed();

    const second =
      (Math.floor(value % 60) < 10 ? '0' : '') + Math.floor(value % 60);

    let minutes = Math.floor(value / 60);

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (minutes >= 60) {
      hours = Math.floor(minutes / 60);
      minutes = minutes % 60;

      if (minutes < 10) {
        minutes = '0' + minutes;
      }
    }

    return `${minutes}:${second}`;
  };

  const togglePlay = () => {
    if (state === 3) TrackPlayer.pause();
    else TrackPlayer.play();
  };

  const playState = () => {
    switch (state) {
      case 3:
        return '>';
      case 2:
        return '|';
      default:
        return '.';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => togglePlay()}>
      <View style={styles.statusBar}>
        <Text
          style={
            styles.songName
          }>{`${currentSong.artist} - ${currentSong.title}`}</Text>
        <View style={styles.songInfo}>
          <Text style={styles.statusText}>{`${playState()} ${format(
            position,
          )} / ${format(duration)} `}</Text>

          <Text style={styles.statusText}>{playlistName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => {
  return {
    repeat: state.player.repeat,
    playlistName: state.queue.playlistName,
  };
};

export default connect(mapStateToProps)(MusicStatusBar);

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },

  songName: {
    backgroundColor: '#81A1C1',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontSize: 16,
    fontFamily: 'iosevka-regular',
  },

  songInfo: {
    paddingHorizontal: 10,
    fontFamily: 'iosevka-regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statusText: {
    fontSize: 18,
    fontFamily: 'iosevka-regular',
  },
});
