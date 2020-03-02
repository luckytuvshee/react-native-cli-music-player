import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import NowPlaying from './src/screens/NowPlaying';
import MusicStatusBar from './src/components/MusicStatusBar';
import Queue from './src/screens/Queue';
import Playlists from './src/screens/Playlists';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {requestReadExternalStoragePermission} from './src/utils';

import SplashScreen from 'react-native-splash-screen';

import TrackPlayer from 'react-native-track-player';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

console.log(store.getState());

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Now Playing"
        component={NowPlaying}
        options={{
          tabBarIcon: () => <Icon name="play-circle-outline" size={28} />,
        }}
      />
      <Tab.Screen
        name="Queue"
        component={Queue}
        options={{
          tabBarIcon: () => <Icon name="playlist-music-outline" size={28} />,
        }}
      />
      <Tab.Screen
        name="Playlists"
        tabBarLabel={'hello'}
        component={Playlists}
        options={{
          tabBarIcon: () => <Icon name="playlist-play" size={28} />,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    requestReadExternalStoragePermission();
  }, []);

  //AppRegistry.registerComponent(...);
  TrackPlayer.registerPlaybackService(() => require('./src/service.js'));

  return (
    <Provider store={store}>
      <StatusBar backgroundColor="#2E3440" barStyle="light-content" />
      <NavigationContainer>
        {/* <Counter /> */}
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => <MusicStatusBar />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
