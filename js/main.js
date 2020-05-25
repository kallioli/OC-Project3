var nom = document.getElementById('name');
var prenom = document.getElementById('prenom');
var lnom = localStorage.getItem('nom');
var lprenom = localStorage.getItem('prenom');
var contentTimer=document.getElementById('timer');
var canvas = document.getElementById("sig-canvas");
var contAddress = document.getElementById("cont-address");
var contStation = document.getElementById('cont-nameStation');
var contNameUser = document.getElementById('cont-nameUser')
var sAddress = sessionStorage.getItem('address');
var sStationName = sessionStorage.getItem('stationName');
var sEndDate = sessionStorage.getItem('endDate');


function startTimer(enddate){
    let timer = setInterval(()=> {
        let now = new Date().getTime();
        let delta = enddate- now
        let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((delta % (1000 * 60)) / 1000);
        if(seconds<10){
            seconds='0'+seconds;
        }
        contStation.innerHTML = sStationName;
        contAddress.innerHTML = sAddress;
        contNameUser.innerHTML = lnom+' '+lprenom;
        contentTimer.innerHTML = 'Temps restant : '+minutes+':'+seconds;
        document.getElementById('valid-section').style.display = "block";
    })
}

if (sAddress && sStationName && sEndDate){
    if (sEndDate >= new Date().getTime){
        sessionStorage.clear();
    }else{
        startTimer(sEndDate);
       

    }
}

if (lnom && lprenom) {
    nom.value=lnom;
    prenom.value=lprenom;
}

document.getElementById('sig-submitBtn').addEventListener('click', (e)=> {
    e.preventDefault();

    if(canvas.toDataURL() == document.getElementById('blank').toDataURL()){
        alert('Signer pour valider votre réservation!');
    }else if(nom.value=="" || prenom.value==""){
        alert ('Entrer votre nom ou prenom');
    }else{

    localStorage.setItem('nom', nom.value);
    localStorage.setItem('prenom', prenom.value);
    
    let endDate = new Date().getTime()+20*60*1000;
    sessionStorage.setItem('stationName',document.getElementById('station-name').innerHTML);
    sessionStorage.setItem('address',document.getElementById('station-address').innerHTML);
    sessionStorage.setItem('endDate', endDate);

    startTimer(endDate);
}
});

document.getElementById('btn-cancel').addEventListener('click', (e)=>{
    sessionStorage.clear();
    clearInterval(timer);

});

