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
}

// Supprimer un élément du panier
function supprimerDuPanier(index) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.splice(index, 1); // Supprime l'élément à l'index donné
    localStorage.setItem("panier", JSON.stringify(panier));
    afficherPanier(); // Mettre à jour l'affichage
}

// Charger le panier au chargement de la page admin.html
document.addEventListener("DOMContentLoaded", afficherPanier);
