var nom = document.getElementById('name');
var prenom = document.getElementById('prenom');
var lnom = localStorage.getItem('nom');
var lprenom = localStorage.getItem('prenom');
var contentTimer=document.getElementById('timer');

if (lnom && lprenom) {
    nom.value=lnom;
    prenom.value=lprenom;
}
document.getElementById('sig-submitBtn').addEventListener('click', (e)=> {
    e.preventDefault();
    
    localStorage.setItem('nom', nom.value);
    localStorage.setItem('prenom', prenom.value);
    let endDate = new Date().getTime()+20*60*1000;
    let timer = setInterval(()=> {
        let now = new Date().getTime();
        let delta = endDate- now
        let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((delta % (1000 * 60)) / 1000);
        if(seconds<10){
            seconds='0'+seconds;
        }
        contentTimer.innerHTML='Temps restant:' +minutes+':'+seconds;
    })
});

