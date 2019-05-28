import Vista from "./vista.js"

export default class Agenda{
    constructor(tablaAgenda, tablaInfo){
        this._tablaAgenda = tablaAgenda;
        this._tablaInfo = tablaInfo;
        
        this._agenda = null;

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

            this._agregarAlaTabla(new Contact(cnts));
        })
    }
    acomEdad(){
        let contacto = [];
        console.log(contacto);
        this._contactos.forEach((cnts,index) => {
            contacto.push(new Contact(cnts))
        })

        contacto.sort(function (a, b){return a.getAge() > b.getAge() });
        
    }
    _eliminar(row,agendaTelefonos){
        for(let i = 0; i < this._contactos.length;i++){
            if (agendaTelefonos.apodo === this._contactos[i].apodo){
                this._contactos.splice(i,1);
        break}
        }
        console.log(this._contactos);
        row.innerHTML= "";
        location.reload();
        localStorage.setItem("Contactos", JSON.stringify(this._contactos));
    }
    _agregarBotonEliminar(row, agendaTelefonos){
        let btnEliminar = document.createElement("input");
        btnEliminar.type = "button";
        btnEliminar.value = "Eliminar";
        btnEliminar.className = "btn btn-danger";
        btnEliminar.addEventListener("click",()=>{
        this._eliminar(row,agendaTelefonos);
        })
        
        row.cells[6].innerHTML = "";
        row.cells[6].appendChild(btnEliminar);
    }
    _agregarAlaTabla(agendaTelefonos){
        let row = this._tablaAgenda.insertRow(-1);
        //tabla grande
        let cellNombre = row.insertCell(0);
        let cellApellido = row.insertCell(1);
        let cellApodo = row.insertCell(2);
        let cellCumpleanos= row.insertCell(3);
        let cellTelefono = row.insertCell(4);
        let cellEdad = row.insertCell(5);
        row.insertCell(6);

        cellNombre.innerHTML = agendaTelefonos.name;
        cellApellido.innerHTML = agendaTelefonos.surName;
        cellApodo.innerHTML = agendaTelefonos.apodo;
        cellCumpleanos.innerHTML = agendaTelefonos.getFechaBirthAsString();
        cellTelefono.innerHTML = agendaTelefonos.telephone;
        cellEdad.innerHTML = agendaTelefonos.getAge();
        
        this._agregarBotonEliminar(row,agendaTelefonos);

        //tabla pequeña
        this._numContactos++;
        this._edadProm += agendaTelefonos.getAge(); // this._edadProm = this._edadProm + employee.getAge()

        this._tablaInfo.rows[0].cells[1].innerHTML = this._numContactos;
        this._tablaInfo.rows[1].cells[1].innerHTML = this._edadProm / this._numContactos;

        let objTelefonos={
            name : agendaTelefonos.name,
            surName : agendaTelefonos.surName,
            apodo : agendaTelefonos.apodo,
            fechaBirth : agendaTelefonos.fechaBirth,
            telephone : agendaTelefonos.telephone
        };
        this._contactos.push(objTelefonos);
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
    agregarTeleF(agendaTelefonos){
        let encontrar = this._encontrarTelefono(agendaTelefonos.apodo);
        if (encontrar >=0){
            swal.fire({
            type: "error",
            title: "error",
            text: "El contacto ya esta registrado"
            });
            return;
        }
        this._agregarAlaTabla(agendaTelefonos);
        localStorage.setItem("Contactos",JSON.stringify(this._contactos));
    }
}