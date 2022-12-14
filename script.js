// MODELO DE DATOS

let peliculas_iniciales = [
  {
    titulo: "Superlópez",
    director: "Javier Ruiz Caldera",
    miniatura: "files/superlopez.png",
  },
  {
    titulo: "Jurassic Park",
    director: "Steven Spielberg",
    miniatura: "files/jurassicpark.png",
  },
  {
    titulo: "Interstellar",
    director: "Christopher Nolan",
    miniatura: "files/interstellar.png",
  },
];

localStorage.mis_peliculas =
  localStorage.mis_peliculas || JSON.stringify(peliculas_iniciales);

// VISTAS
function indexView(peliculas) {
  let i = 0;
  let view = "";

  while (i < peliculas.length) {
    view += `
          <div class="movie">
             <div class="movie-img">
                  <img data-my-id="${i}" src="${peliculas[i].miniatura}" onerror="this.src='files/placeholder.png'"/>
             </div>
             <div class="title">
                 ${peliculas[i].titulo || "<em>Sin título</em>"}
             </div>
             <div class="actions">
                  <button class="show" data-my-id="${i}">Ver</button>
                 <button class="edit" data-my-id="${i}">editar</button>
                 <button class="delete" data-my-id="${i}">Borrar</button>
              </div>
          </div>\n`;
    i = i + 1;
  }

  view += `<div class="actions">
                  <button class="new">Añadir</button>
                  <button class="reset">Reset</button>
              </div>`;

  return view;
};

function editView(i, pelicula) {
  return `<h2>Editar Película </h2>
          <div class="field">
          Título <br>
          <input  type="text" id="titulo" placeholder="Título" 
                  value="${pelicula.titulo}">
          </div>
          <div class="field">
          Director <br>
          <input  type="text" id="director" placeholder="Director" 
                  value="${pelicula.director}">
          </div>
          <div class="field">
          Miniatura <br>
          <input  type="text" id="miniatura" placeholder="URL de la miniatura" 
                  value="${pelicula.miniatura}">
          </div>
          <div class="actions">
              <button class="update" data-my-id="${i}">
                  Actualizar
              </button>
              <button class="index">
                  Volver
              </button>
         `;
};

function showView(pelicula) {
  // Genera un HTML con informacion de la pelicula

  return `
       <p>
          
      La película <b> ${pelicula.titulo}</b> está
      dirigida por <b> ${pelicula.director}</b>.
       
       
       </p>
       <div class="actions">
          <button class="index">Volver</button>
       </div>`;
};

function newView() {
  // Genera un formulario con la información necesaria de cada pelicula.


  return `<h2>Crear Película</h2>

          <div class="field">
          Título <br>
          <input  type="text" id="titulo" placeholder="Título">
          </div>

          <div class="field">
          Director <br>
          <input  type="text" id="director" placeholder="Director">
          </div>

          <div class="field">
          Miniatura <br>
          <input  type="text" id="miniatura" placeholder="URL de la miniatura">
          </div>



          <div class="actions">
              <button class="create">Crear</button>
              <button class="index">Volver</button>
          </div>`;
};

// CONTROLADORES
function indexContr() {
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  document.getElementById("main").innerHTML = indexView(mis_peliculas);
};

function showContr(i) {
  //Controlador que muestra la vista showView(pelicula)
  let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
  document.getElementById("main").innerHTML = showView(pelicula);
};

function newContr() {
  //Controlador que muestra la vista newView()
  document.getElementById("main").innerHTML = newView();
};

function createContr() {
  // Controlador que crea una película nueva
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  mis_peliculas[mis_peliculas.length] = {
    titulo: document.getElementById("titulo").value,
    director: document.getElementById("director").value,
    miniatura: document.getElementById("miniatura").value
  };
  localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
  indexContr();
};

function editContr(i) {
  let pelicula = JSON.parse(localStorage.mis_peliculas)[i];
  document.getElementById("main").innerHTML = editView(i, pelicula);
};

function updateContr(i) {
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  mis_peliculas[i].titulo = document.getElementById("titulo").value;
  mis_peliculas[i].director = document.getElementById("director").value;
  mis_peliculas[i].miniatura = document.getElementById("miniatura").value;
  localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
  indexContr();
};


function deleteContr(i) {
  //Actualiza el modelo borrando la película seleccionada
  //Confirmación de borrado --> Botón Aceptar devuelve true, Cancel false
  let mis_peliculas = JSON.parse(localStorage.mis_peliculas);
  if (window.confirm("¿Seguro que quieres borrar esta película?")) {
    mis_peliculas.splice(i, 1);
    localStorage.mis_peliculas = JSON.stringify(mis_peliculas);
    indexContr();
  }
};

function resetContr() {
  //Reinicia el modelo con las películas originales
  localStorage.mis_peliculas = JSON.stringify(peliculas_iniciales);
  indexContr();
};

// ROUTER
const matchEvent = (ev, sel) => ev.target.matches(sel);
const myId = (ev) => Number(ev.target.dataset.myId);

document.addEventListener("click", (ev) => {
  if (matchEvent(ev, ".index")) indexContr();
  else if (matchEvent(ev, ".edit")) editContr(myId(ev));
  else if (matchEvent(ev, ".update")) updateContr(myId(ev));
  else if (matchEvent(ev, ".show")) showContr(myId(ev));
  else if (matchEvent(ev, ".new")) newContr();
  else if (matchEvent(ev, ".create")) createContr();
  else if (matchEvent(ev, ".delete")) deleteContr(myId(ev));
  else if (matchEvent(ev, ".reset")) resetContr();
});

// Inicialización
document.addEventListener("DOMContentLoaded", indexContr);
