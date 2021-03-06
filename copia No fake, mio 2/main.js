import RegistroTele from "./registroTele.js";
import Contacto from "./contacto.js";

class Main {
constructor() {
let agenda = new RegistroTele(
    document.querySelector("#agenda"),
    document.querySelector("#info")
);

document.querySelector("#btnAdd").addEventListener("click", () => {
    let form = document.querySelector("#form");

    if (form.checkValidity() === true) {
    let name = document.querySelector("#name").value;
    let surName = document.querySelector("#surname").value;
    let apodo = document.querySelector("#apodo").value;
    let cumple = document.querySelector("#cumpleAños").value;
    cumple = cumple.split("-");

    let fechaBirth = new Date(cumple[0], cumple[1] - 1, cumple[2]);

    let telephone = document.querySelector("#telefono").value;

    let objTelefonos = {
        name: name,
        surName : surName,
        apodo : apodo,
        fechaBirth: fechaBirth,
        telephone: telephone,
    };

    let contact = new Contacto(objTelefonos);

    agenda.agregarTeleF(contact);
    }

    form.classList.add("was-validated"); 
});
    let seleccion = document.getElementById("acomodo");
    seleccion.addEventListener("change",()=>{
        var selecciones = seleccion.value;
        if (selecciones === "Basico"){
            swal.fire({
                type: "error",
                title: "error",
                text : "Selecciona una opción"
                });
        }else{
            agenda._encontrarAcomodo(selecciones);
        }
    })
}
}
let mainContactos = new Main();