import TrackPlayer from 'react-native-track-player';
import {
  next,
  prev,
  seekForward,
  seekBackward,
  trackChangeHandler,
  queueEndHandler,
  stopHandler,
} from './utils';

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-next', () => next());
  TrackPlayer.addEventListener('remote-previous', () => prev());
  TrackPlayer.addEventListener('remote-jump-forward', () => seekForward(5));
  TrackPlayer.addEventListener('remote-jump-backward', () => seekBackward(-5));

  TrackPlayer.addEventListener('playback-track-changed', () =>
    trackChangeHandler(),
  );
  TrackPlayer.addEventListener('playback-queue-ended', () => queueEndHandler());

  TrackPlayer.addEventListener('remote-stop', () => stopHandler());

  // "malformed calls from js field sizes are different" error occured
  //                        when not passing argument to seek funcions
};
