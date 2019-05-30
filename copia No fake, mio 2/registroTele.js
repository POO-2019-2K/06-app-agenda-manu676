import Contacto from "./contacto.js";

export default class RegistroTele{
    constructor(tablaAgenda, tablaInfo){
        this._tablaAgenda = tablaAgenda;
        this._tablaInfo = tablaInfo;    

        this._numContactos = 0;
        this._edadProm = 0;

        //ARRAY de contactos 
        this._contactos = [];
        //localStorage.removeItem("Contactos");
        this._iniciarTabla();
    }
    _iniciarTabla(){
        let lsContacto = JSON.parse(localStorage.getItem("Contactos"));
        if(lsContacto === null){
            return;
        }
        lsContacto.forEach((cnts,index) => {
            cnts.fechaBirth = new Date (cnts.fechaBirth);

            this._agregarAlaTabla(new Contacto(cnts));
        })

    }
    _encontrarAcomodo(selecciones){
        if ( selecciones === "acomAlfa"){
            this.acomAlfa();
        }
        else if ( selecciones === "acomEdad" ){
            this.acomEdad();
        } 
    }
    acomEdad(){
        let contacto = [];
        contacto = this._contactos.slice(-this._numContactos);
        contacto = contacto.sort(function (a, b) {
            return a.age - b.age;
        })

        localStorage.setItem("Contactos",JSON.stringify(contacto));
        this._eliminarTablas();
        this._iniciarTabla();
    }

    acomAlfa() {
        let contacto = [];
        contacto = this._contactos.slice(-this._numContactos);
        contacto =contacto.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        } else {
            return -1;
        }
    });
    //Save in local Storange
    localStorage.setItem('Contactos', JSON.stringify(contacto));
    this._eliminarTablas();
    this._iniciarTabla();
}
_eliminarTablas(){ 
    let i;
    for(i=this._numContactos; i>0; i--){
        console.log(this._numContactos);
        this._tablaAgenda.deleteRow(i);
    }
    this._numContactos = 0;
}

    _eliminar(row,contact){
        for(let i = 0; i < this._contactos.length;i++){
            if (contact.apodo === this._contactos[i].apodo){
                this._contactos.splice(i,1);
        break}
        }
        console.log(this._contactos);
        row.innerHTML= "";
        location.reload();
        localStorage.setItem("Contactos", JSON.stringify(this._contactos));
    }
    _agregarBotonEliminar(row, contact){
        let btnEliminar = document.createElement("input");
        btnEliminar.type = "button";
        btnEliminar.value = "Eliminar";
        btnEliminar.className = "btn btn-danger";
        btnEliminar.addEventListener("click",()=>{
        this._eliminar(row,contact);
        })
        
        row.cells[6].innerHTML = "";
        row.cells[6].appendChild(btnEliminar);
    }
    _objetos(contact){
        let objTelefonos={
            name : contact.name,
            surName : contact.surName,
            apodo : contact.apodo,
            fechaBirth : contact.fechaBirth,
            age: contact.getAge(),
            telephone : contact.telephone
        };
        this._contactos.push(objTelefonos);
    }
    _contadorContactos(){
        this._tablaInfo.rows[0].cells[1].innerHTML = this._numContactos;
        this._tablaInfo.rows[1].cells[1].innerHTML = this._edadProm / this._numContactos;
    }
    _agregarAlaTabla(contact){
        let row = this._tablaAgenda.insertRow(-1);
        //tabla grande
        let cellNombre = row.insertCell(0);
        let cellApellido = row.insertCell(1);
        let cellApodo = row.insertCell(2);
        let cellCumpleanos= row.insertCell(3);
        let cellTelefono = row.insertCell(4);
        let cellEdad = row.insertCell(5);
        row.insertCell(6);

        cellNombre.innerHTML = contact.name;
        cellApellido.innerHTML = contact.surName;
        cellApodo.innerHTML = contact.apodo;
        cellCumpleanos.innerHTML = contact.getFechaBirthAsString();
        cellTelefono.innerHTML = contact.telephone;
        cellEdad.innerHTML = contact.getAge();
        
        this._agregarBotonEliminar(row,contact);
            //tabla pequeña
            this._numContactos++;
            this._edadProm += contact.getAge(); // this._edadProm = this._edadProm + employee.getAge()
        this._contadorContactos();

        this._objetos(contact);
    }    
    _encontrarTelefono(apodo){
        let encontrar = -1
        //cnts = contactos
        this._contactos.forEach((cnts,index) =>{
            if(cnts.apodo === apodo){
                encontrar = index;
                return;
            }
        });
        return encontrar;
    }
    agregarTeleF(contact){
        let encontrar = this._encontrarTelefono(contact.apodo);
        if (encontrar >=0){
            swal.fire({
            type: "error",
            title: "error",
            text: "El contacto ya esta registrado"
            });
            return;
        }
        this._agregarAlaTabla(contact);
        localStorage.setItem("Contactos",JSON.stringify(this._contactos));
    }
}