import { FlatList, StatusBar } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

/*
    Navigation a special prop provided by react-navigation which are configured
    using the package
*/
const CategoriesScreen = ({ navigation }) => {
  const renderCategoryItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate(
        "MealsOverview",
        // to pass params as part of the navigation
        {
          categoryId: itemData.item.id,
        }
      );
    };

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#351401" />
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        // to divide the list based on no of columns
        numColumns={2}
      />
    </>
  );
};

export default CategoriesScreen;
