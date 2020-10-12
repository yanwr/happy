import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import pointMapperIcon from '../../assets/icon-point-mapper.svg';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './styles.css';

export default function DashboardPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ? process.env.REACT_APP_GOOGLE_API_KEY : "",
    libraries: ["places"]
  });
  const screenWidth = useWindowWidth();

  return (
    <div id="dashboard-page-container">
      <aside>
        <header>
          <img src={pointMapperIcon} alt="Happy Icon" />
          <h2>Choose an orphanage on the map</h2>
          <p>Many children are waiting for your visit.</p>
        </header>
        <footer>
          <strong>Florianópolis</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>
      <main>
        {
          loadError 
            ? null : !isLoaded 
              ? <div>Loading Google Maps ...</div>
              : <GoogleMap
                  options={{
                    disableDefaultUI: true,
                  }}
                  mapContainerStyle={{ width: screenWidth - 440, height: '100%'}}
                  zoom={14.5}
                  center={{ lat: -27.5768545, lng: -48.5163647 }}
              >
              </GoogleMap>
        }
      </main>
      <Link to="" className="btn-create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};

function useWindowWidth() {
  const [width, setWidth] = useState(window.screen.width);
  useEffect(() => {
    function handleResize() {
      setWidth(window.screen.width);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};