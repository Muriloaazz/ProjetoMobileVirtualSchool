import { StyleSheet, View } from 'react-native';

const DOTS = [
  { top: '4%', left: '6%', size: 2, opacity: 0.95 },
  { top: '8%', left: '26%', size: 3, opacity: 0.7 },
  { top: '16%', left: '60%', size: 1.5, opacity: 0.6 },
  { top: '28%', left: '18%', size: 2.5, opacity: 0.4 },
  { top: '40%', left: '82%', size: 2, opacity: 0.35 },
  { top: '56%', left: '42%', size: 3.5, opacity: 0.5 },
  { top: '70%', left: '12%', size: 2, opacity: 0.3 },
  { top: '82%', left: '72%', size: 2.5, opacity: 0.25 },
  { top: '30%', left: '50%', size: 1.8, opacity: 0.6 },
  { top: '12%', left: '76%', size: 2.2, opacity: 0.45 },
];

export default function BackgroundDots() {
  return (
    <View pointerEvents="none" style={localStyles.wrapper}>
      {DOTS.map((d, i) => (
        <View
          key={i}
          style={[
            localStyles.dot,
            {
              top: d.top,
              left: d.left,
              width: d.size,
              height: d.size,
              borderRadius: d.size / 2,
              backgroundColor: `rgba(45,166,214,${d.opacity})`,
            },
          ]}
        />
      ))}
    </View>
  );
}

const localStyles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  dot: {
    position: 'absolute',
    // tiny glow effect could be simulated by semi-transparent larger dot beneath (omitted for simplicity)
  },
});
