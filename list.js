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
    const catIDsString = localStorage.getItem("catIDs");

    if (catIDsString) {
        const catIDs = JSON.parse(catIDsString);

        getJSONData(peliculasJSON).then(function(resultObj) {
            if (resultObj.status === "ok") {
                const peliculasArray = resultObj.data.peliculas;
                showMovieList(peliculasArray, catIDs);
            }
        });
    }
});

function showMovieList(array, catIDs) {
    const listContainer = document.getElementById("cat-list-container");
    let htmlContentToAppend = `
        <h2>Mi Lista de Películas</h2>
        <ul>
    `;

    for (let i = 0; i < catIDs.length; i++) {
        const catID = catIDs[i];
        const pelicula = array.find(movie => movie.id == catID);

        if (pelicula) {
            htmlContentToAppend += `
                <li>
                <div class="movie-info">
                    <img src="${pelicula.image}" alt="peli image" class="img">
                    <h3>${pelicula.name}</h3>
                </div>
                    <button type="button" class="btn btn-danger" onclick="removeCatID(${pelicula.id})" id="boton">Quitar</button>
                </li>
            `;
        }
    }

    htmlContentToAppend += `</ul>`;
    listContainer.innerHTML = htmlContentToAppend;
}

function removeCatID(id) {
    let catIDs = localStorage.getItem("catIDs");

    if (!catIDs) {
        return; // No hay nada que eliminar
    }

    catIDs = JSON.parse(catIDs);

    // Busca el índice del ID en el array y lo elimina
    const index = catIDs.indexOf(id);
    if (index !== -1) {
        catIDs.splice(index, 1);
    }

    localStorage.setItem("catIDs", JSON.stringify(catIDs));

    // Vuelve a cargar la lista actualizada
    const catIDsString = localStorage.getItem("catIDs");
    if (catIDsString) {
        const updatedCatIDs = JSON.parse(catIDsString);
        getJSONData(peliculasJSON).then(function(resultObj) {
            if (resultObj.status === "ok") {
                const peliculasArray = resultObj.data.peliculas;
                showMovieList(peliculasArray, updatedCatIDs);
            }
        });
    }
}