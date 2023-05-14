import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import "./LeftSideBar.css";
import AddToFavouritesContext from "../../context/AddToFavouritesContext";

const LeftSideBar = () => {
  const { favouritesList, deleteLocationFromFavourites } = useContext(
    AddToFavouritesContext
  );

  return (
    <div className="left-side-bar-main-bg">
      <h3 className="text-center">Favourite Locations</h3>

      <ul
        className={`favourite-list ${
          favouritesList.length === 0 && "text-center"
        }`}
      >
        {favouritesList.length === 0 ? (
          <span>No Favourites here</span>
        ) : (
          favouritesList.map((each) => {
            return (
              <li key={each.id} className="favourite-item">
                <div>
                  <p>Name: {each.id}</p>
                  <p>Temperature: {each?.data?.main.temp}</p>
                </div>
                <AiOutlineDelete
                  onClick={() => deleteLocationFromFavourites(each)}
                  className="delete"
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default LeftSideBar;
