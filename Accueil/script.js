let accueil = document.querySelector ('#menu-bars')
let navbar = document.querySelector ('.navbar')

accueil.onclick = () =>{
    accueil.classList.toggle('fa-times')
    navbar.classList.toggle('active')
}

let section = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header .navbar a')

window.onscroll = () =>{
    accueil.classList.remove('fa-times')
    navbar.classList.remove('active')
}

document.querySelector('#search-icon').onclick = () =>{
    document.querySelector('#search-form').classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
    document.querySelector('#search-form').classList.remove('active');
}

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 7500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop:true
  });








function ajouterPanier(button) {
    const box = button.closest(".box"); // Récupérer la div .box du plat
    const nom = box.querySelector(".nom-plat").innerText;
    const prix = box.querySelector(".prix-plat").innerText.replace("€", "").trim(); // Enlever l'euro et les espaces

    const plat = {
        nom: nom,
        prix: prix,
        categorie: "Non spécifiée" // À modifier si besoin
    };

    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.push(plat);
    localStorage.setItem("panier", JSON.stringify(panier));

    alert(`${plat.nom} a été ajouté au panier !`);
}

// Vérifier si le panier est bien sauvegardé
console.log("Panier actuel :", JSON.parse(localStorage.getItem("panier")));









console.log("script.js chargé !");
console.log("admin.js chargé !");
