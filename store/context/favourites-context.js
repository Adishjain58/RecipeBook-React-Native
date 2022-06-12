import { createContext, useState } from "react";

// to create the context
export const FavouritesContext = createContext({
  ids: [],
  addFavourite: (id) => {},
  removeFavourite: (id) => {},
});

// A wrapper component to manage the state and put all required details in this component
// finally return the context Provider
const FavouritesContextProvider = ({ children }) => {
  // State to store the favourites
  const [favouriteMealIds, setfavouriteMealIds] = useState([]);

  const addFavourite = (id) => {
    setfavouriteMealIds((currentFavMealIds) => [...currentFavMealIds, id]);
  };

  const removeFavourite = (id) => {
    setfavouriteMealIds((currentFavMealIds) =>
      currentFavMealIds.filter((favMealId) => favMealId !== id)
    );
  };

  const value = {
    ids: favouriteMealIds,
    addFavourite,
    removeFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
