import { ThemeType } from "@app/themes";
import { Center, Spinner, useTheme } from "native-base";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

const LoadingView = () => {
  const theme = useTheme() as ThemeType;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1, // Fully visible
      duration: 300, // Animation duration
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  }, []);

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Center>
        <Spinner size="xl" color={theme.colors.background} />
      </Center>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    opacity: 0.9,
  },
  logo: {
    width: 30,
    height: 30,
    position: "absolute",
  },
});

export default LoadingView;
