// Hook which provide direct access to the route prop
import { useRoute } from "@react-navigation/native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import { useLayoutEffect, useState } from "react";
import MealsList from "../components/MealsList/MealsList";
import { StatusBar } from "react-native";

/*
    We also get a route prop in any component which is registered as a screen
*/
const MealsOverviewScreen = ({ route, navigation }) => {
  const [color, setColor] = useState(null);
  // to use the useRoute hook this will return an object
  // const routes=useRoute();
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const category = CATEGORIES.find((category) => category.id == catId);
    setColor(category.color);
    // to set screen options from the screen itself
    navigation.setOptions({
      title: category.title,
      headerStyle: { backgroundColor: category.color },
      headerTintColor: "black",
    });
  }, [catId, navigation]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={color} />
      <MealsList items={displayedMeals} color={color} />
    </>
  );
};

export default MealsOverviewScreen;
