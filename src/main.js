const nombre = document.getElementById("firstName");
const apellido = document.getElementById("lastName");
const email = document.getElementById("email");
const monto = document.getElementById("amount");
const cuotas = document.getElementById("fees");
const formulario = document.getElementById("form");
const montoFinal = document.getElementById("finalAmount");
const cuotasFinales = document.getElementById("finalFees");
const intereses = document.getElementById("interests");
const totalADevolver = document.getElementById("totalAmount");

const tasa = 0.01; // 1%

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if(nombre.value == "" || apellido.value == "" || email.value =="" || monto.value == "" || cuotas.value ==""){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Todos los campos deben ser completados',
    }); 
  } else if(cuotas.value < 1 || cuotas.value > 12){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'el rango de cuotas es de 1 a 12',
    });
  } else if (monto.value < 5000 || monto.value > 1000000){
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'el monto no debe ser menor de 5000 o mayor a 1000000',
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Excelente ',
      text: `Muchas gracias ${nombre.value}. En breve recibira más información a ${email.value}`,
    });
  }

  obtenerCuotaPrestamo();

});

const obtenerCuotaPrestamo = () => {
  const cuotaPrestamo = tasa * monto.value / (1 - (1 + tasa) ** - cuotas.value);
  obtenerTotal(cuotaPrestamo);
};

const obtenerTotal = (cuotaPrestamo) => {
  const total = Math.ceil(cuotaPrestamo) * cuotas.value;

  const prestamo = {
    monto: monto.value,
    cuotas: cuotas.value,
    intereses: total - monto.value,
    totalPrestamo: total
  }

  pintarPrestamo(prestamo);
  guardarPrestamoStorage(prestamo)
};

const pintarPrestamo = (prestamo) => {
  montoFinal.innerText = `$${prestamo.monto}`;
  cuotasFinales.innerText = `${prestamo.cuotas}`;
  intereses.innerText = `$${prestamo.intereses}`;
  totalADevolver.innerText = `$${prestamo.totalPrestamo}`;
};

const guardarPrestamoStorage = (prestamo) => {
  localStorage.setItem('prestamo', JSON.stringify(prestamo));
};

const obtenerPrestamoStorage = () => {
  const prestamoStorage = JSON.parse(localStorage.getItem('prestamo'));

  pintarPrestamo(prestamoStorage);
};

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('prestamo')) {
    obtenerPrestamoStorage();
  }
})