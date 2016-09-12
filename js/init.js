
//Trae e imprime el listado guardado en Local Storage.
var ini = function(){

  for (i=0;i<localStorage.length;i++) {
    var primeraTarea = localStorage.getItem(localStorage.key(i));
    var objTarea = JSON.parse(primeraTarea);
    imprimirlistado(objTarea);

    }

}();
