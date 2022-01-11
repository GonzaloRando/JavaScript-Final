let carrito = []
let dataCarrito = localStorage.getItem("carrito");

if(dataCarrito) {
    carrito = JSON.parse(dataCarrito)
    mostrarCarrito()
}
function mostrarCarrito(){
    document.getElementById("pintarProductos").innerHTML = ""
    for(const vino of carrito){
        $('#pintarProductos').append( `
        <div class="card-vinos" style="width: 18rem;">
            <img src="${vino.imagen}" class="card-img-top" style="width: 50px;" alt="vino.cepa">
            <div class="card-body">
                <h5 class="card-title">${vino.cepa}</h5>
            </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"> Cosecha: ${vino.cosecha}</li>
            <p class="card-text">Unidades seleccionadas(${vino.cantidad})</p>
            <p class="card-text">Productos disponibles(${vino.stock})</p>
            <p class="card-text"><b>$ ${vino.precio}</b></p>
            <button id="${vino.id}eliminar" class="btn btn-primary delete">🗑️</button>
        </ul>
        </div>
        `)

        document.getElementById(`${vino.id}eliminar`).addEventListener('click', () => eliminar(vino))
    }

}


function eliminar(producto){
    const eliminado = carrito.find(el => el.id === producto.id)
    if(eliminado.cantidad > 1 ){
        eliminado.cantidad--
    }else{
        carrito = carrito.filter(el => el.id !== producto.id)
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito()

}

