const peliculasJSON = "peliculas.json";
//Fetch de JSON de peliculas
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
//Funcion que nos trae el array de peliculas
function showCategoriesList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        htmlContentToAppend += `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card">
                    <img src="${array[i].image}" class="card-img-top" alt="peli image">
                    <div class="card-body">
                        <h5 class="card-title">${array[i].name}</h5>
                        <p class="card-text">Año de estreno: ${array[i].estreno}</p> 
                        <p class="card-text">Autores: ${array[i].autores}</p>
                        <p class="card-text">Género: ${array[i].genero}</p>
                        <button type="button" class="btn btn-primary" onclick="setCatID(${array[i].id})">Agregar a mi lista</button>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}
//Toma los id de cada pelicula y los guarda en el local storage
function setCatID(id) {
    let catIDs = localStorage.getItem("catIDs");
    if (!catIDs) {
        catIDs = [];
    } else {
        catIDs = JSON.parse(catIDs);
    }
    if (!catIDs.includes(id)){
    catIDs.push(id);
}
    localStorage.setItem("catIDs", JSON.stringify(catIDs));
}