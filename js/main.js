function initBikeMap() {
  var mapFull = new bikeMap('map',-1);
}

window.myGlobalVariables = {};
window.myGlobalVariables.markers = {};

window.addEventListener('load', () => {
  window.myGlobalVariables.signature = new Signature('signature',300, 200);
});

document.getElementById('reservationForm').addEventListener('submit',(e)=>{
  e.preventDefault();
})