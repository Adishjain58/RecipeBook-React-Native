// import { StatusBar } from "expo-status-bar";
import { StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
// for context
// import FavouritesContextProvider from "./store/context/favourites-context";
import { Provider } from "react-redux";
import { store } from "./store/redux/store";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

// for nested different type of navigation
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: {
          backgroundColor: "#3f2f25",
        },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          // to add an icon in the navigator
          drawerIcon: ({ size, color }) => {
            return <Ionicons color={color} size={size} name="list" />;
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          drawerIcon: ({ size, color }) => {
            return <Ionicons color={color} size={size} name="star" />;
          },
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* for context */}
      {/* <FavouritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          {/* initialRouteName="MealsCategories" to set the default screen when app loads
          otherwise the screen that comes first as Stack.Screen will be considered the
          default screen
        */}
          <Stack.Navigator
            // to set styles which shpuld be applied to all the screens
            screenOptions={{
              headerStyle: { backgroundColor: "#351401" },
              headerTintColor: "white",
              contentStyle: {
                backgroundColor: "#3f2f25",
              },
            }}
            initialRouteName="MealsCategories"
          >
            {/* We can pass another Navigator setup as a screen in another type of navigator */}
            <Stack.Screen
              name="MealsCategories"
              component={DrawerNavigator}
              // to apply styles which are specific to a screen
              options={{
                // to disable the header of one navigator as we have multiple
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // we can also pass a function to the options prop to set options dynamically
              // options={({ navigation, route }) => {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavouritesContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
