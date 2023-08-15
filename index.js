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
            <div class="list-group-item">
                <div class="row">
                    <div class="col-3">
                        <img src="${array[i].image}" alt="peli image" class="img">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <div class="mb-1">
                                <h2 class="nombre-peli">${array[i].name}</h2>
                                <p>Año de estreno:${array[i].estreno}</p> 
                                <p>Autores: ${array[i].autores} </p>
                                <p>Género:${array[i].genero}</p>
                            </div>
                        </div>
                        <small class="text-muted"> </small>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}
