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

const productos = document.getElementById('shop')

for (const vino of vinos) {
    $('#shop').append(`
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
    </div>
    `)
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
    localStorage.setItem('carrito', carritoStorage)
    if(carritoStorage){
        for(let i = 0; i < carritoStorage.length; i++){
            carrito.push(new Vino(carritoStorage[i].id, carritoStorage[i].cepa, carritoStorage[i].cosecha, carritoStorage[i].info, carritoStorage[i].imagen, carritoStorage[i].stock, carritoStorage[i].cantidad))
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




