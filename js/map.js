class bikeMap {
	
	constructor (nameDiv,nbMarker){
		this.url = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=bc73101ff7dfe7125859e4a2dc3f0c0bc3921294";
		this.i;
		this.map;
		this.initMap(nameDiv,nbMarker);
		this.icon;
		this.greenIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
		this.redIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
		this.orangeIcon = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
	}
	
	addinfoMarker(vlat,vlng,map,stationId,stationName,stationAddress,stationStatus,stationTotalStand,stationStandAvailable,stationBikeAvailable,stationBanking,icon){
		let marker = new google.maps.Marker({
			position: {lat: vlat, lng: vlng},
			map: map,
			icon: icon,
			stationId: stationId,
			stationName: stationName,
			stationAddress: stationAddress,
			stationStatus: stationStatus,
			stationTotalStand: stationTotalStand,
			stationStandAvailable: stationStandAvailable,
			stationBikeAvailable: stationBikeAvailable,
			stationBanking: stationBanking
		});
			
		google.maps.event.addListener(marker,"click", (e)=> {

			marker.stationName = marker.stationName.split('-');
			document.getElementById("station-name").innerHTML = marker.stationName[1];
	
			if (marker.stationStatus == 'OPEN') {
				document.getElementById("station-status").innerHTML = 'ouverte';
				document.getElementById("station-status").className = 'station-open';
			} else if (marker.stationStatus == 'CLOSE') {
				document.getElementById("station-status").innerHTML = 'fermée';
				document.getElementById("station-status").className = 'station-close';
			}
	
			this.banking = marker.stationBanking;
			if (this.banking) {
				document.getElementById("station-banking").style.color = "black";
			} else if (!this.banking) {
				document.getElementById("station-banking").style.color = "grey";
			}
	
			document.getElementById("station-address").innerHTML = marker.stationAddress;
			document.getElementById("station-available-bike").innerHTML = marker.stationBikeAvailable;
			document.getElementById("station-total-stand").innerHTML = marker.stationTotalStand;
			document.getElementById('info-container').style.width = "300px";
			document.getElementById('station-details').style.display = "block";
		});
	
		document.getElementById("close").addEventListener('click', (e)=> {
		document.getElementById('info-container').style.width = "0px";
		document.getElementById('station-details').style.display = "none";
		});
	
		document.getElementById("station-btn").addEventListener('click', (e)=> {
		document.getElementById("canvas-section").style.display = "block";
	});
		
}

	initMap(nameDiv,nbMarker) {
		this.map = new google.maps.Map(document.getElementById(nameDiv), {
			zoom: 14,
			center: {lat: 47.2173, lng: -1.5534}
		});
		 
		this.ajax = new XMLHttpRequest();
		this.ajax.open("GET",this.url,true);
		this.ajax.addEventListener("load", ()=>{
			this.data = JSON.parse(this.ajax.responseText);
			console.log(this.data);
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
