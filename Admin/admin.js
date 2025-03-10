function ajouterPlat() { 
    const tableBody = document.getElementById("table-body");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>#</td>
        <td><input type="text" placeholder="Nom du plat"></td>
        <td><input type="number" placeholder="Prix"></td>
        <td>
            <select>
                <option>Entrées</option>
                <option>Plats</option>
                <option>Desserts</option>
            </select>
        </td>
        <td>
            <button class="btn btn-success btn-sm" onclick="sauvegarderPlat(this)">Sauvegarder</button>
            <button class="btn btn-danger btn-sm" onclick="supprimerPlat(this)">Supprimer</button>
        </td>
    `;
    tableBody.appendChild(newRow);
}

function modifierPlat(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");
    
    cells[1].innerHTML = `<input type="text" value="${cells[1].innerText}">`;
    cells[2].innerHTML = `<input type="number" value="${cells[2].innerText}">`;
    cells[3].innerHTML = `
        <select>
            <option>Entrées</option>
            <option>Plats</option>
            <option>Desserts</option>
        </select>
    `;
    
    button.innerText = "Sauvegarder";
    button.setAttribute("onclick", "sauvegarderPlat(this)");
}

function sauvegarderPlat(button) {
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("input, select");
    
    row.innerHTML = `
        <td>#</td>
        <td>${inputs[0].value}</td>
        <td>${inputs[1].value}</td>
        <td>${inputs[2].value}</td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="modifierPlat(this)">Modifier</button>
            <button class="btn btn-danger btn-sm" onclick="supprimerPlat(this)">Supprimer</button>
            <button class="btn btn-primary btn-sm" onclick="ajouterPanier(this)">Ajouter au panier</button>
        </td>
    `;
}

function supprimerPlat(button) {
    button.closest("tr").remove();
}



function afficherPanier() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    const tableBody = document.getElementById("table-body");

    tableBody.innerHTML = ""; // Vider la table avant d'ajouter les plats

    panier.forEach((plat, index) => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${index + 1}</td>
            <td>${plat.nom}</td>
            <td>${plat.prix}€</td>
            <td>${plat.categorie}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="supprimerDuPanier(${index})">Supprimer</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });

// Ajouter le champ pour choisir la table et le bouton "Valider la commande"
if (panier.length > 0) {
    document.getElementById("validation-section").innerHTML = `
        <label for="table-number">Numéro de table :</label>
        <input type="number" id="table-number" min="1" required>
        <button class="btn btn-success" onclick="validerCommande()">Valider la commande</button>
    `;
} else {
    document.getElementById("validation-section").innerHTML = "";
}
}

// Supprimer un élément du panier
function supprimerDuPanier(index) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.splice(index, 1);
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier();
}

// Valider la commande et stocker dans localStorage
function validerCommande() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    if (panier.length === 0) {
        alert("Le panier est vide !");
        return;
    }

    let commandes = JSON.parse(localStorage.getItem("commandes")) || [];
    commandes.push({ date: new Date().toLocaleString(), plats: panier });

    localStorage.setItem("commandes", JSON.stringify(commandes));

    // Vider le panier après validation
    localStorage.removeItem("panier");
    afficherPanier();
    
    alert("Commande validée !");
}

// Valider la commande avec numéro de table
function validerCommande() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let tableNumber = document.getElementById("table-number").value;

    if (panier.length === 0) {
        alert("Le panier est vide !");
        return;
    }

    if (!tableNumber) {
        alert("Veuillez entrer un numéro de table !");
        return;
    }

    let commandes = JSON.parse(localStorage.getItem("commandes")) || [];
    commandes.push({ 
        date: new Date().toLocaleString(), 
        table: tableNumber,
        plats: panier 
    });

    localStorage.setItem("commandes", JSON.stringify(commandes));

    // Vider le panier après validation
    localStorage.removeItem("panier");
    afficherPanier();
    
    alert(`Commande validée pour la table ${tableNumber} !`);
}

// Charger le panier au démarrage
document.addEventListener("DOMContentLoaded", afficherPanier);



document.addEventListener("DOMContentLoaded", function () {
    let commandesPretes = JSON.parse(localStorage.getItem("commandesPretes")) || [];
    const commandesDiv = document.getElementById("commandes-pretes");

    commandesPretes.forEach(commande => {
        const commandeHTML = `
            <div class="commande">
                <p><strong>${commande.nom}</strong> - ${commande.prix} (Table ${commande.table})</p>
            </div>
        `;
        commandesDiv.innerHTML += commandeHTML;
    });
});
