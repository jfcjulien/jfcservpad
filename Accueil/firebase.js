import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Ton vrai config Firebase ici 👇
const firebaseConfig = {
  apiKey: "AIzaSyDMHu_MKmcRUc58OdtMVC9_zBU8IJicuyU",
  authDomain: "servpad-f4b1a.firebaseapp.com",
  projectId: "servpad-f4b1a",
  storageBucket: "servpad-f4b1a.firebasestorage.app",
  messagingSenderId: "16852892395",
  appId: "1:16852892395:web:9a7e838fe0bad44d505cae",
  measurementId: "G-WLN0VZGR14"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Rendre la fonction visible depuis le HTML
window.envoyerCommande = async function(nom, prix, type) {
  try {
    const docRef = await addDoc(collection(db, "commandes"), {
      nom: nom,
      prix: prix,
      type: type,
      date: new Date()
    });
    alert("Commande envoyée ! ID : " + docRef.id);
  } catch (e) {
    alert("Erreur : " + e.message);
    console.error(e);
  }
};


window.validerCommandeEtEnvoyer = async function () {
  const panier = JSON.parse(localStorage.getItem("panier")) || [];
  const tableNumber = document.getElementById("table-number").value;

  if (panier.length === 0) {
    alert("Le panier est vide !");
    return;
  }

  if (!tableNumber) {
    alert("Veuillez entrer un numéro de table !!!!");
    return;
  }

  const commande = {
    table: tableNumber,
    plats: panier,
    date: new Date()
  };

  try {
    const docRef = await addDoc(collection(db, "commandes"), commande);
    alert("Commande envoyée à la cuisine, Merci !!");

    // Vider le panier
    localStorage.removeItem("panier");
    afficherPanier(); // si tu as cette fonction
  } catch (e) {
    console.error("Erreur Firebase :", e);
    alert("Erreur lors de l'envoi de la commande : " + e.message);
  }
};
