import { app, storage } from "./firebase.js";

const form = document.querySelector("form");
const listaProductos = document.getElementById("listaProductos");

let arrayProducts = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {};

  const codigo = document.getElementById("codigo").value;
  const referencia = document.getElementById("referencia").value;
  const nombre = document.getElementById("nombre").value;
  const image = document.getElementById("image");

  data.codigo = codigo;
  data.referencia = referencia;
  data.nombre = nombre;

  // save in firebase store
  const uploadTask = storage
    .ref(`products/${image.files[0].name}`)
    .put(image.files[0]);
  uploadTask.on(
    "state_changed",
    (snapchot) => {
      console.log("uploading...");
    },
    (error) => {
      alert("error saving the image");
      console.log(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        data.imageUrl = url;
        guardarProducto(data);
      });
    }
  );
});

const guardarProducto = (data) => {
  arrayProducts.push(data);
  if (localStorage.getItem("productList")) {
    const productList = JSON.parse(localStorage.getItem("productList"));
    productList.push(data);
    localStorage.setItem("productList", JSON.stringify(productList));
  } else {
    localStorage.setItem("productList", JSON.stringify(arrayProducts));
  }
  listarDatos();
};

const listarDatos = () => {
  listaProductos.innerHTML = "";
  let array = JSON.parse(localStorage.getItem("productList"));
  array.forEach((element) => {
    const { codigo, referencia, nombre, imageUrl } = element;
    listaProductos.innerHTML += `
            <div class="card-container">
                <div class="card">
                    <img src="${imageUrl}" alt="image"/>
                    <h4>${codigo}</h4>
                    <h4>${referencia}</h4>
                    <h4>${nombre}</h4>
                    <a id="delete"><i class="material-icons delete">delete</i></a>
                </div>
            </div>
        `;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  listarDatos();
  if (localStorage.getItem("productList"))
    arrayProducts = JSON.parse(localStorage.getItem("productList"));
});

listaProductos.addEventListener("click", (e) => {
  let text = e.path[2].childNodes[3].innerHTML;
  e.target.innerHTML === "delete" && eliminarDatos(text);
});

const eliminarDatos = (product) => {
  let index;
  arrayProducts.forEach((element, index) => {
    if (element.codigo == product) {
      index = index;
    }
  });

  arrayProducts.splice(index, 1);
  localStorage.setItem("productList", JSON.stringify(arrayProducts));
  listarDatos();
};
