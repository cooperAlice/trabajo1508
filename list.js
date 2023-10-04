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
    let htmlContentToAppend = "";
  
    for (let i = 0; i < catIDs.length; i++) {
      const catID = catIDs[i];
      const pelicula = array.find((movie) => movie.id == catID);
  
      if (pelicula) {
        htmlContentToAppend += `
          <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card">
              <img src="${pelicula.image}" class="card-img-top" alt="peli image">
              <div class="card-body">
                <h5 class="card-title">${pelicula.name}</h5>
                <button type="button" class="btn btn-danger" onclick="removeCatID(${pelicula.id})"> Quitar</button></div>
            </div>
          </div>
        `;
      }
    }
  
    listContainer.innerHTML = `<div class="row">${htmlContentToAppend}</div>`;
  }
//Funcion para sacar pelicula de mi lista
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