import { extendTheme, theme as nbTheme } from "native-base";

const lightThemeColors = {
  ...nbTheme.colors,
  skeleton: {
    startColor: "gray.300",
    endColor: "gray.400",
  },
  primary: {
    50: "#FFE5E5",
    100: "#FFC2C2",
    200: "#FF9999",
    300: "#FF7070",
    400: "#FF4747",
    500: "#FF1F1F",
    600: "#E61C1C",
    700: "#CC1919",
    800: "#B31616",
    900: "#990F0F",
  },
  text: "#000000",
  titlePage: "#5EDFF5",
  background: "#FFD233",
  backgroundIcon: "#DDE0FF",
  button: {
    active: "#4284F4",
    inactive: "#9E9E9E",
  },
  backgroundCourseCard: "#FFFFFF",
  backgroundExpandColor: {
    text: "#16AEF4",
    bg: "#DDE0FF",
  },
  icon: {
    finishActive: "#4284F4",
  },
  switchButton: {
    active: "#335EF7",
  },
  card: {
    background: "white",
  },
  loading: {
    color: "#5EDFF5",
  },
  danger: {
    50: "#FFE5E5",
    100: "#FFC2C2",
    200: "#FF9999",
    300: "#FF7070",
    400: "#FF4747",
    500: "#FF1F1F",
    600: "#E61C1C",
    700: "#CC1919",
    800: "#B31616",
    900: "#990F0F",
  },
  success: {
    50: "#E6F7E6",
    100: "#C1EBC1",
    200: "#99DF99",
    300: "#70D370",
    400: "#47C747",
    500: "#1FBB1F",
    600: "#1AA61A",
    700: "#159015",
    800: "#107A10",
    900: "#0B640B",
  },
  warning: {
    50: "#FFF7E6",
    100: "#FFEBC2",
    200: "#FFDF99",
    300: "#FFD370",
    400: "#FFC747",
    500: "#FFBB1F", // Warning orange
    600: "#E6A61A",
    700: "#CC9015",
    800: "#B37A10",
    900: "#99640B",
  },
};

const fontConfig = {
  ios: {
    100: {
      normal: "San Francisco",
    },
    200: {
      normal: "San Francisco",
    },
    300: {
      normal: "San Francisco",
    },
    400: {
      normal: "San Francisco",
    },
    500: {
      normal: "San Francisco",
    },
    600: {
      normal: "San Francisco",
    },
    700: {
      normal: "San Francisco",
    },
    800: {
      normal: "San Francisco",
    },
    900: {
      normal: "San Francisco",
    },
  },
  default: {
    100: {
      normal: "San Francisco",
    },
    200: {
      normal: "San Francisco",
    },
    300: {
      normal: "San Francisco",
    },
    400: {
      normal: "San Francisco",
    },
    500: {
      normal: "San Francisco",
    },
    600: {
      normal: "San Francisco",
    },
    700: {
      normal: "San Francisco",
    },
    800: {
      normal: "San Francisco",
    },
    900: {
      normal: "San Francisco",
    },
  },
};

const fonts = {
  heading: "San Francisco",
  body: "San Francisco",
  mono: "San Francisco",
};

const lightTheme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: "light",
  },
  colors: lightThemeColors,
  fontConfig,
  fonts,
});

export type LightThemeType = typeof lightTheme;

export default lightTheme;
