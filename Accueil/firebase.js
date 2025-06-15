import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


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
    const randomId = Math.random().toString(36).substring(2, 6); // ID aléatoire court
    const customId = `Table-${tableNumber}-${randomId}`;
    await setDoc(doc(db, "commandes", customId), commande);
    alert("Commande envoyée à la cuisine, Merci !!");

    // Proposer le téléchargement du reçu en PDF
    if (window.confirm("Voulez-vous télécharger le reçu de la commande en PDF ?")) {
      if (window.jspdf && window.jspdf.jsPDF) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text(`Reçu de commande - ${customId}`, 10, 15);
        doc.setFontSize(12);
        doc.text(`Table : ${commande.table}`, 10, 25);
        doc.text(`Date : ${new Date(commande.date).toLocaleString()}`, 10, 32);

        let y = 42;
        doc.text("Plats :", 10, y);
        y += 8;

        commande.plats.forEach((plat, idx) => {
          doc.text(
            `${idx + 1}. ${plat.nom} - ${plat.prix}€ - ${plat.categorie ? plat.categorie : ""}`,
            12,
            y
          );
          y += 8;
        });

        // Calcul du total
        const total = commande.plats.reduce((sum, plat) => sum + (parseFloat(plat.prix) || 0), 0);
        doc.setFontSize(14);
        doc.text(`Total : ${total.toFixed(2)} €`, 10, y + 5);

        doc.save(`recu-${customId}.pdf`);
      } else {
        alert("jsPDF n'est pas chargé !");
      }
    }

    // Vider le panier
    localStorage.removeItem("panier");
    if (typeof afficherPanier === "function") afficherPanier();
  } catch (e) {
    console.error("Erreur Firebase :", e);
    alert("Erreur lors de l'envoi de la commande : " + e.message);
  }
};
