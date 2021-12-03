class Vino {
    constructor(id, cepa, cosecha, info, imagen, stock, cantidad) {
        this.id = id;
        this.cepa = cepa;
        this.cosecha = cosecha;
        this.info = info;
        this.imagen = imagen;
        this.stock = stock;
        this.cantidad = cantidad || 0

    }
    aumentarCantidad() {
        this.cantidad++
    }
}

const vinos = [];
const carrito = [];

const vino1 = new Vino(1, "Malbec Salta", "2021", "Envuelve los sentidos con un exquisito bouquet de ciruela dulce y picante.", "../Multimedia/Imagenes/PortfolioVinos/MalbecSalta.jpg", 10);
const vino2 = new Vino(2, "Cabernet Sauvignon", "2019", "De color púrpura intenso con aromas brillantes de frutos rojos y especias.", "../Multimedia/Imagenes/PortfolioVinos/CabernetSauv.jpg", 5);
const vino3 = new Vino(3, "Malbec + Tannat", "2020", "Posee una alta estructura  y acidez que se equilibran en un final persistente.", "../Multimedia/Imagenes/PortfolioVinos/MalbecTannat.jpg", 4);
const vino4 = new Vino(4, "Malbec Premium", "2015", "Calienta el paladar con notas de moras, arándanos y lavanda.", "../Multimedia/Imagenes/PortfolioVinos/MalbecPremium.jpg", 6);
const vino5 = new Vino(5, "Rosé", "2021", "Es un vino de cuerpo medio que seducirá tus sentidos con sus aromas florales.", "../Multimedia/Imagenes/PortfolioVinos/RoseMendoza.jpg", 8);
const vino6 = new Vino(6, "Torrontés", "2021", "Estalla con aromas tropicales de piña, melocotón y flor de azahar del naranjo.", "../Multimedia/Imagenes/PortfolioVinos/TorrontesSalta.jpg", 3);
const vino7 = new Vino(7, "Malbec Mendoza", "2021", "Tienta los sentidos con un aromático bouquet de café y especias.", "../Multimedia/Imagenes/PortfolioVinos/MalbecMendoza.jpg", 7);


vinos.push(vino1, vino2, vino3, vino4, vino5, vino6, vino7);

const productos = document.getElementById('contenedorCarrito')

for (const vino of vinos) {
    const contenedor = document.createElement('div')
    contenedor.className = 'card'
    contenedor.innerHTML = `
                            <div class="card-vinos" style="width: 18rem;">
                            <img src="${vino.imagen}" class="card-img-top" style="width: 50px;" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${vino.cepa}</h5>
                                <p class="card-text">${vino.info}</p>
                            </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item"> Cosecha: ${vino.cosecha}</li>
        <li class="list-group-item">
        <button id=${vino.id} class="btn btn-primary reservar">Comprar</button>
        </li>
    </ul>
    </div>`
    contenedorCarrito.append (contenedor)
    document.getElementById(`${vino.id}`).addEventListener(`click`, () => comprarVino(vino))
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
    if(carritoStorage){
        for(let i = 0; i < carritoStorage.length; i++){
            carrito.push(new Vino(carritoStorage[i].id, carritoStorage[i].cepa, carritoStorage[i].cosecha, carritoStorage[i].stock, carritoStorage[i].cantidad))
        }
    }
}

//Acá intenté cargar de nuevo la cantidad, y que me quedara seteado en el carrito lo que el usuario yá seleccionó previamente
//Como verás fallé jajaja
/* const nuevaCompra = JSON.parse(localStorage.getItem('carrito'))
let total = 0; 
    for(let i=0; i<carrito.length;i++){
        total += carrito[i].cantidad;
    }
    const compraProductos = document.getElementById('compraProductos');
    compraProductos.innerHTML = total;
    localStorage.setItem('carrito', JSON.stringify(carrito));


 */







































/* let usuario;
let pedido;
let cantidadUsuarios = 1;
const totalUsuarios = [];


class Usuario {
    constructor(datosUsuario, nombre, apellido, email, edad) {
        this.datosUsuario = datosUsuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.edad = edad;
    }
    
}
class Productos {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
    sumaIva() {
        this.precio = this.precio * 1.21;
    }
}
const producto1 = new Productos("Malbec", "850");
const producto2 = new Productos("Cabernet Sauvignon", "800");
const producto3 = new Productos("Malbec Tannat", "1150");
const producto4 = new Productos("Chardonnay", "1300");

const preciosProductos = [producto1, producto2, producto3, producto4];
const vinosEconomicos = preciosProductos.filter( preciosProductos => preciosProductos.precio < 1100);
console.log(vinosEconomicos);

producto1.sumaIva();
producto2.sumaIva(); 
producto3.sumaIva(); 
producto4.sumaIva();  

function infoUsuario(){
    const nombreUsuario = prompt('Ingresa tu nombre:');
    const apellidoUsuario = prompt('Ingrese su apellido:');
    const emailUsuario = prompt('Ingrese su email:')
    const edadUsuario = parseInt(prompt('Ingresa tu edad:'));
    console.log ('!Bienvenido¡' + " " + nombreUsuario + " " + apellidoUsuario);
    console.log('Su email es ' + emailUsuario);
    console.log('Tu edad es: ' + edadUsuario );


    usuario = new Usuario (cantidadUsuarios, nombreUsuario, apellidoUsuario, emailUsuario, edadUsuario);
    console.log(usuario);


    totalUsuarios.push(usuario);
    console.log(totalUsuarios.length);
    cantidadUsuarios++;
}

infoUsuario();


let productosSeleccionados = prompt("Selecciona un producto \n 1 - Malbec \n 2 - Cabernet Sauvignon \n 3 - Malbec Tannat \n 4 - Chardonnay");

switch (productosSeleccionados) {
    case "1":
        console.log('Precio final ' + producto1.precio)
        break;
    case "2":
        console.log('Precio final ' + producto2.precio)
        break;
    case "3":
        console.log('Precio final ' + producto3.precio)
        break;
    case "4":
        console.log('Precio final ' + producto4.precio)
        break;
    default:
    break;
}

for(const saludo of totalUsuarios){
    let contenedor = document.createElement("h2");
    let contenedorTitulo = document.createElement("h3");

    contenedor.innerHTML = `<h2> Hola ${saludo.nombre} ${saludo.apellido}, en que podemos ayudarte?<h2>`;
    contenedorTitulo.innerHTML = `<h3>Nuestros productos son:</h3>`
    document.body.appendChild(contenedor);
    document.body.appendChild(contenedorTitulo);
}

for (const producto of Productos) {
    let contenedor = document.createElement("div");
    contenedor.innerHTML = `
                            <div style="border: 1px solid;">
                            <p>  Producto: <b>${producto.nombre}</b></p>
                            <b> $ ${producto.precio}</b>
                            <br>
                            <button>COMPRAR</button></div>`;
    document.body.appendChild(contenedor);
    
} */