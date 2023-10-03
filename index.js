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

    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


function showCategoriesList(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        htmlContentToAppend += `
        <div class="col-4">
                        <img src="${array[i].image}" alt="peli image" class="img">
                                <h2 class="nombre-peli">${array[i].name}</h2>
                                <p>Año de estreno:${array[i].estreno}</p> 
                                <p>Autores: ${array[i].autores} </p>
                                <p>Género:${array[i].genero}</p>
                                <button id="boton">Agregar a mi lista</button>
                                </div>
        `;
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}


document.getElementById("boton").addEventListener("click", function() {
    const productId = peliculasArray.get('id');
localStorage.getItem('productId')
)};

//Espera que termine de cargar el DOM para ejecutar la función
document.addEventListener("DOMContentLoaded", function(){
    //Obtiene la categoria autos a través de boton y lo guarda en localstorage
        document.getElementById("autos").addEventListener("click", function() {
            localStorage.setItem("catID", 101);
            //Redirecciona a la pagina de productos
            window.location = "products.html"
        });
        document.getElementById("juguetes").addEventListener("click", function() {
            localStorage.setItem("catID", 102);
            window.location = "products.html"
        });
        document.getElementById("muebles").addEventListener("click", function() {
            localStorage.setItem("catID", 103);
            window.location = "products.html"
        });
    });