import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import Subtitle from "../components/MealDetail/Subtitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from "../data/dummy-data";
// import { FavouritesContext } from "../store/context/favourites-context";
import { addFavourite, removeFavourite } from "../store/redux/favouritesSlice";

const MealDetailsScreen = () => {
  // to get access to our context
  //   const favouriteMealsContext = useContext(FavouritesContext);
  const favouriteMealsIds = useSelector((state) => state.favouriteMeals.ids);
  const dispatch = useDispatch();

  const route = useRoute();
  const navigation = useNavigation();
  const color = route.params.color;
  const forGroundColor = color === "#351401" ? "white" : "black";
  const mealId = route.params.mealId;
  const meal = MEALS.find((meal) => meal.id === mealId);

  //   const mealIsFavourite = favouriteMealsContext.ids.includes(mealId);
  const mealIsFavourite = favouriteMealsIds.includes(mealId);

  const changeFavouriteStatusHandler = () => {
    if (mealIsFavourite) {
      //   favouriteMealsContext.removeFavourite(mealId);
      dispatch(removeFavourite({ id: mealId }));
    } else {
      //   favouriteMealsContext.addFavourite(mealId);
      dispatch(addFavourite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: color },
      headerTintColor: forGroundColor,
      title: meal.title,
      // to add a button to screen header
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavourite ? "star" : "star-outline"}
            color={forGroundColor}
            onPress={changeFavouriteStatusHandler}
          />
        );
      },
    });
  }, [color, mealId, navigation, changeFavouriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: meal.imageUrl }} />
      <Text style={styles.title}> {meal.title}</Text>
      <MealDetails
        duration={meal.duration}
        complexity={meal.complexity}
        affordability={meal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={meal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={meal.steps} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
