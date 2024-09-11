 import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const [screenOrientation, setScreenOrientation] = useState('portrait');
  const [isPortrait, setIsPortrait] = useState(true);

  const subscription = ScreenOrientation.addOrientationChangeListener((value) => {
    if (value.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
      setScreenOrientation('portrait');
      setIsPortrait(true);

    } else if (value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
      setScreenOrientation('landscape');
      setIsPortrait(false);
    }

  return () => {
    ScreenOrientation.removeOrientationChangeListener(subscription);
  };
}, []);

  const lockToPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  };
  const lockToLandscape = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  };
  return (
    <View style={[styles.container, isPortrait ? styles.portrait : styles.landscape]}>

      {isPortrait ? <Text>Only for Portrait</Text> : <Text>Only for Landscape</Text>}
      {(() => {
        if (isPortrait) {
          return <Button title="Lock to Landscape" onPress={lockToLandscape} />;
        } else {
          return <Button title="Lock to Portrait" onPress={lockToPortrait} />;
        }
      })()}
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  portrait: {
    backgroundColor: 'grey',
  },
  landscape: {
    backgroundColor: 'lightgrey',
  },

});