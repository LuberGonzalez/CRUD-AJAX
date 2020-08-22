const d = document;
const $table = d.querySelector(".crud-table"); // Almacenar la tabla.
const $form = d.querySelector(".crud-form"); // Almacenar el formulario.
const $title = d.querySelector(".crud-title"); // ALmacenar el titulo.
const $template = d.getElementById("crud-template").content; // Almacenar el template para mostrar los datos.
const $fragment = d.createDocumentFragment(); // Para cargar los elementos

const getAll = async () => {
  try {
    let res = await fetch("http://localhost:4000/santos");
    let json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    console.log(json);
    json.forEach((el) => {
      $template.querySelector(".name").textContent = el.nombre;
      $template.querySelector(".constellation").textContent = el.constelacion;
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".edit").dataset.name = el.nombre;
      $template.querySelector(".edit").dataset.constellation = el.constelacion;
      $template.querySelector(".delete").dataset.id = el.id;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $table.querySelector("tbody").appendChild($fragment);
  } catch (err) {
    console.error(err);
    let message = err.statusText || "Ocurrio un error";
    $table.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</b></p>`
    );
  }
};

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();

    if (!e.target.id.value) {
      // Crear
        
      try {
          console.log(e.target.nombre.value);
          console.log(e.target.constelacion.value);
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset= utf-8"
          },
          body: JSON.stringify({
            nombre: e.target.nombre.value,
            constelacion: e.target.constelacion.value,
          }),
        }, 
         res = await fetch("http://localhost:4000/santos", options),
         json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        location.reload();
      } catch (err) {
          console.error(err);
        let message = err.statusText || "Ocurrio un error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}: ${message}</b></p>`
        );
      }
    } else {
      // Actualizar
        try {
          let options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json; charset= utf-8",
            },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              constelacion: e.target.constelacion.value,
            }),
          };
          console.log(options);
          let res = await fetch(`http://localhost:4000/santos/${e.target.id.value}`,  options);
          let json = await res.json();
          if (!res.ok) throw { status: res.status, statusText: res.statusText };
          location.reload();
        } catch (error) {
          let message = err.statusText || "Ocurrio un error";
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}: ${message}</b></p>`
          );
        }
    }
  }
});

d.addEventListener('click', async(e) => {
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
       try {
          let options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json; charset= utf-8",
            },
            body: JSON.stringify({
              nombre: e.target.nombre.value,
              constelacion: e.target.constelacion.value,
            }),
          };
          console.log(options);
          let res = await fetch(`http://localhost:4000/santos/${e.target.dataset.id}`,  options);
          let json = await res.json();
          if (!res.ok) throw { status: res.status, statusText: res.statusText };
          location.reload();
        } catch (err) {
          let message = err.statusText || "Ocurrio un error";
         alert(`Error ${err.status}: ${message}`);
        }
    }
    }
})