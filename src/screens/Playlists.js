import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import {getPlaylists} from '../actions/playlist';
import {changeQueue} from '../actions/queue';
import {ScrollView} from 'react-native-gesture-handler';

import {globalStyles} from '../styles/global';
import Card from '../shared/card';

const Playlists = ({
  navigation,
  playlists: {playlists, loading},
  getPlaylists,
  changeQueue,
}) => {
  const pressHandler = (path, playlistName) => {
    Alert.alert(
      'Change Queue',
      `Want to change queue with "${playlistName}"?`,
      [
        {
          text: 'YES',
          onPress: () => {
            changeQueue(path, playlistName);
            navigation.navigate('Queue', {
              comeFrom: 'playlist',
            });
          },
        },
        {text: 'Cancel', type: 'cancel'},
      ],
    );
  };

  useEffect(() => {
    getPlaylists();
    console.log('componentDidMount');
  }, [getPlaylists]);

  return (
    <ScrollView style={globalStyles.container}>
      {playlists &&
        playlists.map((playlist, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => pressHandler(playlist.path, playlist.name)}>
            <Card>
              <Text style={globalStyles.text}>{playlist.name}</Text>
            </Card>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    playlists: state.playlists,
  };
};

export default connect(mapStateToProps, {getPlaylists, changeQueue})(Playlists);
