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
        </td>
    `;
}

function supprimerPlat(button) {
    button.closest("tr").remove();
}
