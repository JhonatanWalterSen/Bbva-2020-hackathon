let btnLima = document.querySelector('.btn-lima')
let sectionLima = document.querySelector('.section-lima')
let distrito = document.querySelector('#distrito');

// 

function getProvincias() {
    // http://127.0.0.1:3000
    // https://samsamtechbbva.herokuapp.com
    axios.get("https://samsamtechbbva.herokuapp.com/Provicina/getTProvincias")
        .then(data => {
            let provincias = data.data
            let provincia_select = document.getElementById("provincia")

            provincias.forEach(provincia => {
                let option = document.createElement('option');
                option.setAttribute('value', provincia.id_provincia);
                option.appendChild(document.createTextNode(provincia.nombre));
                provincia_select.appendChild(option);
            })
        })
        .catch(error => {
            console.log(error);
        })
}

getProvincias();

let provincia_select = document.getElementById("provincia");

provincia_select.addEventListener('change', function () {
    getDistritosPorProvincia()
});

let distrito_select = document.getElementById("distrito");

distrito_select.addEventListener('change', function () {
    getSedes()
});

function getDistritosPorProvincia() {
    let provincia_select = document.getElementById("provincia");
    var provincia_value = provincia_select.value;
    if (typeof provincia_value == 'select') return;

    axios.post("https://samsamtechbbva.herokuapp.com/Distrito/getDistritoByProv", { prov_id: provincia_value })
        .then(data => {
            let distritos = data.data
            let distrito_select = document.getElementById("distrito")

            removeOptions(distrito_select);

            let option = document.createElement('option');
            option.setAttribute('value', 'select');
            option.appendChild(document.createTextNode("Seleccione"));
            distrito_select.appendChild(option);

            distritos.forEach(provincia => {
                let option = document.createElement('option');
                option.setAttribute('value', provincia.id_distrito);
                option.appendChild(document.createTextNode(provincia.nombre));
                distrito_select.appendChild(option);
            })
        })
        .catch(error => {
            console.log(error);
        })
}


function getSedes() {
    let distrito_select = document.getElementById("distrito");
    var distrito_value = distrito_select.value;

    if (distrito_value == 'select') return;
    axios.post("https://samsamtechbbva.herokuapp.com/Sede/getSedes", { distrito: distrito_value })
        // axios.post("https://samsamtechbbva.herokuapp.com/Sede/getSedes", { distrito: 102137 })
        .then(data => {
            // console.log("SEDES ::", data.data);

            let sedes = data.data
            mostrarInfo(sedes)
        })
        .catch(error => {
            console.log(error);
        })
}


function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}

btnLima.addEventListener('click', ventanaLima)

var intervalId = window.setInterval(function () {
    getSedes()
}, 2000);

function ventanaLima() {
    sectionLima.classList.toggle('activo')
}

const datosBusqueda = {
    distrito: ''
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
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}

function mostrarInfo(limaSedes) {
    limpiarHTML();
    const contenedor = document.querySelector('#resultado');
    let hora = new Date()

    // console.log(limaSedes);
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
            ubiHtml, img } = lima
        const limaHTML = document.createElement('div');
        limaHTML.classList.add('cardHTML')

        limaHTML.innerHTML = `
            <div class="card-distritos" >
                <div class="ditrito-img">
                    <div class="aforo-ofi"><span>${oficina}</div>
                    ${ubiHtml}   
                    <div class="aforo"><p>CAPACIDAD<p><span>${AforoTotal}</span></div>
                    <div class="aforo-time"><p>Visualizado a las:</p><span>${hora.getHours() + ':' + hora.getMinutes()} pm</span></div>
                </div>
                <div class="contenido-detalle">
                    <p class="text-align-center">Dirección: ${direccion} </p>
                </div>
                <div class="contenido-detalle">
                    <p class="derecho">Horario: 9 am. - 6 pm.</p>
                    <p class="derecho">Días: lunes a viernes </p>
                </div>

                <div class="contenido-detalle">
                    <p class="derecho">Cuenta con: </p>
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
                            <td > ${ticketsPlataforma + ticketsVenanilla + sensorPersonasCajero}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>    
                
                <div class="contenido-detalle">
                    <div>
                        <p id="myChart">
                            <span class="circular-porcentaje ">
                                ${Math.trunc(((ticketsPlataforma + ticketsVenanilla + sensorPersonasCajero) * 100) / AforoTotal)} %
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
    if (resultado.length) {
        mostrarInfo(resultado);
    } else {
        noResultado();
    }
}


function filtrarDistrito(lima) {
    if (datosBusqueda.distrito) {
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
