/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { useState } from 'react';
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
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Roam from 'roam-reactnative';


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [tripId, setTripId] = useState('');
  const [tripResponse, setTripResponse] = useState('');
  const [getActiveTripsisLocal, setGetActiveTripsisLocal] = useState(true)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const createUser = () => {
    Roam.createUser('test', success => {
      console.log(JSON.stringify(success))
    }, error => {
      console.log(JSON.stringify(error))
    })
  }

  const requestPermission = () => {
    Roam.requestLocationPermission()
  }

  const startTracking = () => {
    Roam.startTrackingCustom(true, false, Roam.ActivityType.FITNESS, Roam.DesiredAccuracyIOS.BEST, true, 0, 50, 15)
  }

  const stopTracking = () => {
    Roam.stopTracking()
  }


  // ----- Trip V2 -----

  const onCreateTripPress = () => {
    var stop1 = new Roam.RoamTripStop(null, null, 'Saini Khera Village', 'Sec-30', null, 100, [77.058709, 28.467933]);
    var stop2 = new Roam.RoamTripStop(null, null, 'sec-39', '39', null, 100, [77.043431, 28.439106]);
    var stop3 = new Roam.RoamTripStop(null, null, 'Home', 'home', null, 100, [77.051735, 28.442125]);
    var roamTrip = new Roam.RoamTrip(null, 'test trip 1', 'test1', [stop1, stop2, stop3], false, null, null);
    Roam.createTrip(roamTrip, success=>{
      console.log(JSON.stringify(success))
      setTripId(success.trip.tripId)
      setTripResponse(JSON.stringify(success))
    }, error=>{
          console.log(JSON.stringify(error))
          setTripResponse(JSON.stringify(error))
    })
  };

  const onStartQuickTripPress = () => {
    var roamTrip = new Roam.RoamTrip(null, 'test trip 2', 'test2', null, true, null, null);
    var customTrackingOption = new Roam.RoamCustomTrackingOptions(Roam.DesiredAccuracy.HIGH, 5, 0, 0, Roam.ActivityType.FITNESS, Roam.DesiredAccuracyIOS.BEST, true, false, true, 20)
    Roam.startQuickTrip(roamTrip, Roam.TrackingMode.CUSTOM, customTrackingOption, success=>{
      console.log(JSON.stringify(success))
      setTripId(success.trip.tripId)
      setTripResponse(JSON.stringify(success))
    }, error=>{
      console.log(JSON.stringify(error))
        setTripResponse(JSON.stringify(error))
    })
  }



  const onStartTrip = () => {
    if (typeof tripId === 'undefined') {
      Alert.alert('Invalid trip id', 'Please create a test trip before');
      return;
    }
    Roam.startTrip(tripId, success=>{
      console.log(JSON.stringify(success))
        setTripResponse(JSON.stringify(success))
    }, error=>{
      console.log(JSON.stringify(error))
        setTripResponse(JSON.stringify(error))
    })
  }

  const onEndTrip = () => {
    if (typeof tripId === 'undefined') {
      Alert.alert('Invalid trip id', 'Please create a test trip before');
      return;
    }
    Roam.endTrip(tripId, true, success=>{
      console.log(JSON.stringify(success))
        setTripResponse(JSON.stringify(success))
    }, error=>{
      console.log(JSON.stringify(error))
        setTripResponse(JSON.stringify(error))
    })
  }

  const onSyncTrip = () => {
    if (typeof tripId === 'undefined') {
      Alert.alert('Invalid trip id', 'Please create a test trip before');
      return;
    }
    Roam.syncTrip(tripId, success=>{
      console.log(JSON.stringify(success))
        setTripResponse(JSON.stringify(success))
    }, error=>{
      console.log(JSON.stringify(error))
        setTripResponse(JSON.stringify(error))
    })
  }

  const onGetTrip = () => {
    if (typeof tripId === 'undefined') {
      Alert.alert('Invalid trip id', 'Please create a test trip before');
      return;
    }
    Roam.getTrip(tripId, success=>{
      console.log(JSON.stringify(success))
        setTripResponse(JSON.stringify(success))
    }, error=>{
      console.log(JSON.stringify(error))
        setTripResponse(JSON.stringify(error))
    })
  }

  const onGetActiveTrips = () => {
    Roam.getActiveTrips(getActiveTripsisLocal, success=>{
      console.log(JSON.stringify(success))
        setTripResponse(JSON.stringify(success))
    }, error=>{
      console.log(JSON.stringify(error))
        setTripResponse(JSON.stringify(error))
    })
  }

  const onDeleteTrip = () => {
    if (typeof tripId === 'undefined') {
      Alert.alert('Invalid trip id', 'Please create a test trip before');
      return;
    }
    Roam.deleteTrip(tripId, success=>{
      console.log(JSON.stringify(success))
        setTripResponse(JSON.stringify(success))
    }, error=>{
      console.log(JSON.stringify(error))
        setTripResponse(JSON.stringify(error))
    })
  }

  const onIsTripSynced = () => {
    if (typeof tripId === 'undefined') {
      Alert.alert('Invalid trip id', 'Please create a test trip before');
      return;
    }
    Roam.isTripSynced(tripId, success=>{
        console.log(JSON.stringify(success))
          setTripResponse(JSON.stringify(success))
      }, error=>{
        console.log(JSON.stringify(error))
          setTripResponse(JSON.stringify(error))
      })
  }

  const onGetTripSummaryPress = () => {
    if (typeof tripId === 'undefined') {
      Alert.alert('Invalid trip id', 'Please create a test trip before');
      return;
    }
    console.log('getTripSummary called')
    Roam.getTripSummary(tripId, success=>{
      console.log('trip summary: ' + JSON.stringify(success))
        setTripResponse(JSON.stringify(success))
    }, error=>{
      console.log(JSON.stringify(error))
        setTripResponse(JSON.stringify(error))
    })
  }



  // ----- END ------

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>

            <Text style={styles.counter}>
              User ID : {tripId}
            </Text>

            <Text style={styles.counter}>
              Trip Response : {tripResponse}
            </Text>
        
            <View style={styles.row}>
              <Button onPress={() => {createUser()}}>Create User</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {requestPermission()}}>Request Permission</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {startTracking()}}>Start Tracking</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {stopTracking()}}>Stop Tracking</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onCreateTripPress()}}>Create Online Trip</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onStartQuickTripPress()}}>Start Offline Quick Trip</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onStartTrip()}}>Start Trip</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onEndTrip()}}>End Trip</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onSyncTrip()}}>Sync Trip</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onIsTripSynced()}}>Is Trip Synced</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onDeleteTrip()}}>Delete Trip</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onGetTrip()}}>Get Trip</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onGetActiveTrips()}}>Get Active Trips</Button>
              <Button onPress={() => {setGetActiveTripsisLocal(getActiveTripsisLocal => !getActiveTripsisLocal)}}>Local: {getActiveTripsOnline}</Button>
            </View>

            <View style={styles.row}>
              <Button onPress={() => {onGetTripSummaryPress()}}>Get Trip Summary</Button>
            </View>



      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
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
