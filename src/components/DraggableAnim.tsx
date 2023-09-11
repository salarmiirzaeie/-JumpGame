import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const SIZE = 120;

export default function DraggableAnim() {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const width = useSharedValue(0);

  const onLayout = event => {
    width.value = event.nativeEvent.layout.width;
  };

  const pan = Gesture.Pan().onChange(event => {
    // highlight-next-line
    offsetX.value += event.changeX;
    offsetY.value += event.changeY;
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offsetX.value}, {translateY: offsetY.value}],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    cursor: 'grab',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
