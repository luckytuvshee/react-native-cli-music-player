import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  increaseCounter,
  decreaseCounter,
  setCounter,
} from '../actions/counterAction';
import counterReducer from '../reducers/counterReducer';

const Counter = ({counter, increaseCounter, decreaseCounter, setCounter}) => {
  useEffect(() => {
    console.log(counter);
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
      }}>
      <TouchableOpacity onPress={() => increaseCounter()}>
        <Text style={{fontSize: 20}}>Increase</Text>
      </TouchableOpacity>
      <Text style={{fontSize: 20}}>{counter}</Text>
      <TouchableOpacity onPress={() => decreaseCounter()}>
        <Text style={{fontSize: 20}}>Decrease</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCounter(247)}>
        <Text style={{fontSize: 20}}>set 247</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = state => {
  console.log(`State: ${JSON.stringify(state)}`);
  return {
    counter: state.counterReducer, // state.counterReducer name of the reducer name
    // so counterReducer is not an appropriate name,
    // that's why people don't include reducer in their reducer name xD
    // if you have a object
    // then you can access --> state.counter.myObj
  };
};

export default connect(mapStateToProps, {
  increaseCounter,
  decreaseCounter,
  setCounter,
})(Counter);
