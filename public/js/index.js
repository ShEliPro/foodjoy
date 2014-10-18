/*Cuando el documento esté preparado, por eso estamos accediendo al método ready, ejecutaremos una funcion.*/
/*La función inicializar no contiene ningún parámetro.*/
$(document).ready(function(){

	/*elementos que contienen la id --> registro */
	$("#registro").submit(function(event) {
		
		/*Cuando el usuario haga click en el boton de registrar con el tipo--> submit, ejecutaremos una función, que se le pasará un evento.*/
		
		event.preventDefault();
		
		/* Se limpia el resultado anterior */
		$("#contentDiv").html('...');
		
		/*el méotdo serializeArray --> crea un array de objetos JavaScript para codificar una cadena JSON.*/
		var formData = $(this).serializeArray();
		
		/*Con el objeto this podemos acceder a sus propiedades que lo guardamos en una variable llamado formData.*/
		$.ajax({
			
			type: "POST",
			url: "/user",
			dataType: "html",
			data: formData,
			
			success: function(data){
				
				/*Muestra los datos en la caja div con el id --> contenidoDiv*/
				$("#contentDiv").html(data);
           },
		   
           error: function(XMLHttpRequest, textStatus, errorThrown) {

              console.log(XMLHttpRequest.responseText);
              $( "#contentDiv" ).html(XMLHttpRequest.responseText);
           }
		
		//Cierre del ajax
		});
	
	//Cierre del registro
	});
	
	 
	
	$("#boton").click(function(event) {

		$.ajax({

			type: "GET",
			url: "/listaRecetas",
			dataType: "json",
			success: function(data){

				  document.getElementById("recetas").innerHTML = data.nombre;
				  var recetas = "<p> Nombre:"+data.nombre+"</p><p>Ingredientes:<br>"+data.ingredientes[0]+";"+data.ingredientes[1]+"</p>";		

				$("#contentDiv").html(recetas);
				
			}

		});            

	//Cierre del botón
	});

//Cierre del documento	
}); 