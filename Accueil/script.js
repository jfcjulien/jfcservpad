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
    const cat = box.querySelector(".cat-plat").innerText;

    const plat = {
        nom: nom,
        prix: parseFloat(prix), // Convertir le prix en nombre
        categorie: cat, // À modifier si besoin
    };

    // Envoyer les données à l'API
    envoyerCommandeAPI(plat);
}

async function envoyerCommandeAPI(plat) {
    const apiUrl = "https://45.147.98.179:3000/set/commande"; // URL de l'API
    const numeroDeTable = "1"; // Remplacez par le numéro de table approprié

    const data = {
        commande: plat.nom, // Nom du plat
        numeroDeTable: numeroDeTable, // Numéro de table
        prix: plat.prix, // Prix du plat
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`${plat.nom} a été ajouté au panier et envoyé à l'API !`);
            console.log("Réponse de l'API:", result);
        } else {
            const error = await response.json();
            alert(`Erreur lors de l'envoi de la commande : ${error.message}`);
            console.error("Erreur API:", error);
        }
    } catch (err) {
        console.error("Erreur réseau:", err);
        alert("Erreur réseau lors de l'envoi de la commande.");
    }
}

// Vérifier si le panier est bien sauvegardé
console.log("Panier actuel :", JSON.parse(localStorage.getItem("panier")));









console.log("script.js chargé !");
console.log("admin.js chargé !");
