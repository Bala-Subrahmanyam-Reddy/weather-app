import React, { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import "./RightSideBar.css";
import {
  GetWeatherBasedOnLocation,
  GetWeatherBasedOnLocationOneCall,
} from "../../Services/Service";
import { toast } from "react-toastify";
import ForeCast from "../ForeCast/ForeCast";

function RightSideBar() {
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0,
    locationAccess: false,
  });
  const [weatherData, setWeatherData] = useState({});
  const [forecastResult, setForeCastResult] = useState({});

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(permissions);
  }, []);

  const showPosition = async (position) => {
    setCoordinates({
      lat: position.coords.latitude,
      long: position.coords.longitude,
      locationAccess: true,
    });
    const result = await GetWeatherBasedOnLocation(
      position.coords.latitude,
      position.coords.longitude
    );
    const forecastResult = await GetWeatherBasedOnLocationOneCall(
      position.coords.latitude,
      position.coords.longitude
    );
    setWeatherData(result);
    setForeCastResult(forecastResult);
  };

  const locationPositionError = (error) => {
    if (error.message === "User denied Geolocation")
      setCoordinates({
        lat: 0,
        locationAccess: false,
        long: 0,
      });
    toast.warn("Please Enable Location");
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      showPosition,
      locationPositionError,
      { enableHighAccuracy: true, maximumAge: 10000 }
    );
  };

  const permissions = (permission) => {
    if (permission.state === "granted") {
      navigator.geolocation.getCurrentPosition(showPosition);
      toast.success("Location Granted");
    } else {
      setCoordinates({
        lat: 0,
        long: 0,
        locationAccess: false,
      });
      toast.warn("Please Enable Location");
    }
  };

  return (
    <div
      className={`${
        Object.keys(weatherData).length > 0 ? "" : "loading"
      } right-side-bar-main-bg`}
    >
      {coordinates.locationAccess ? (
        Object.keys(weatherData).length > 0 ? (
          <div>
            <ForeCast
              forecastResult={forecastResult}
              weatherData={weatherData}
            />
          </div>
        ) : (
          <>
            <div className="spinner-grow" role="status"></div>
          </>
        )
      ) : (
        <button onClick={() => getLocation()} className="location-button">
          Pick My Current Location <BiCurrentLocation />
        </button>
      )}
    </div>
  );
}

export default RightSideBar;
