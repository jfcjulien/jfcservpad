const API_BASE_URL = "http://45.147.98.179:3000";

// Générer ou récupérer un ID de client unique
let clientId = localStorage.getItem("clientId");
if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem("clientId", clientId);
}

// Ajouter un plat (frontend uniquement)
function ajouterPlat() {
    const tableBody = document.getElementById("table-body");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>#</td>
        <td><input type="text" placeholder="Nom du plat"></td>
        <td><input type="number" placeholder="Prix"></td>
        <td><input type="number" placeholder="Numéro de table"></td>
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

// Sauvegarder un plat dans la base de données
async function sauvegarderPlat(button) {
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("input, select");
    const plat = {
        commande: inputs[0].value,
        prix: parseFloat(inputs[1].value),
        numeroDeTable: inputs[2].value,
        type: inputs[3].value,
        clientId: clientId // 👈 Ajout du clientId
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/set/commande`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plat)
        });
        if (!response.ok) throw new Error("Erreur lors de l'ajout");
        afficherCommandes();
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Supprimer un plat via l'API
async function supprimerPlat(button) {
    const row = button.closest("tr");
    const platId = row.dataset.id;
    if (!platId) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/delete/${platId}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Erreur lors de la suppression");
        afficherCommandes();
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Afficher toutes les commandes du client actuel uniquement
async function afficherCommandes() {
    try {
        const response = await fetch(`${API_BASE_URL}/getall?clientId=${clientId}`); // 👈 Filtrage par clientId
        if (!response.ok) throw new Error("Erreur lors de la récupération des commandes");
        const commandes = await response.json();
        
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = "";

        commandes.forEach((plat, index) => {
            const newRow = document.createElement("tr");
            newRow.dataset.id = plat.id;
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${plat.commande}</td>
                <td>${plat.prix}€</td>
                <td>${plat.type}</td>
                <td>${plat.numeroDeTable || "Non attribué"}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="supprimerPlat(this)">Supprimer</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Charger les commandes au démarrage
document.addEventListener("DOMContentLoaded", afficherCommandes);
