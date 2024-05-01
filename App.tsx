/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

import TrackPlayer, { State, Event, useTrackPlayerEvents, useProgress, Capability, AppKilledPlaybackBehavior } from 'react-native-track-player';
import { track1, track2, track3 } from './Tracks';
import ProgressBar from './ProgressBar';




function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [trackTitle, setTrackTitle] = useState<string>();


  const invokePlayer = async () => {
    await TrackPlayer.setupPlayer()
    // The player is ready to be used
  }

  const addTracks = async () => {
    await TrackPlayer.add([track1, track2, track3]);
  }

  const getPlayerState = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      console.log('The player is playing');
    };

    // let trackIndex = await TrackPlayer.getCurrentTrack();
    // let trackObject = await TrackPlayer.getTrack(trackIndex);
    // console.log(`Title: ${trackObject.title}`);

    // const position = await TrackPlayer.getPosition();
    // const duration = await TrackPlayer.getDuration();
    // console.log(`${duration - position} seconds left.`);
  }

  const play = async () => {
    TrackPlayer.play();
  }

  const stop = async () => {
    TrackPlayer.pause();
  }
  const reset = async () => {
    TrackPlayer.reset();
  }

  const playNext = async () => {
    await TrackPlayer.skipToNext();
  }

  const playPrevious = async () => {
    await TrackPlayer.skipToPrevious();

  }
  const removeTrack = async (tracks: []) => {
    await TrackPlayer.remove(tracks);
  }

  const getQueue = async () => {
    // Retrieve the track objects in the queue:
    const tracks = await TrackPlayer.getQueue();
    console.log(`First title: ${tracks[0].title}`);
  }

  const updateTrackCapabilities = async () => {
    TrackPlayer.updateOptions({
      // android: {
      //   // This is the default behavior
      //   appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
      // },
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],

      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause],
    });

  }

  useEffect(() => {
    invokePlayer()
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const PlayerInfo = () => {
    const [trackTitle, setTrackTitle] = useState<string>();

    // do initial setup, set initial trackTitle..

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
      if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const { title } = track || {};
        setTrackTitle(title);
      }
    });

    return (
      <Text>{trackTitle}</Text>
    );
  }

  function formatTime(seconds: any) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);

    // Add leading zero if necessary
    let minutesString = minutes < 10 ? '0' + minutes : minutes;
    let secondsString = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    return minutesString + ':' + secondsString;
  }

  const MyPlayerBar = () => {
    const progress = useProgress();

    return (
      // Note: formatTime and ProgressBar are just examples:
      <View>
        <Text>{formatTime(progress.position)}</Text>
        <ProgressBar
          progress={progress.position}
          buffered={progress.buffered}
        />
      </View>
    );

  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
