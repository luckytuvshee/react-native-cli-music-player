import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {changeRepeat} from '../actions/player';

const RepeatOptions = ({styles, repeat, changeRepeat}) => {
  const pressHandler = repeatString => {
    if (repeat !== repeatString) {
      console.log('Repeat changed: ' + repeat + ' --> ' + repeatString);
      changeRepeat(repeatString);
    }
  };

  return (
    <View style={styles.repeat}>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            repeat == 'ALL' && {backgroundColor: '#81A1C1'},
          ]}
          onPress={() => pressHandler('ALL')}>
          <Text style={styles.buttonText}>
            <Icon name="repeat" size={28} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            repeat == 'ONCE' && {backgroundColor: '#81A1C1'},
          ]}
          onPress={() => pressHandler('ONCE')}>
          <Text style={styles.buttonText}>
            <Icon name="repeat-once" size={28} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            repeat == 'SHUFFLE' && {backgroundColor: '#81A1C1'},
          ]}
          onPress={() => pressHandler('SHUFFLE')}>
          <Text style={styles.buttonText}>
            <Icon name="shuffle" size={28} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    repeat: state.player.repeat,
  };
};

export default connect(mapStateToProps, {changeRepeat})(RepeatOptions);
