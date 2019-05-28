import RegistroTele from "./agendaTelefonos.js";
import Numbers from "./infoAgenda.js";

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

    let agendaTelefono = new Numbers(objTelefonos);

    agenda.agregarTeleF(agendaTelefono);
    }

    form.classList.add("was-validated"); 
});
document.querySelector("#acomodoEdad").addEventListener("click",()=>{

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

    let agendaTelefono = new Numbers(objTelefonos);

    agenda.acomEdad(agendaTelefono);

});
document.querySelector("#acomodoAlfa").addEventListener("click",()=>{

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

    let agendaTelefono = new Numbers(objTelefonos);

    agenda.acomAlfa(agendaTelefono);

});
}
}
let mainContactos = new Main();