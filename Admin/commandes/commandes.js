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
