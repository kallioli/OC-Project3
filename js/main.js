class Main{

    constructor(timeReservation){
        this.nom = document.getElementById('name');
        this.prenom = document.getElementById('prenom');
        this.lnom = localStorage.getItem('nom');
        this.lprenom = localStorage.getItem('prenom');
        this.contentTimer=document.getElementById('timer');
        this.canvas = document.getElementById("sig-canvas");
        this.contAddress = document.getElementById("cont-address");
        this.contStation = document.getElementById('cont-nameStation');
        this.contNameUser = document.getElementById('cont-nameUser')
        this.sAddress = sessionStorage.getItem('address');
        this.sStationName = sessionStorage.getItem('stationName');
        this.sEndDate = sessionStorage.getItem('endDate');
        this.timer; 
        this.timeReservation = timeReservation;

        if (this.sAddress && this.sStationName && this.sEndDate){
            if (this.sEndDate >= new Date().getTime){
                sessionStorage.clear();
            }else{
                this.startTimer(this.sEndDate);
            }
        }
        
        if (this.lnom && this.lprenom) {
            this.nom.value=this.lnom;
            this.prenom.value=this.lprenom;
        }
        this.storeData();

        document.getElementById('sig-submitBtn').addEventListener('click', (e)=> {
            e.preventDefault();
            this.initReservation();
           
        });
        document.getElementById('btn-cancel').addEventListener('click', (e)=>{
            this.cancelReservation();

        });
    }
    startTimer(enddate){
        this.timer = setInterval(()=> {
            this.now = new Date().getTime();
            this.delta = enddate - this.now
            this.minutes = Math.floor((this.delta % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((this.delta % (1000 * 60)) / 1000);
            if(this.seconds<10){
                this.seconds='0'+this.seconds;
            }
            this.contStation.innerHTML = this.sStationName;
            this.contAddress.innerHTML = this.sAddress;
            this.contNameUser.innerHTML = this.lnom+' '+this.lprenom;
            this.contentTimer.innerHTML = 'Temps restant : '+this.minutes+':'+this.seconds;
            document.getElementById('valid-section').style.display = "block";
            document.getElementById('canvas-section').style.display = "none";
        })
    }
    storeData(){
        //localStorage
        localStorage.setItem('nom', this.nom.value);
        localStorage.setItem('prenom', this.prenom.value);
        //session strorage
        sessionStorage.setItem('stationName',document.getElementById('station-name').innerHTML);
        sessionStorage.setItem('address',document.getElementById('station-address').innerHTML);
        sessionStorage.setItem('endDate', this.endDate);
    }
    initReservation(){
        if(this.canvas.toDataURL() == document.getElementById('blank').toDataURL()){
            alert('Signer pour valider votre réservation!');
        }else if(this.nom.value=="" || this.prenom.value==""){
            alert ('Entrer votre nom ou prénom');
        }else{

        this.storeData();
        
        this.endDate = new Date().getTime()+this.timeReservation*60*1000;
        

        this.startTimer(this.endDate);
        }
    }
    cancelReservation(){
        sessionStorage.clear();
        clearInterval(this.timer);
        document.getElementById('valid-section').style.display = "none";
        document.getElementById('canvas-section').style.display = "none";
    }
}

let main = new Main(20);