
var botones = document.getElementById('agregarTarea');
var ingresos = document.getElementById('nuevaTarea');
var tareaEnEdicion = {};
var editarId;
var listado = document.getElementById('listadoTareas');
var editMode = false;
var task = listado.getElementsByTagName('tr');


var funcionBoton = botones.onclick = function(){
	if(editMode){
		for(var i = 0; i < task.length; i++){
			if(task[i].id == editarId){
				task[i].getElementsByTagName('td')[1].innerHTML = ingresos.value;
			break;
		}};

		tareaEnEdicion.Tarea = ingresos.value;
		localStorage.setItem(editarId, JSON.stringify(tareaEnEdicion));
		editMode = false;

	}
	else {

		var nuevaTarea = ingresos.value;
		var nuevoIds = Date.now();
		var nuevoEstado = "Pendiente"
		var nuevaaccion = "Eliminar"


	//CONSTRUYE OBJETO
		function constructorTareas(Ids,tarea,estado,acciones) {

			this.Ids = Ids;
	  		this.Tarea = tarea;
	  		this.Estado = estado;
	  		this.Acciones = acciones;

		};

	//LLENA CON VALORES EL OBJETO
		var primeraTarea = new constructorTareas (nuevoIds,nuevaTarea,nuevoEstado,nuevaaccion);


		localStorage.setItem(primeraTarea.Ids,JSON.stringify(primeraTarea));
		imprimirListado(primeraTarea);


	}
};
//IMPRIMIR listado

function imprimirListado(tareas){

	var row = listado.insertRow(0);
	var celda1 = row.insertCell(0);
	var celda2 = row.insertCell(1);
	var celda3 = row.insertCell(2);
	var celda4 = row.insertCell(3);

	celda1.innerText = tareas.Ids;
	celda2.innerText = tareas.Tarea;
	celda3.innerText = tareas.Estado;
	celda4.innerHTML = '<a href="#" id="Editar-'+ tareas.Ids+'">  Editar </a> / <a href="#"" id="Elimina-'+ tareas.Ids+'">  Eliminar </a>';
	row.id = tareas.Ids

////////////////////////////////////
/////////BOTON DE ELIMINAR/////////
//////////////////////////////////

	var eliminarTarea = document.getElementById('Elimina-'+ tareas.Ids);

  	eliminarTarea.onclick = function(){

		var idCortado = eliminarTarea.id.split('-')[1];
		for (var i = 0; i < localStorage.length; i++) {
			if(idCortado==localStorage.key(i)){
				localStorage.removeItem(localStorage.key(i));
		          document.getElementById(idCortado).remove();
			}
   		};
 	};

////////////////////////////////////
/////////BOTON DE EDITAR //////////
//////////////////////////////////

	var editarTarea = document.getElementById('Editar-'+ tareas.Ids);

	editarTarea.onclick = function(){


		var idCortado = editarTarea.id.split('-')[1];
	    	for (var i = 0; i < localStorage.length; i++) {
		    	if (idCortado==localStorage.key(i)) {
			   	ingresos.value = tareas.Tarea;
			   	editMode = true;
			   	editarId = tareas.Ids;
			   	tareaEnEdicion = JSON.parse(localStorage.getItem(editarId));
			   	break;

		   	}
	   	}
  	};
};
