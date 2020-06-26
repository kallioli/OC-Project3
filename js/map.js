class bikeMap {
	
	constructor (nameDiv,nbMarker){
		this.url = 'https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=bc73101ff7dfe7125859e4a2dc3f0c0bc3921294';
		this.i;
		this.map;
		this.initMap(nameDiv,nbMarker);
		this.icon;
		this.activeReservation = sessionStorage.getItem('activeReservation');
		this.greenIcon = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
		this.redIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
		this.orangeIcon = 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png';
	}
	
	// Function that manage stations informations from JCDecaux API and display them on map section  
	addinfoMarker(vlat,vlng,map,stationId,stationName,stationAddress,stationStatus,stationTotalStand,stationStandAvailable,stationBikeAvailable,stationBanking,icon) {
		let marker = new google.maps.Marker({
			position: {lat: vlat, lng: vlng},
			map: map,
			icon: icon,
			stationId: stationId,
			stationNameFull: stationName,
			stationAddress: stationAddress,
			stationStatus: stationStatus,
			stationTotalStand: stationTotalStand,
			stationStandAvailable: stationStandAvailable,
			stationBikeAvailable: (stationId == sessionStorage.getItem('stationId')) ? stationBikeAvailable - 1 : stationBikeAvailable,
			stationBanking: stationBanking
		});
		window.myGlobalVariables.markers[marker.stationId] = marker;

		// Event management when click on markers
		google.maps.event.addListener(marker,'click', (e)=> {
			window.myGlobalVariables.stationId = marker.stationId;
			marker.stationName = marker.stationNameFull.split('-');
			marker.stationName.shift();
			document.getElementById('station-name').innerHTML = marker.stationName.join('-');
	
			if (marker.stationStatus == 'OPEN') {
				document.getElementById('station-status').innerHTML = 'ouverte';
				document.getElementById('station-status').className = 'station-open';
			} else if (marker.stationStatus == 'CLOSE') {
				document.getElementById('station-status').innerHTML = 'fermée';
				document.getElementById('station-status').className = 'station-close';
			}
			
			// Check if card payment option is available on station
			this.banking = marker.stationBanking;
			if (this.banking) {
				document.getElementById('station-banking').style.color = 'black';
			} else if (!this.banking) {
				document.getElementById('station-banking').style.color = 'grey';
			}
	
			document.getElementById('station-address').innerHTML = marker.stationAddress;
			document.getElementById('station-available-bike').innerHTML = marker.stationBikeAvailable;
			document.getElementById('station-total-stand').innerHTML = marker.stationTotalStand;
			document.getElementById('info-container').style.width = '300px';
			document.getElementById('station-details').style.display = 'block';

			// Check if there is a suficient number of bike in station for a new reservation
			if (marker.stationBikeAvailable == 0) {
				document.getElementById('station-btn').className = 'station-btn-reserve-disable';
				document.getElementById('canvas-section').style.display = 'none';
			} else {
				document.getElementById('station-btn').className = 'station-btn-reserve';
			}

			// Check if there is an active reservation on session storage API and lock the application to prevent a new reservation
			if (this.activeReservation) {
				document.getElementById('station-btn').className = 'station-btn-reserve-disable';
				document.getElementById('alert-active-reservation').style.display = 'block';
			} else {
				document.getElementById('station-btn').className = 'station-btn-reserve';
			}
			
		});
		
		// Display station informations
		document.getElementById('close').addEventListener('click', (e)=> {
			document.getElementById('info-container').style.width = '0px';
			document.getElementById('station-details').style.display = 'none';
		});
	
		document.getElementById('station-btn').addEventListener('click', (e)=> {
			document.getElementById('canvas-section').style.display = 'block';
		});
	
	};
	
	// Function that initiate the google map and add markers on this
	initMap(nameDiv,nbMarker) {
		this.map = new google.maps.Map(document.getElementById(nameDiv), {
			zoom: 14,
			center: {lat: 47.2173, lng: -1.5534}
		});
		// AJAX request from JCDecaux API  
		this.ajax = new XMLHttpRequest();
		this.ajax.open('GET',this.url,true);
		this.ajax.addEventListener('load', ()=>{
			this.data = JSON.parse(this.ajax.responseText);
			if (nbMarker == -1){
				nbMarker = this.data.length;
			}
			for (this.i=0; this.i < nbMarker ; this.i++){
				if (this.data[this.i].available_bikes > 10) {
					this.icon = this.greenIcon;
				} else if (this.data[this.i].available_bikes <= 0) {
					this.icon = this.redIcon;
				} else {
					this.icon = this.orangeIcon;
				}
				this.addinfoMarker(	this.data[this.i].position.lat,this.data[this.i].position.lng,this.map,this.data[this.i].number,this.data[this.i].name,this.data[this.i].address,this.data[this.i].status,
				this.data[this.i].bike_stands,this.data[this.i].available_bike_stands,this.data[this.i].available_bikes,this.data[this.i].banking,this.icon);
			}
		});

	this.ajax.send();

	}

}