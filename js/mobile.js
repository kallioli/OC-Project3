class MobileMenu {

  constructor() {
    this.x = document.getElementById("myLinks");
  }

  myFunction() {
    if (this.x.style.display === "block") {
      this.x.style.display = "none";
    } else {
      this.x.style.display = "block";
    }
  }
}

let mMenu = new MobileMenu();