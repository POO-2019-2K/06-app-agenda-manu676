export default class Vista{
    constructor(tablaAgenda,TablaInfo){
        this._tablaAgenda = tablaAgenda;
        this._tablaInfo = TablaInfo;

        this._agenda = null;
        this._numContacto= 0;
        this._ordenamiento = "basico"
    }
    set agenda(agenda){
        this._agenda = agenda;
    }
    anadirVista(contacto){
        this._agregarAlaTabla(contacto)
    }
    _guargar(){
        localStorage.setItem("Ordenamiento",JSON.stringify(this._ordenamiento));
    }
    conseguir(){
        this._ordenamiento = JSON.parse(localStorage.getItem("Ordenamiento"));
    }
    _btnEliminar(row, contacto){
        let btnEliminar = document.createElement("input");
        btnEliminar.type = "button",
        btnEliminar.id = "btnEliminar",
        btnEliminar.value = "Eliminar",
        btnEliminar.className = "Boton Eliminar",
        btnEliminar.addEventListener("click",()=>{
            Swal.fire({
                type : "warning",
                text : "Se eliminara este contacto, seguro??",
                showCancelButton : true,
                confirmButtonColor: "danger",
                confirmButtonText: "Eliminar",
                cancelButtonText : "Cancelar",
                cancelButtonColor: "success"
                
            }).then((reaccion)=>{
                if(reaccion.value){
                    this._agenda.eliminar(contacto);
                    this.impriContactos();
                    Swal.fire({
                        type: "success",
                        text: "Eliminado Exitosamente"
                    });
                }
            })
        }); 
        row.cells[6].innerHTML = "";
        row.cells[6].appendChild(btnEliminar);   
    }
    agregarContacto(contacto){
        this._agregarAlaTabla(contacto);
        Swal.fire({
            type:"success",
            text : "Contacto ha sido registrado",
            title : "Añadido"
        });
        this._ordenamiento = "basico"
        this._guardar()
    }
    _agregarAlaTabla(contacto, index){
        let row = this._tablaAgenda.insertRow(-1);

        let cellName = row.insertCell(0);
        let cellSurName = row.insertCell(1);
        let cellApodo = row.insertCell(2);
        let cellFechaBirth = row.insertCell(3);
        let cellTelephone = row.insertCell(4);
        let cellAge = row.insertCell(5);
        row.insertCell(6);
        //Agregarlos como texto
        let nameText = document.createTextNode(contacto.name);
        let surNameText = document.createTextNode(contacto.SurName)
        let apodoText = document.createTextNode(contacto.apodo)
        let cumpleText = document.createTextNode(contacto.cumpleString);
        let telephoneText = document.createTextNode(contacto.telephone);
        let ageText = document.createTextNode(contacto.age);

        cellName.appendChild(nameText);
        cellSurName.appendChild(surNameText);
        cellApodo.appendChild(apodoText);
        cellFechaBirth.appendChild(cumpleText);
        cellTelephone.appendChild(telephoneText);
        cellAge.appendChild(ageText);
        this._btnEliminar(row,contacto);

        this._numContacto++;
        this._tablaInfo.rows[0].cells[1].innerHTML = this._numContacto;
    }
    _limpiar(){
        for (let i = 0; i < this._numContacto; i++) {
            this._tableAgenda.deleteRow(-1);
        }
        this._numContacto = 0;
    }
    //Sacar x Nombre
    ordenarXnombre() {
        this._limpiar();
        this._agenda.sortNombre().forEach((cnts, index) => {
            this._agregarAlaTabla(cnts, index);
        });
        this._ordenamiento = "Nombre";
        this._guargar();
    }
    //Sacar x Edad
    ordenarXedad() {
        this._limpiar();
        this._agenda.sortEdad().forEach((cnts, index) => {
            this._agregarAlaTabla(cnts, index);
        });
        this._ordenamiento = "Edad";
        this._guargar();
    }
    //Sacar Normal (Basico)
    ordenarXdefault() {
        this._limpiar();
        this._agenda.contacts.forEach((cnts, index) => {
            this._agregarAlaTabla(cnts, index);
        });
        this._ordenamiento = "Basico";
        this._guargar();
    }

    vistaContactos() {
        if (this._ordenamiento === "Basico") {
            this.ordenarXdefault();
        } else if (this._ordenamiento === "Nombre") {
            this.ordenarXnombre();
        } else if (this._ordenamiento === "Edad") {
            this.ordenarXedad();
        }
    }

    modoVista() {
        this.conseguir();
        this.vistaContactos();
    }
}
