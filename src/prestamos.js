const divPrestamos = document.getElementById('prestamosContenedor')

const obtenerDatos = async () => {
    const datos = await fetch ('./data/data.json');
    const prestamos = await datos.json();

    prestamos.forEach(prestamo =>{
        divPrestamos.innerHTML += `<div class="tarjeta" style="width: 18rem;">
                                        <img src="${prestamo.img}" class="card-img-top" alt="${prestamo.nombre}">
                                        <div class="card-body">
                                            <h5 class="card-title">${prestamo.nombre}</h5>
                                            <p class="card-text"><strong>Monto: ${prestamo.monto}</strong></p>
                                            <p class="card-text" Cuota: $${prestamo.cuota}</p>
                                            <button class="btn btn-warning" id="button${prestamo.id}">Agregar</button>
                                         </div>
                                    </div>`
    });

}

obtenerDatos()



