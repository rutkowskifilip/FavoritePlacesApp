import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AllPlaces } from "./screens/AllPlaces";
import { AddPlace } from "./screens/AddPlace";
import { Map } from "./screens/Map";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import * as SplashScreen from "expo-splash-screen";

//import * as React from "react";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import AppLoading from "expo-app-loading";
import { PlaceDetails } from "./screens/PlaceDetails";
const Stack = createNativeStackNavigator();
export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!dbInitialized) {
    SplashScreen.preventAutoHideAsync();
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  color={tintColor}
                  size={24}
                  icon="add"
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add a new place" }}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{ title: "Loading place..." }}
          />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
