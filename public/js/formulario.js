function entrarFoco(elemento){
	
	//Cambiar el nombre de la clase del elemento HTML
	elemento.className="enfoco";
	
}

function salirFoco(elemento){
	
	//Quitar el nombre de la clase del elemento HTML
	elemento.className="";
	
	
}

function revisarObligatorio(elemento){
	
	//Si el valor del elemento es vacio
	if(elemento.value==""){
		
		//Cambiar el nombre de la clase del elemento HTML
		elemento.className="error";
	}
	else{
		
		//Quitar el nombre de la clase del elemento HTML
		elemento.className="";
		
	} //Cierre del else
} //Cierre de la función