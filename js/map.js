let url = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=bc73101ff7dfe7125859e4a2dc3f0c0bc3921294";

function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 14,
		center: {lat: 47.2173, lng: -1.5534}
	});
	 
	let ajax = new XMLHttpRequest();
	ajax.open("GET",url,true);
	ajax.addEventListener("load", ()=>{
		let data = JSON.parse(ajax.responseText);
		console.log(data);
    	for (let i=0; i<data.length; i++){
			let marker = new google.maps.Marker({
				position: {lat: data[i].position.lat, lng: data[i].position.lng},
				map: map,
				stationId: data[i].number,
				stationName: data[i].name,
				stationAddress: data[i].address,
				stationStatus: data[i].status,
				stationTotalStand: data[i].bike_stands,
				stationStandAvailable: data[i].available_bike_stands,
				stationBikeAvailable: data[i].available_bikes
			});

			marker.addListener("click", function() {
				document.getElementById("station-name").innerHTML = marker.stationName;
				document.getElementById("station-status").innerHTML = marker.stationStatus;
				document.getElementById("station-address").innerHTML = marker.stationAddress;
				document.getElementById("station-available-bike").innerHTML = marker.stationBikeAvailable;
				document.getElementById("station-total-stand").innerHTML = marker.stationTotalStand;
				});
		}
	});

	ajax.send();
}
