export default class Numbers {
    constructor(agendaTelefonos) {
    this._name = agendaTelefonos.name.toUpperCase();
    this._surName = agendaTelefonos.surName.toUpperCase();
    this._apodo = agendaTelefonos.apodo.toUpperCase();
    this._fechaBirth = new Date (agendaTelefonos.fechaBirth);
    this._telephone = agendaTelefonos.telephone;
    
    this._months = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
    ];
}

get name() {
    return this._name;
}
get surName() {
    return this._surName;
}
get apodo() {
    return this._apodo;
}
get fechaBirth() {
    return this._fechaBirth;
}
get telephone() {
    return this._telephone;
}

_getNumberAs2Digits(number){
    if (number < 10){
    //se convierte en string
    return "0"+number;
    } 
    return number;
}
//Fechas para la edicion de estos
getFechaBirthForDate(){
    //descomposicion
    let {fechaBirth} = this;
    let date = fechaBirth.getFullYear() + "-" + 
    this._getNumberAs2Digits(fechaBirth.getMonth()+1) + "-" +
    this._getNumberAs2Digits(fechaBirth.getDate());
    return date;
}
//Fecha para cumpleaños 
getFechaBirthAsString() {
    let date =
    this._fechaBirth.getDate() +
    "/" +
    this._months[this._fechaBirth.getMonth()] +
    "/" +
    this._fechaBirth.getFullYear();

    return date;
}
getAge() {
    let oneDay = 24 * 60 * 60 * 1000;
    let oneYear = oneDay * 365;
    let differenceMs = new Date() - this._fechaBirth;
    let age = Math.trunc(differenceMs / oneYear);

    return age;
}
}
