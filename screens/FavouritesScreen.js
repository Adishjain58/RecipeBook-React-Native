// import { useContext } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
// import { FavouritesContext } from "../store/context/favourites-context";

const FavouritesScreen = () => {
  //   const favMealsContext = useContext(FavouritesContext);
  const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);

  const favouriteMeals = MEALS.filter((meal) =>
    // for context
    // favMealsContext.ids.includes(meal.id)
    favouriteMealIds.includes(meal.id)
  );
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#351401" />
      {favouriteMeals.length == 0 ? (
        <View style={styles.rootContainer}>
          <Text style={styles.text}>You have no favourite meals yet</Text>
        </View>
      ) : (
        <MealsList items={favouriteMeals} color={"#351401"} />
      )}
    </>
  );
};
export default FavouritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
