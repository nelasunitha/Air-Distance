import React, { useState } from 'react';

function App() {
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  const [distance, setDistance] = useState('');

  const calculateDistance = () => {
    const [latitudeA, longitudeA] = pointA.split(',');
    const [latitudeB, longitudeB] = pointB.split(',');

    const latA = parseFloat(latitudeA);
    const lonA = parseFloat(longitudeA);
    const latB = parseFloat(latitudeB);
    const lonB = parseFloat(longitudeB);

    if (isNaN(latA) || isNaN(lonA) || isNaN(latB) || isNaN(lonB)) {
      alert('Please enter valid latitude and longitude values for both points.');
      return;
    }

    const distanceInKm = calculateAirDistance(latA, lonA, latB, lonB);
    setDistance(distanceInKm.toFixed(2) + 'km');
  };

  const calculateAirDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const degToRad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="App">
      <h1>Air Distance Calculator</h1>
      <div>
        <label htmlFor="pointA">Point A (Latitude, Longitude):</label>
        <input type="text" id="pointA" value={pointA} onChange={(e) => setPointA(e.target.value)} />
      </div>
      <div>
        <label htmlFor="pointB">Point B (Latitude, Longitude):</label>
        <input type="text" id="pointB" value={pointB} onChange={(e) => setPointB(e.target.value)} />
      </div>
      <button onClick={calculateDistance}>Calculate</button>
      {distance && <p>Distance: {distance}</p>}
    </div>
  );
}

export default App;
