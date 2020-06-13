let map;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: {lat: 47.2173, lng: -1.5534}
    });
    let mapFull = new bikeMap(map);
  }