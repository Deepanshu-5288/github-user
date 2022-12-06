import React from 'react';
import { Info, Navbar, Repos, Search, User,  } from '../components';
import { useGlobalContext } from '../context/context';
import loadingImage from "../imgaes/preloader.gif";
function Dashboard() {
    const {isLoading} = useGlobalContext();
    if (isLoading) {
      return (
        <main>
          <Navbar />
          <Search />
          <img src={loadingImage} className='loading-img' alt='loading' />
        </main>
      );
    }
  return (
    <main>
        <Navbar />
        <Search />
        <Info />
        <User />
        <Repos />
        
    </main>
  )
}

export default Dashboard