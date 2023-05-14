import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddToFavouritesContext = createContext();

export function AddToFavouritesContextProvider({ children }) {
  const favouritesListFromStorage = localStorage.getItem("list");

  const [favouritesList, setFavouritesList] = useState(
    favouritesListFromStorage === null || undefined
      ? []
      : JSON.parse(favouritesListFromStorage)
  );

  const addToFavourites = (value) => {
    const filteredData = favouritesList.filter((each) => {
      return each.id === value?.id;
    });
    if (filteredData.length === 0) {
      setFavouritesList([...favouritesList, value]);
      localStorage.setItem("list", JSON.stringify([...favouritesList, value]));
      toast.success("Location Added to Favourites");
    }
  };

  const deleteLocationFromFavourites = (value) => {
    const filteredData = favouritesList.filter((each) => {
      return each.id !== value?.id;
    });
    setFavouritesList(filteredData);
    localStorage.setItem("list", JSON.stringify(filteredData));
    toast.success("Location Removed from Favourites");
  };
  return (
    <AddToFavouritesContext.Provider
      value={{
        favouritesList,
        addToFavourites,
        deleteLocationFromFavourites,
      }}
    >
      {children}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </AddToFavouritesContext.Provider>
  );
}

export default AddToFavouritesContext;
