// Get the necessary DOM elements
const pointAInput = document.getElementById('pointA');
const pointBInput = document.getElementById('pointB');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');

// Event listener for the Calculate button
calculateBtn.addEventListener('click', () => {
  const pointA = pointAInput.value.trim();
  const pointB = pointBInput.value.trim();

  if (pointA === '' || pointB === '') {
    resultDiv.textContent = 'Please enter both points';
    return;
  }

  const distance = calculateDistance(pointA, pointB);
  resultDiv.textContent = `Distance: ${distance.toFixed(2)} km`;
});

// Function to calculate the air distance between two points
function calculateDistance(pointA, pointB) {
  const [latA, lonA] = pointA.split(',').map(Number);
  const [latB, lonB] = pointB.split(',').map(Number);

  const earthRadius = 6371; // in kilometers
  const latDiff = toRad(latB - latA);
  const lonDiff = toRad(lonB - lonA);
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(toRad(latA)) * Math.cos(toRad(latB)) * Math.sin(lonDiff / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

// Function to convert degrees to radians
function toRad(degrees) {
  return degrees * (Math.PI / 180);
}
