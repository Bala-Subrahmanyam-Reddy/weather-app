import React, { useContext, useEffect, useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { FaTemperatureHigh } from 'react-icons/fa';
import {
  BsFillSunriseFill,
  BsFillSunsetFill,
  BsStarFill,
  BsStar,
} from 'react-icons/bs';
import { WiHumidity } from 'react-icons/wi';
import { MdCalendarToday, MdVisibility } from 'react-icons/md';
import { GiWhirlwind } from 'react-icons/gi';

import moment from 'moment';
import AddToFavouritesContext from '../../context/AddToFavouritesContext';

const ForeCast = ({ forecastResult, weatherData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { addToFavourites, favouritesList } = useContext(
    AddToFavouritesContext
  );
  const findLocationInFavouritesList = (name) => {
    const filteredLocation = favouritesList.filter((each) => {
      return each.id === name;
    });
    return filteredLocation.length === 0 ? false : true;
  };

  return (
    <div>
      <div className='head'>
        <h4>Today's Highlights</h4>
        <button
          onClick={() =>
            addToFavourites({
              id: weatherData?.name,
              data: weatherData,
            })
          }
          className='star-btn'
        >
          {findLocationInFavouritesList(weatherData?.name) === true ? (
            <span>
              Added <BsStarFill color='#ffc003' />
            </span>
          ) : (
            <span>
              {' '}
              Add to favourite <BsStar />
            </span>
          )}
        </button>
      </div>
      <div className='boxes'>
        <div className='box_info'>
          <span className='type-info'>Name & Date</span>
          <div className='flex-box'>
            <BiCurrentLocation className='icon' />
            <span className='info-text'>
              <span>{weatherData?.name}</span>
            </span>
            <br />
            <MdCalendarToday className='icon' />
            <span className='info-text'>
              <span>
                {moment().format('dddd')} {'  '}
              </span>
              <span>{moment().format('LL')}</span>
            </span>
          </div>
        </div>
        <div className='box_info'>
          <span className='type-info'>Wind & Visibility</span>
          <div className='flex-box'>
            <GiWhirlwind className='icon' />
            <span className='info-text'>{weatherData?.wind?.speed} Kmph</span>
            <br />
            <MdVisibility className='icon' />
            <span className='info-text'>
              <span> {(weatherData?.visibility / 1000).toFixed(1)} Kms</span>
            </span>
          </div>
        </div>
        <div className='box_info'>
          <span className='type-info'>Temperature & Humidity</span>
          <div className='flex-box'>
            <FaTemperatureHigh className='icon' />
            <span className='info-text'>
              <span>{weatherData?.main?.temp} &deg;C</span>
            </span>
            <br />
            <WiHumidity className='icon' />
            <span className='info-text'>
              <span>{weatherData?.main?.humidity}</span>%
            </span>
          </div>
        </div>
        <div className='box_info'>
          <span className='type-info'>Sunrise & Sunset</span>
          <div className='flex-box'>
            <BsFillSunriseFill className='icon' />
            <span className='info-text'>
              {new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString(
                'en-IN'
              )}
            </span>
            <br />
            <BsFillSunsetFill className='icon' />
            <span className='info-text'>
              {new Date(weatherData?.sys?.sunset * 1000).toLocaleTimeString(
                'en-IN'
              )}
            </span>
          </div>
        </div>
      </div>
      <div className='Tabs'>
        <div>
          <button
            className={`tabs-btn ${activeTab === 0 && 'active-tab'}`}
            onClick={() => setActiveTab(0)}
          >
            Today
          </button>
          <button
            className={`tabs-btn ${activeTab === 1 && 'active-tab'}`}
            onClick={() => setActiveTab(1)}
          >
            Week
          </button>
        </div>
      </div>
      <hr />
      {activeTab === 0 ? (
        <ul className='forecast-list'>
          {forecastResult.hourly.map((eachHourData, index) => {
            return (
              <li key={index} className='forecast-list-item'>
                <span>
                  {' '}
                  {new Date(eachHourData.dt * 1000).toLocaleTimeString(
                    'en-IN',
                    { hour: 'numeric', minute: 'numeric', hour12: true }
                  )}
                </span>
                <img
                  alt={`${eachHourData?.weather[0]?.icon + index}`}
                  src={` https://openweathermap.org/img/wn/${eachHourData?.weather[0]?.icon}@2x.png`}
                />
                <span>{eachHourData.temp} &deg;C</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className='forecast-list'>
          {forecastResult?.daily.map((eachDailyData, index) => {
            return (
              <li key={`Daily${index}`} className='forecast-list-item'>
                <span>
                  {' '}
                  {new Date(eachDailyData.dt * 1000).toLocaleString('en-IN', {
                    weekday: 'long',
                  })}
                </span>
                <img
                  alt={`${eachDailyData?.weather[0]?.icon + index}`}
                  src={` https://openweathermap.org/img/wn/${eachDailyData?.weather[0]?.icon}@2x.png`}
                />
                <span>{eachDailyData.temp?.day} &deg;C</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ForeCast;
