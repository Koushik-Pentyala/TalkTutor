// HistoryPopup.js
import React, { useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native'; // Include Animated from react-native
import Modal from 'react-native-modal';
import { PanGestureHandler, State } from 'react-native-gesture-handler';


const HistoryPopup = ({ isVisible, onClose, history }) => {
  const translateY = useRef(new Animated.Value(400)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.timing(translateY, {
        toValue: event.nativeEvent.translationY > 0 ? 400 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
          <Text style={styles.title}>History</Text>
          <FlatList
            data={history.slice(0, 2)} // Show only two items initially
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text>{item}</Text>
              </View>
            )}
          />
        </Animated.View>
      </PanGestureHandler>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HistoryPopup;
