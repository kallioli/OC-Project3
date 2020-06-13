class bikeMap {
	
	constructor (map){
		this.url = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=bc73101ff7dfe7125859e4a2dc3f0c0bc3921294";
		this.i;
		this.map=map;
		this.initMap();
	}

	initMap() {
		
		this.ajax = new XMLHttpRequest();
		this.ajax.open("GET",this.url,true);
		this.ajax.addEventListener("load", ()=>{
			this.data = JSON.parse(this.ajax.responseText);
			console.log(this.data);
			for (this.i=0; this.i<this.data.length; this.i++){
				this.marker = new google.maps.Marker({
					position: {lat: this.data[this.i].position.lat, lng: this.data[this.i].position.lng},
					map: this.map,
					stationId: this.data[this.i].number,
					stationName: this.data[this.i].name,
					stationAddress: this.data[this.i].address,
					stationStatus: this.data[this.i].status,
					stationTotalStand: this.data[this.i].bike_stands,
					stationStandAvailable: this.data[this.i].available_bike_stands,
					stationBikeAvailable: this.data[this.i].available_bikes,
					stationBanking: this.data[this.i].banking
				});
	
				this.marker.addListener("click", ()=> {
	
					this.stationNameFull = this.marker.stationName;
					this.stationNameCut = this.stationNameFull.split('-');
					document.getElementById("station-name").innerHTML = this.stationNameCut[1];
	
					if (this.marker.stationStatus == 'OPEN') {
						document.getElementById("station-status").innerHTML = 'ouverte';
						document.getElementById("station-status").className = 'station-open';
					} else if (this.marker.stationStatus == 'CLOSE') {
						document.getElementById("station-status").innerHTML = 'fermée';
						document.getElementById("station-status").className = 'station-close';
					}
	
					this.banking = this.marker.stationBanking;
					if (this.banking) {
						document.getElementById("station-banking").style.color = "black";
					} else if (!this.banking) {
						document.getElementById("station-banking").style.color = "grey";
					}
	
					document.getElementById("station-address").innerHTML = this.marker.stationAddress;
					document.getElementById("station-available-bike").innerHTML = this.marker.stationBikeAvailable;
					document.getElementById("station-total-stand").innerHTML = this.marker.stationTotalStand;
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
		});
	
		this.ajax.send();
	}
}

