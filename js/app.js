let btnLima = document.querySelector('.btn-lima')
let sectionLima = document.querySelector('.section-lima')
let distrito = document.querySelector('#distrito');

btnLima.addEventListener('click', ventanaLima)

function ventanaLima () {
    sectionLima.classList.toggle('activo')
}

const datosBusqueda = {
    distrito : ''
}

document.addEventListener('DOMContentLoaded', () => {    
    mostrarInfo(limaSedes);
});

distrito.addEventListener('input', e => {
    datosBusqueda.distrito = e.target.value;
    filtrarLima();
});


function limpiarHTML() {
    const contenedor = document.querySelector('#resultado');
    while(contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

function mostrarInfo(limaSedes){
    limpiarHTML();
    const contenedor = document.querySelector('#resultado');
    let hora = new Date()

    /* console.log(limaSedes); */
    limaSedes.forEach(lima => {
        const { provincia,
		distrito,
		oficina,
		direccion,
		horario,
        dias,
		AforoTotal,
		personalVentanillasTrabajando,
		personalCajerosOperativos,
        personalPlataformaTrabajando,
        ticketsPlataforma,
        ticketsVenanilla,
        sensorPersonasCajero,
        ubiHtml,img} = lima
        const limaHTML = document.createElement('div');
        limaHTML.classList.add('cardHTML')
        
        limaHTML.innerHTML = `
            <div class="card-distritos">
                <div class="ditrito-img">
                    <div class="aforo-ofi"><span>${oficina}</div>
                    ${ubiHtml}   
                    <div class="aforo"><p>CAPACIDAD<p><span>${AforoTotal}</span></div>
                    <div class="aforo-time"><p>Visualizado a las:</p><span>${hora.getHours()+':'+hora.getMinutes()} pm</span></div>
                </div>
                <div class="contenido-detalle">
                    <p class="text-align-center">Dirección: ${direccion} </p>
                </div>
                <div class="contenido-detalle">
                    <p class="derecho">Horario: ${horario} </p>
                    <p class="derecho">Días: ${dias} </p>
                </div>

                <div class="contenido-detalle">
                    <p class="derecho">Cuanta con: </p>
                </div>

                <div class="contenido-detalle tabla-colaboradores">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Sector</th>
                                <th scope="col">Colaboradores</th>
                                <th scope="col">Aforo Actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">Plataforma</th>
                            <td>${personalPlataformaTrabajando}</td>
                            <td>${ticketsPlataforma}</td>
                            </tr>
                            <tr>
                            <th scope="row">Ventanilla</th>
                            <td>${personalVentanillasTrabajando}</td>
                            <td>${ticketsVenanilla}</td>
                            </tr>
                            <tr>
                            <th scope="row">Cajero</th>
                            <td > ${personalCajerosOperativos}</td>
                            <td > ${sensorPersonasCajero}</td>

                            </tr>
                            <tr>
                            <th scope="row"></th>
                            <td > </td>
                            <td > ${ticketsPlataforma+ticketsVenanilla+sensorPersonasCajero}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>    
                
                <div class="contenido-detalle">
                    <div>
                        <p id="myChart">
                            <span class="circular-porcentaje ">
                                ${Math.trunc(((ticketsPlataforma+ticketsVenanilla+sensorPersonasCajero)*100)/AforoTotal)} %
                            </span>
                        </p>
                    </div>
                </div>
                
            </div>

        `;
        contenedor.appendChild(limaHTML);
    })
}
/* ${ubiHtml}  */
function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.appendChild(document.createTextNode('No hay Resultados'));
    document.querySelector('#resultado').appendChild(noResultado);
}

function filtrarLima() {
   const resultado = limaSedes.filter(filtrarDistrito);
   if(resultado.length){
        mostrarInfo(resultado);
   } else {
       noResultado();
   }
}


function filtrarDistrito(lima) {
    if(datosBusqueda.distrito){
        return lima.distrito === datosBusqueda.distrito;
    } 
    return lima;
}

setTimeout(() => {
    let circular = document.querySelectorAll('.circular-porcentaje') 
    /* circular.classList.add('verde') */ 
    console.log(circular); 
    circular.forEach(value => {
        console.log(value.textContent);
        if (value.textContent >= 75) {
            console.log(vakue);
        }
    })
}, 200);
