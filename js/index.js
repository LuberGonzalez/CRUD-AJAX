(() => {
  const xhr = new XMLHttpRequest();
  const $xhr = document.getElementById("xhr");
  const $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    //console.log(xhr);
    if (xhr.status >= 200 && xhr.status < 300) {
      //            console.log('exito');
      // console.log(xhr.responseText);
      let json = JSON.parse(xhr.responseText);
      //            console.log(json);
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}-- ${el.email} --${el.phone}`;
        $fragment.appendChild($li);
      });
      $xhr.appendChild($fragment);
    } else {
      //            console.log('error');
      let message = xhr.statusText || "Ocurrio un error";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });
  //xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');
  xhr.open("GET", "assets/users.json");
  xhr.send();
})();
(() => {
  const $fetch = document.getElementById("fetch");
  const $fragment = document.createDocumentFragment();

  fetch("assets/users.json")
    //        .then((res) => {
    //            console.log(res);
    //            return res.ok ? res.json() : Promise.reject(res);
    //        })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      //            console.log(json);
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}-- ${el.email} --${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "Ocurrio un error";
      $fetch.innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(() => {
      console.log("Se muetra independientement");
    });
})();
(() => {
  const $fetchAsync = document.getElementById("fetch-async");
  const $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch("assets/users.json");
      let json = await res.json();
      //            console.log(res, json);
      if (!res.ok) {
        throw {
          status: res.status,
          statusText: res.statusText,
        };
      }

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}-- ${el.email} --${el.phone}`;
        $fragment.appendChild($li);
      });
      $fetchAsync.appendChild($fragment);
    } catch (err) {
      console.log(err);
      let message = err.statusText || "Ocurrio un error";
      $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
    } finally {
      //            console.log('Esto se jecuta independientemente del try catch')
    }
  }
  getData();
})();
(() => {
  const $axios = document.getElementById("axios");
  const $fragment = document.createDocumentFragment();

  axios
    .get("assets/users.json")
    .then((res) => {
      // console.log(res);
      let json = res.data;
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}-- ${el.email} --${el.phone}`;
        $fragment.appendChild($li);
      });
      $axios.appendChild($fragment);
    })
    .catch((err) => {
      // console.log(err.response);
      let message = err.response.statusText || "Ocurrio un error";
      $axios.innerHTML = `Error ${err.response.status}: ${message}`;
    })
    .finally(() => {
      // console.log('Esto se ejcutara independientemente del resultado de Axios');
    });
})();
(() => {
  const $axiosAsync = document.getElementById("axios-async");
  const $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await axios.get("assets/users.json");
      let json = await res.data;

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name}-- ${el.email} --${el.phone}`;
        $fragment.appendChild($li);
      });
      $axiosAsync.appendChild($fragment);
    } catch (err) {
      console.log(err.response);
      let message = err.response.statusText || "Ocurrio un error";
      $axiosAsync.innerHTML = `Error ${err.response.status}: ${message}`;
    } finally {
      // console.log('Esto se ejcutara independientemente del resultado de Axios');
    }
  }

  getData();
})();