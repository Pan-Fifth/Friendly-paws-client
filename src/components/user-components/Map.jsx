import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import Logo from '../../assets/Logo-navbar2.png'

const logo = Logo

const logoIcon = new L.Icon({
  iconUrl: logo,
  iconSize: [80, 60],
});


const ZoomToMarker = ({ position, setShowButton }) => {
  const map = useMap();

  const handleZoom = () => {
    map.flyTo(position, 18, { duration: 2 });
    setShowButton(false);
  };


  useMapEvents({
    moveend: () => {
      const currentCenter = map.getCenter();
      const distance = map.distance(currentCenter, position);
      if (distance > 1000) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    },
  });

  return (
    <Marker position={position} icon={logoIcon} eventHandlers={{ click: handleZoom }}>
      <Popup>FRIENDLY PAWS</Popup>
      <Tooltip>FRIENDLY PAWS</Tooltip>
    </Marker>
  );
};

const Map = ({ defaultPosition = [13.7583128, 100.4525691] }) => {  // ใช้ตำแหน่งที่ปรับเป็น 13.7583128, 100.4525691
  const mapRef = useRef();
  const [showButton, setShowButton] = useState(false);

  const defaultZoom = 18;  // ตั้งค่า Zoom เป็น 18 เพื่อให้ชัดเจนขึ้น


  const backToMarker = () => {
    const map = mapRef.current;
    if (map) {
      map.flyTo(defaultPosition, 18, { duration: 2 });
    }
  };

  return (
    <div className="h-[500px] shadow-2xl rounded-lg relative">
      <MapContainer
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
        center={defaultPosition}  // ตั้งค่า default location
        zoom={defaultZoom}
        className='relative z-[1]'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomToMarker position={defaultPosition} setShowButton={setShowButton} />
      </MapContainer>

      {showButton && (
        <button className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg z-10 hover:bg-yellow-600"
          onClick={backToMarker}>  FRIENDLY PAWS </button>
      )}
    </div>
  );
};

export default Map;
