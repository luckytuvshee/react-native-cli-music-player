import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import {addQueue, playQueue} from '../actions/player';
import {retrieveQueue} from '../actions/queue';
import Card from '../shared/card';
import {globalStyles} from '../styles/global';

const Queue = ({
  route,
  queue: {currentQueue, playlistName, loading},
  addQueue,
  playQueue,
  retrieveQueue,
}) => {
  const {comeFrom} = route.params || '';

  useEffect(() => {
    if (!playlistName) {
      retrieveQueue();
    }
    if (comeFrom === 'playlist') addQueue(currentQueue);
  }, [playlistName]); // only re-render if playlistName changes

  const pressHandler = (song, index) => {
    playQueue(song, index);
  };

  const getCurrentSongId = async index => {
    const id = await TrackPlayer.getCurrentTrack();
    return parseInt(id);
  };

  const songNameExtractor = path => {
    const songWithName = path.split('/').pop();
    //const songName = songWithName.split(/\.mp3/)[0];
    const songName = songWithName.split('.mp3')[0].split('-');
    const artist = songName.slice(0, -1).join('-');
    const title = songName.slice(-1);
    return `${artist} - ${title}`;
  };

  return loading || !playlistName ? (
    <View style={styles.container}>
      <Text style={styles.text}>No playlist selected</Text>
    </View>
  ) : (
    <ScrollView style={globalStyles.container}>
      {currentQueue.length == 0 && (
        <View style={styles.container}>
          <Text
            style={styles.text}>{`No song in "${playlistName}" playlist`}</Text>
        </View>
      )}
      {currentQueue &&
        currentQueue.map((queue, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => pressHandler(queue, index)}>
            <Card>
              <Text style={[globalStyles.songTitle]}>
                {songNameExtractor(queue)}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    queue: state.queue,
  };
};

export default connect(mapStateToProps, {addQueue, playQueue, retrieveQueue})(
  Queue,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  text: {
    fontFamily: 'iosevka-regular',
    fontSize: 18,
    padding: 20,
  },
});
