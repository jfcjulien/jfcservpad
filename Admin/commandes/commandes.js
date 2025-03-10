function verifierCode() {
    const code = document.getElementById("code").value;
    if (code === "0000") {
        document.getElementById("commandes-section").style.display = "block";
        afficherCommandes();
    } else {
        alert("Code incorrect !");
    }
}

function afficherCommandes() {
    let commandes = JSON.parse(localStorage.getItem("commandes")) || [];
    const commandesBody = document.getElementById("commandes-body");

    commandesBody.innerHTML = "";

    commandes.forEach((commande) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${commande.date}</td>
            <td>${commande.plats.map(p => `${p.nom} (${p.prix}€)`).join(", ")}</td>
        `;
        commandesBody.appendChild(row);
    });
}

function verifierCode() {
    const code = document.getElementById("code").value;
    if (code === "0000") {
        document.getElementById("commandes-section").style.display = "block";
        afficherCommandes();
    } else {
        alert("Code incorrect !");
    }
}

function afficherCommandes() {
    let commandes = JSON.parse(localStorage.getItem("commandes")) || [];
    const commandesBody = document.getElementById("commandes-body");

    commandesBody.innerHTML = "";

    commandes.forEach((commande) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${commande.date}</td>
            <td>Table ${commande.table}</td>
            <td>${commande.plats.map(p => `${p.nom} (${p.prix}€)`).join(", ")}</td>
        `;
        commandesBody.appendChild(row);
    });
}


function validerCommande(button) {
    const row = button.closest("tr");  
    const nomPlat = row.cells[0].innerText;
    const prixPlat = row.cells[1].innerText;
    const table = row.cells[2].innerText;

    // Récupérer les commandes prêtes depuis localStorage
    let commandesPretes = JSON.parse(localStorage.getItem("commandesPretes")) || [];

    // Ajouter la commande validée
    commandesPretes.push({ nom: nomPlat, prix: prixPlat, table: table });
    localStorage.setItem("commandesPretes", JSON.stringify(commandesPretes));

    // Supprimer la commande de la liste
    row.remove();

    // Rediriger vers le panier
    setTimeout(() => {
        window.location.href = "panier.html";
    }, 500);
}
