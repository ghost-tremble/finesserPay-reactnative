import AppLoading from "expo-app-loading";
import GlobalProvider from "./src/context/Provider";
import ForgetPassword from "./src/screens/authScreens/forgetPassword/ForgetPassword";
import NewPassword from "./src/screens/authScreens/forgetPassword/NewPassword";
import Otpverification from "./src/screens/authScreens/forgetPassword/OtpVerification";
import { Asset, useAssets } from "expo-asset";
import { GetStarted } from "./src/screens/authScreens/Getstarted";
import SignUp from "./src/screens/authScreens/Signup";
import Login from "./src/screens/authScreens/Login";
import Verify from "./src/screens/authScreens/Verify";
import Completed from "./src/screens/authScreens/Completed";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { useGlobalContext } from "./src/context/Provider";
import SideDrawer from "./src/Navigation/SideDrawer";

import { SelectInterest } from "./src/screens/authScreens/SelectInterest";
import { SelectAccountType } from "./src/screens/authScreens/SelectAccountType";

import BackIcon from "./src/utils/BackIcon";
import theme from "./src/utils/theme";

//Fonts
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import {
  initialState,
  userLoginReducer,
} from "./src/context/reducers/userReducer";

import { colors, fonts } from "./src/utils/utils";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Tabs from "./src/Navigation/BottomTabs";
import { AxiosProvider } from "./src/context/axiosContext";

const Stack = createStackNavigator();

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  const [assets, error] = useAssets([
    require("./assets/iphone-preview.png"),
    require("./assets/ios.png"),
    require("./assets/adaptive.png"),
  ]);

  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return assets ? (
      <AnimatedAppLoader image={require("./assets/iphone-preview.png")}>
        <MainScreen />
      </AnimatedAppLoader>
    ) : (
      <View>
        <Text>an error occurred</Text>
      </View>
    );
  }
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);

  const startAsync = useCallback(
    // If you use a local image with require(...), use `Asset.fromModule`
    () => Asset.fromModule(image).downloadAsync(),
    [image]
  );

  const onFinish = useCallback(() => setSplashReady(true), []);

  if (!isSplashReady) {
    return (
      <AppLoading
        // Instruct SplashScreen not to hide yet, we want to do this manually
        autoHideSplash={false}
        startAsync={startAsync}
        onError={console.error}
        onFinish={onFinish}
      />
    );
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);
  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}
// app entry point

// change default transition for android

//Login screen
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="gettingStarted"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerBackImage: () => <BackIcon width={25} height={17} />,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: colors.primaryColor,
          fontSize: 24,
          fontFamily: fonts.semiBold,
          lineHeight: 30,
        },
        headerShadowVisible: false, // applied here
        headerBackTitleVisible: false,
        headerStyle: {
          height: 150,
        },
      }}
    >
      <Stack.Screen
        name="gettingStarted"
        component={GetStarted}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen
        name="Completed"
        options={{ headerShown: false }}
        component={Completed}
      />
      <Stack.Screen
        name="Account Type"
        options={{ headerShown: false }}
        component={SelectAccountType}
      />
      <Stack.Screen
        name="Select Interest"
        options={{ headerShown: false }}
        component={SelectInterest}
      />
      <Stack.Screen name="LOGIN" component={Login} />
      <Stack.Screen name="FORGOT PASSWORD" component={ForgetPassword} />
      <Stack.Screen name="OTP VERIFICATION" component={Otpverification} />
      <Stack.Screen name="RESET PASSWORD" component={NewPassword} />
      <Stack.Screen name="SIGN UP" component={SignUp} />
    </Stack.Navigator>
  );
};

// userAuthenticatedscreens
const UserAuthScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="gettingStarted"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerBackImage: () => <BackIcon width={25} height={17} />,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: colors.primaryColor,
          fontSize: 32,
          fontFamily: fonts.semiBold,
          lineHeight: 40,
        },
        headerShadowVisible: false, // applied here
        headerBackTitleVisible: false,
        headerStyle: {
          height: 150,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Tabs}
      />
    </Stack.Navigator>
  );
};

const MyStackDrawer = () => {
  return <SideDrawer item={UserAuthScreen} />;
};

const ScreenSet = () => {
  const { globalState } = useGlobalContext();
  if (globalState.isLoading) {
    //wait for token to instantiate
    return <AppLoading />;
  }
  return (
    <>
      {globalState.userToken && globalState.userData ? (
        <MyStackDrawer />
      ) : (
        <AppNavigator />
      )}
    </>
  );
};

// main application entry point

function MainScreen({ fonts }) {
  return (
    <GlobalProvider initialState={initialState} reducer={userLoginReducer}>
      <AxiosProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <ScreenSet />
          </NavigationContainer>
        </PaperProvider>
      </AxiosProvider>
    </GlobalProvider>
  );
}
