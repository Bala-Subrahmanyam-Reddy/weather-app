import LandingPage from './components/LandingPage/LandingPage';
import './App.css';
import { Route, Routes, NavLink } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import { AddToFavouritesContextProvider } from './context/AddToFavouritesContext';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Header />
      <AddToFavouritesContextProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/search' element={<SearchBar />} />
        </Routes>
      </AddToFavouritesContextProvider>
    </>
  );
}

export default App;
