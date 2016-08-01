"use strict"; // eslint-disable-line

const mapContainer = document.getElementById(`map`);
let map;

function createRestaurauntMarker(restaurant) {
  console.log(`Create marker for ${ restaurant.name }`);

  new google.maps.Marker({
    position: {
      lat: parseFloat(restaurant.loc.lat),
      lng: parseFloat(restaurant.loc.lng)
    },
    map: map,
    title: restaurant.name
  });
}

function parseRestaurants() {
  console.log(`Ready state: ${ this.readyState }`);
  if (this.readyState !== this.DONE) { return; }

  console.log(`Status: ${ this.status }`);

  if (this.status !== 200) {
    return alert(`Failed to load`);
  }

  const restaurants = JSON.parse(this.responseText);

  console.log(`Got restaurants`);

  restaurants.forEach(createRestaurauntMarker);
}

function loadRestaurants() {
  console.log(`load restaurants`);
  const request = new XMLHttpRequest();

  request.onreadystatechange = parseRestaurants;

  request.open(`GET`, `http://localhost:3000/restaurant`);
  request.send();

  console.log(`request sent`);
}

function geoSuccess(position) {
  console.log(`geoSuccess`);
  let geoPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  map = new google.maps.Map(
    mapContainer,
    {
      center: geoPosition,
      zoom: 15
    }
  );

  console.log(`map created`);

  loadRestaurants();
}

function geoFail(error) {
  alert(`Failed to get location`);
}

navigator.geolocation.getCurrentPosition(
  geoSuccess,
  geoFail,
  {}
);
