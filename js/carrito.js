// VARIABLES
const vinos = [];
const carrito = [];
const productos = document.getElementById('shop')

// CARGA DE PRODUCTOS
$.getJSON('../data/productos.json', function (data){
    data.forEach(elemento => vinos.push(elemento))
    mostrarProductos();
    
})


class Vino {
    constructor(id, cepa, cosecha, precio, imagen, stock, cantidad) {
        this.id = id;
        this.cepa = cepa;
        this.cosecha = cosecha;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
        this.cantidad = cantidad || 0

    }
    aumentarCantidad() {
        this.cantidad++
    }
}


// FUNCION PARA AJAX Y DOM CON JQUERY
function mostrarProductos(){
for (const vino of vinos) {
    $('#shop').append(`
    <div class="card-vinos" style="width: 18rem;">
        <img src="${vino.imagen}" class="card-img-top" style="width: 50px;" alt="...">
        <div class="card-body">
            <h5 class="card-title">${vino.cepa}</h5>
        </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"> Cosecha: ${vino.cosecha}</li>
        <li class="list-group-item">
        <button id=${vino.id} class="btn btn-primary reservar">Comprar</button>
        </li>
    </ul>
    </div>
    `)
    document.getElementById(`${vino.id}`).addEventListener(`click`, () => comprarVino(vino))
}
}



function comprarVino(producto){
    let compra = carrito.find(el=> el.nombre === producto.nombre)
    if(compra){
        if(compra.cantidad < producto.stock){
            compra.aumentarCantidad();
        }
        
    }else{
        carrito.push(producto);
        producto.aumentarCantidad();
    }
    let total = 0;
    for(let i=0; i<carrito.length;i++){
        total += carrito[i].cantidad;
    }
    const compraProductos = document.getElementById('compraProductos');
    compraProductos.innerHTML = total;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarLocalStorage(){
    let carritoStorage = JSON.parse(localStorage.getItem('carrito'))
    localStorage.setItem('carrito', carritoStorage)
    if(carritoStorage){
        for(let i = 0; i < carritoStorage.length; i++){
            carrito.push(new Vino(carritoStorage[i].id, carritoStorage[i].cepa, carritoStorage[i].cosecha, carritoStorage[i].precio, carritoStorage[i].info, carritoStorage[i].imagen, carritoStorage[i].stock, carritoStorage[i].cantidad))
        }
        let total = 0;
    for (let i=0; i<carrito.length;i++){
        total += carrito[i].cantidad;
    }
    const compraProductos = document.getElementById('compraProductos');
    compraProductos.innerHTML = total;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    }
}

cargarLocalStorage();




