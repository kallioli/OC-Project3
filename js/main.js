var nom = document.getElementById('name');
var prenom = document.getElementById('prenom');
var lnom = localStorage.getItem('nom');
var lprenom = localStorage.getItem('prenom');
var contentTimer=document.getElementById('timer');
var canvas = document.getElementById("sig-canvas");
var contAddress = document.getElementById("cont-address");
var contStation = document.getElementById('cont-nameStation');


let laddress=sessionStorage.getItem('address');
if(laddress)


if (lnom && lprenom) {
    nom.value=lnom;
    prenom.value=lprenom;
}

document.getElementById('sig-submitBtn').addEventListener('click', (e)=> {
    e.preventDefault();

    if(canvas.toDataURL() == document.getElementById('blank').toDataURL())
        alert('It is blank');
    else
        alert('Save it!');
    
    localStorage.setItem('nom', nom.value);
    localStorage.setItem('prenom', prenom.value);
    
    let endDate = new Date().getTime()+20*60*1000;
    sessionStorage.setItem('stationName',document.getElementById('station-name').innerHTML);
    sessionStorage.setItem('address',document.getElementById('station-address').innerHTML);
    sessionStorage.setItem('endDate', endDate);

    let timer = setInterval(()=> {
        let now = new Date().getTime();
        let delta = endDate- now
        let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((delta % (1000 * 60)) / 1000);
        if(seconds<10){
            seconds='0'+seconds;
        }
        contStation.innerHTML = sessionStorage.getItem('stationName');
        contAddress.innerHTML = sessionStorage.getItem('address');
        contentTimer.innerHTML = 'Temps restant : '+minutes+':'+seconds;
        document.getElementById('valid-section').style.display = "block";
    })
});

