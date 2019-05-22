import Numbers from "infoAgenda.js";

export default class RegistroTele{
    constructor(tablaAgenda, tablaInfo){
        this._tablaAgenda = tablaAgenda;
        this._tablaInfo = tablaInfo;

        this._numContactos = 0;
        this._edadProm = 0;

        //ARRAY de contactos 
        this._contactos = [];

        this._iniciarTabla();
    }
    _iniciarTabla(){
        let lsContacto = JSON.parse(localStorage.getItem("Contactos"));
        if(lsContacto === null){
            return;
        }
        lsContacto.forEach((cnts,index) => {
            cnts.fechaBirth = new Date (cnts.fechaBirth);

            this._agregarAlaTabla(new Numbers(cnts));
        })
    }
    _eliminar(row,agendaTelefonos){
        for(let i = 0; i < this._contactos.length;i++){
            if (agendaTelefonos.telephone === this._contactos[i].telephone){
                this._contactos.splice(i,1);
        break}
        }
        console.log(this._contactos);
        row.innerHTML= "";
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
        
        row.cells[4].innerHTML = "";
        row.cells[4].appendChild(btnEliminar);
    }
    _agregarAlaTabla(agendaTelefonos){
        let row = this._tablaAgenda.insertRow(-1);
        //tabla grande
        let cellNombre = row.insertCell(0);
        let cellApellido = row.insertCell(1);
        let cellCumpleanos= row.insertCell(2);
        let cellTelefono = row.insertCell(3);
        row.insertCell(4);

        cellName.innerHTML = agendaTelefonos.name;
        cellApellido.innerHTML = agendaTelefonos.surName;
        cellCumpleanos.innerHTML = agendaTelefonos.getFechaBirthAsString();
        cellTelefono.innerHTML = agendaTelefonos.telephone;
        
        this._agregarBotonEliminar(row,agendaTelefonos);

        this._numContactos++;
        this._edadProm += agendaTelefonos.getAge()
    }    
    _encontrarTelefono(telephone){
        let encontrar = -1
        //cnts = contactos
        this._contactos.forEach((cnts,index) =>{
            if(cnts.telephone === telephone){
                encontrar = index;
                return;
            }
        });
        return encontrar;
    }
    _agregarTeleF(agendaTelefonos){
        let encontrar = this._encontrarTelefono(agendaTelefonos.telephone);
        if (encontrar >=0){
            swal.fire({
            type: "error",
            title: "error",
            text: "El contacto ya esta registrado"
            });
            return;
        }
        this._agregarAlaTabla(agendaTelefonos);
        localStorage.setItem("Contactos",JSON.parse(this._contactos));
    }
}