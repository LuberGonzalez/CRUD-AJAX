const d = document;
const $table = d.querySelector(".crud-table"); // Almacenar la tabla.
const $form = d.querySelector(".crud-form"); // Almacenar el formulario.
const $title = d.querySelector(".crud-title"); // ALmacenar el titulo.
const $template = d.getElementById("crud-template").content; // Almacenar el template para mostrar los datos.
const $fragment = d.createDocumentFragment(); // Para cargar los elementos

const ajax = (options) => {
  /*  Se crea una funcion para podr usar todos los metodos del objeto XMLHttpRequest
   *   Luego creamos un objeto y aplicamos la destructuracion para poder
   *   Usar todos los elementos que en el vienen.
   */
  let { url, method, success, error, data } = options;
  // * Instaciamos el objeto XMLHttpRequest
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status < 300) {
      let json = JSON.parse(xhr.responseText);
      success(json);
    } else {
      let message = xhr.statusText || "Ocurrio un error";
      error(`Error ${xhr.status}: ${message}`);
    }
  });

  // * Abrimos la conexion con el metodo indicado
  xhr.open(method || "GET", url);
  // * Se colocan las cabeceras de la aplicacion en donde especificamos el tipo de aplicacion.
  xhr.setRequestHeader("Content-Type", "application/json; charset= utf-8");
  // * Convertimos la data enviada a cadena de texto para volverlo un archivo json
  xhr.send(JSON.stringify(data));
};

const getAll = () => {
  ajax({
    url: "http://localhost:4000/santos",
    success: (res) => {
      console.log(res);
      res.forEach((el) => {
        $template.querySelector(".name").textContent = el.nombre;
        $template.querySelector(".constellation").textContent = el.constelacion;
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.name = el.nombre;
        $template.querySelector(".edit").dataset.constellation =
          el.constelacion;
        $template.querySelector(".delete").dataset.id = el.id;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
    },
    error: (err) => {
      console.error(err);
      $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    },
  });
};

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", (e) => {
  if (e.target == $form) {
    e.preventDefault();
    // * Se analiza si el input viene con un idi para actualizar o crear un registro
    if (!e.target.id.value) {
      ajax({
        url: "http://localhost:4000/santos",
        method: "POST",
        success: (res) => {
          location.reload();
          $form.reset();
        },
        error: (err) => {
          $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
        data: {
          nombre: e.target.nombre.value,
          constelacion: e.target.constelacion.value,
        },
      });
    } else {
      ajax({
        url: `http://localhost:4000/santos/${e.target.id.value}`,
        method: "PUT",
        success: (res) => {
          location.reload();
          $form.reset();
        },
        error: (err) => {
          $form.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
        },
        data: {
          nombre: e.target.nombre.value,
          constelacion: e.target.constelacion.value,
        },
      });
    }
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Editar Santo";
    $form.nombre.value = e.target.dataset.name;
    $form.constelacion.value = e.target.dataset.constellation;
    $form.id.value = e.target.dataset.id;
  }
  if (e.target.matches(".delete")) {
    let isDelete = confirm(
      `¿Estas Seguro de Eliminar el id ${e.target.dataset.id}?`
    );
    if (isDelete) {
      ajax({
        url: `http://localhost:4000/santos/${e.target.dataset.id}`,
        method: "DELETE",
        success: (res) => {
          location.reload();
          $form.reset();
        },
        error: (err) => {
          alert(err);
        },
      });
    }
  }
});