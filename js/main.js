var nom = document.getElementById('name');
var prenom = document.getElementById('prenom');
var lnom = localStorage.getItem('nom');
var lprenom = localStorage.getItem('prenom');

if (lnom && lprenom) {
    nom.value=lnom;
    prenom.value=lprenom;
}
document.getElementById('reserver').addEventListener('click', function() {
    
    localStorage.setItem('nom', nom.value);
    localStorage.setItem('prenom', prenom.value);
});

localStorage.clear();