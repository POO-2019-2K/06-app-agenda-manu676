import Vista from "./vista.js"

export default class Agenda{
    constructor(){
        //ARRAY de contactos 
        this._contactos = [];
    }
    conseguirContacto(){
        let conseguirContacto = JSON.parse(localStorage.getItem("this._contactos"))
        this._contactos= conseguirContacto;
        return conseguirContacto;
    }
    //Metodo para acomodar por edad 
    acomodarEdad(){
        this.conseguirContacto();
        this._contactos.sort(function (a, b) {
            return a.age - b.age;
        });
        return this._contactos;
    }
    //Metodo para acomodar por nombre
    acomodarNombre(){
        this.conseguirContacto();
        this._contactos.sort(function(a,b){
            let nombre1 = a.name.toUpperCase();
            let nombre2 = b.name.toUpperCase();
            if (nombre1 < nombre2){
                return -1;
            }
            if (nombre1 > nombre2){
                return 1;
            }
            return 0;
        }) 
    }
    eliminarCnts(contacto){
        for(let i = 0; i < this._contactos.length;i++){
            if (contacto.apodo === this._contactos[i].apodo){
                this._contactos.splice(i,1);
        break}
        }
        console.log(this._contactos);
        row.innerHTML= "";
        location.reload();
        localStorage.setItem("Contactos", JSON.stringify(this._contactos));
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

}