const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

const GetWeatherBasedOnSearch = async (value) => {
  return await fetch(
    `${API_URL}/weather?q=${value}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((result) => {
      if (result?.cod === "404") {
        return {
          hasError: true,
          data: result,
        };
      }
      return { hasError: false, data: result };
    });
};

const GetWeatherBasedOnLocation = async (latitude, longitude) => {
  return await fetch(
    `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};

const GetWeatherBasedOnLocationOneCall = async (latitude, longitude) => {
  return await fetch(
    `${API_URL}/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=bf6d25276d71c592a1ce7c6cc14417a6&units=metric`
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};

export {
  GetWeatherBasedOnSearch,
  GetWeatherBasedOnLocation,
  GetWeatherBasedOnLocationOneCall,
};
