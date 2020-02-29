import TrackPlayer from 'react-native-track-player';
import {PermissionsAndroid} from 'react-native';

export const addSongToQueue = async (songs, RNFS) => {
  console.log('adding to the queue');
  try {
    songs = songs.map((song, index) => {
      const songWithName = song.split('/').pop();
      //const songName = songWithName.split(/\.mp3/)[0];
      const songName = songWithName.split('.mp3')[0].split('-');
      const artist = songName.slice(0, -1).join('-');
      const title = songName.slice(-1);

      return {
        title,
        url: `${RNFS.ExternalStorageDirectoryPath}${song}`,
        artist,
        id: index + '',
      };
    });

    //if (JSON.stringify(q) === JSON.stringify(songs)) return;

    TrackPlayer.setupPlayer({maxCacheSize: 1024 * 5}).then(async () => {
      TrackPlayer.updateOptions({
        //
      });
      // Adds one or more track to the queue
      await TrackPlayer.add(songs);
    });

    TrackPlayer.play();
  } catch (err) {
    console.error(err.message);
  }
};

export const seekForward = async seconds => {
  const position = await TrackPlayer.getPosition();
  TrackPlayer.seekTo(position + seconds);
};

export const seekBackward = async seconds => {
  const position = await TrackPlayer.getPosition();
  if (position < 5) await TrackPlayer.skipToPrevious();
  else TrackPlayer.seekTo(position + seconds);
};

export const prev = async () => {
  const position = await TrackPlayer.getPosition();
  if (position < 5) await TrackPlayer.skipToPrevious();
  else TrackPlayer.seekTo(0);
};

export const next = async () => {
  await TrackPlayer.skipToNext();
};

export const togglePlay = async () => {
  const status = await TrackPlayer.getState();
  console.log(status);
  if (status === 3) TrackPlayer.pause();
  else TrackPlayer.play();
};

export const requestReadExternalStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Need storage read permission',
        message: 'Need permission xD',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can read');
    } else {
      console.log('Storage read permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
