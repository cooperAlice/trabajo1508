const peliculasJSON = "peliculas.json";

async function getJSONData(peliculas) {
    return fetch(peliculas)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            return { status: 'ok', data: response };
        })
        .catch(function(error) {
            return { status: 'error', data: error };
        });
}

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(peliculasJSON).then(function(resultObj) {
        if (resultObj.status === "ok") {
            const peliculasArray = resultObj.data.peliculas;
            showCategoriesList(peliculasArray);
        }
    });
});

function showCategoriesList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        htmlContentToAppend += `
        <div class="col-4">
            <img src="${array[i].image}" alt="peli image" class="img">
            <h2 class="nombre-peli">${array[i].name}</h2>
            <p>Año de estreno: ${array[i].estreno}</p> 
            <p>Autores: ${array[i].autores} </p>
            <p>Género: ${array[i].genero}</p>
            <button type="button" class="btn btn-primary" onclick="setCatID(${array[i].id})" id="boton">Agregar a mi lista</button>
        </div>
        `;
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function setCatID(id) {
    let catIDs = localStorage.getItem("catIDs");

    if (!catIDs) {
        catIDs = [];
    } else {
        catIDs = JSON.parse(catIDs);
    }

    catIDs.push(id);
    localStorage.setItem("catIDs", JSON.stringify(catIDs));
}