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
				stationBikeAvailable: data[i].available_bikes,
				stationBanking: data[i].banking
			});

			marker.addListener("click", function() {

				let stationNameFull = marker.stationName;
				let stationNameCut = stationNameFull.split('-');
				document.getElementById("station-name").innerHTML = stationNameCut[1];

				if (marker.stationStatus == 'OPEN') {
					document.getElementById("station-status").innerHTML = 'ouverte';
					document.getElementById("station-status").className = 'station-open';
				} else if (marker.stationStatus == 'CLOSE') {
					document.getElementById("station-status").innerHTML = 'fermée';
					document.getElementById("station-status").className = 'station-close';
				} 

				if (marker.stationBanking == 'true') {
					document.getElementById("station-banking").style.color = "green";
				} else if (marker.stationBanking == 'false') {
					document.getElementById("station-banking").style.color = "red";
				}

				document.getElementById("station-address").innerHTML = marker.stationAddress;
				document.getElementById("station-available-bike").innerHTML = marker.stationBikeAvailable;
				document.getElementById("station-total-stand").innerHTML = marker.stationTotalStand;
				document.getElementById('info-container').style.width = "300px";
				document.getElementById('station-details').style.display = "block";
				});

			let closeStatus;
			if (document.getElementById('info-container').style.width == "0px") {
				let closeStatus = 0;
			} else if (document.getElementById('info-container').style.width == "300px") {
				let closeStatus = 1;
			}
			console.log(closeStatus);
			
		}
	});

	ajax.send();
}
