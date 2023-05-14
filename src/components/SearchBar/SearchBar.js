import React, { useState } from 'react';
import './SearchBar.css';
import { BiCurrentLocation } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import {
  GetWeatherBasedOnLocationOneCall,
  GetWeatherBasedOnSearch,
} from '../../Services/Service';
import ForeCast from '../ForeCast/ForeCast';
import { toast } from 'react-toastify';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState({
    hasError: false,
    data: {},
  });
  const [forecastResult, setForeCastResult] = useState({});

  const search = async (evt) => {
    if (evt.key === 'Enter') {
      const result = await GetWeatherBasedOnSearch(query);
      setWeatherData({
        data: result.data,
        hasError: result.hasError,
      });
      if (!result.hasError) {
        const _forecastResult = await GetWeatherBasedOnLocationOneCall(
          result?.data?.coord?.lat,
          result?.data?.coord?.lon
        );
        setForeCastResult(_forecastResult);
      } else {
        setForeCastResult({});
        toast.info('City Not Found');
      }
      setQuery('');
    }
  };

  return (
    <div>
      <div className='mt-1 pt-1 input-group mb-3'>
        <span className='input-group-text border border-primary'>
          <BiCurrentLocation />
        </span>
        <input
          type='text'
          className='form-control border border-primary'
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}
          placeholder='Enter city name'
        />
        <span className='input-group-text border border-primary'>
          <BsSearch />
        </span>
      </div>

      <div
        className={`search-bg ${
          Object.keys(forecastResult).length === 0 && 'text-center'
        }`}
      >
        {weatherData?.hasError ? (
          <span className='search-bg-error'>{weatherData.data?.message}</span>
        ) : (
          ''
        )}
        {query.length === 0 ? <h2>Enter city to find weather</h2> : ''}
      </div>

      {Object.keys(forecastResult).length > 0 ? (
        <ForeCast
          forecastResult={forecastResult}
          weatherData={weatherData?.data}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default SearchBar;
