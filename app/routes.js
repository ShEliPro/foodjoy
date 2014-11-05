//Cargamos el modelo recetas
var Recetas = require('../app/models/recetas');

//Cargamos el modelo usuarios
var User = require('../app/models/user');


//module.exports es el objeto que se devuelve tras una llamada request
//así podemos usar express y passport pasando como parámetro
module.exports = function(app, passport, nodemailer) {

// RUTAS ===============================================================

	// =====================================
	// PAGINA PRINCIPAL ====================
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});


	// =====================================
	// REGISTRO ===========================
	// =====================================
	
	//Obtiene los datos del formulario del registro autentificando el usuario
	app.post('/signup', passport.authenticate('local-signup', {

		successRedirect : '/profile', //si los datos son correctos entraremos al perfil
		failureRedirect : '/', //si hay un error o los datos no son correctos redirecciona a la página principal


	}));



	// =====================================
	// LOGIN ===============================
	// =====================================

	//Obtiene los datos del formulario del registro autentificando el usuario
	app.post('/login', passport.authenticate('local-login', {

		successRedirect : '/profile', // si los datos son correctos entraremos al perfil
		failureRedirect : '/', //si hay un error o los datos no son correctos redirecciona a la página principal

	}));


	// =====================================
	// PERFIL ==============================
	// =====================================

	//usamos la función isLoggedIn para verificar que el usario está logueado
	//ya que no queremos que nadie pueda acceder al perfil sin haberse autentificado antes
	app.get('/profile', isLoggedIn, function(req, res) {

		res.render('profile.ejs', {

			user : req.user // cogemos el usuario de la session gracias a passport y se lo pasamos a la plantilla (profile.ejs)
		
		//Cierre del método render
		});

	//Cierre de la función	
	});


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) { 

		req.logout(); //usamos req.logout() que nos proporciona passport. Sirve para salir de la sesión de usuario. 

		//Al cerrar la sesión, le redireccionamos a la página principal.
		res.redirect('/');

	//Cierre de la función
	});
	

	// =====================================
	// RECETAS =============================
	// =====================================

	//Mostrar la página para agregarRecetas
	app.get('/agregarRecetas', function(req, res) {
		res.render('agregarRecetas.ejs');
	});

	//Añadir un documento a la colección de recetas
	app.post('/agregarRecetas', function(req, res) {

		//Creamos una variable para crear un objeto de tipo Recetas
		var recetas = new Recetas ({

			nombre: req.body.nombre,
			ingredientes: req.body.ingredientes

		});

		//Para guardar dicha instancia en la base de datos
		recetas.save(function (err, obj) {

		  	//Si existe un error
			if(err){
				
				//Muestra por consola el error
		    	console.log('ERROR: ' + err);
			}
			else{

				//Muestra el mensaje por consola
  				console.log(obj.nombre + ' ha sido guardada.');
				
				//Muestra el mensaje en la página agregarRecetas.ejs
				res.render('recetaAgregada', {
					
					receta: obj.nombre,
					msg: ' ha sido guardada.'
					
				})
			
			//Cierre de else		
			}

		//Cierre del método save
		});		
		
	//Cierre de la función
	});


	//Obtener toda la colección de recetas
	app.get('/listaRecetas', function(req, res) {
		
		Recetas.find({},function(err,recetas){
			
			//Si existe un error
			if(err){
				
				//Muestra por consola
				console.log(err);
			}
			else{

				//Muestra el objeto recetas en la plantilla recetas.ejs
				res.render('recetasProfile', {
					
					recetas: recetas
					
				})
			
			//Cierre de else		
			}
		
		//Cierre del find
		});
		
	//Cierre de la función
	});

	//Mostrar la página para borrarRecetas
	app.get('/borrarRecetas', function(req, res) {
		res.render('borrarRecetas.ejs');
	});

	
	//Borrar un documento a la colección de recetas
	app.post('/borrarRecetas', function(req, res) {


		//Creamos una variable para obtener el nombre del formulario de la receta a eliminar 
		var nombre = req.body.nombre;

		//Para borrar una receta mediante el nombre
		Recetas.remove({nombre: nombre},function (err) {

			//Si no hay error
  			if (!err){

  				//Muestra el mensaje por consola
  				console.log(nombre + ' ha sido eliminada.');

  				//Muestra el mensaje en la página borrarRecetas.ejs
				res.render('recetaBorrada', {
					
					receta: nombre,
					msg: ' ha sido eliminada.'
					
				})
  								

  			}else{
		      
		      	//Muestra por consola el error
		    	console.log('ERROR: ' + err);

		  }


		//Cierre del remove	
		});
		
	//Cierre de la función
	});

	//Mostrar la página para buscarReceta para modificar una receta
	app.get('/modificarRecetas', function(req, res) {
		res.render('buscarReceta.ejs');
	});

	//Obtener un documento de la colección de recetas
	app.post('/modificarRecetas', function(req, res) {


		//Creamos una variable para obtener el nombre del formulario de la receta a obtener
		var nombre = req.body.nombre;

		//Para borrar una receta mediante el nombre
		Recetas.findOne({nombre: nombre},function (err,receta) {

			//Si no hay error
  			if (!err){

  				//Mostramos un mensaje por consola
  				console.log(nombre + ' va a ser modificada.');

				//Muestra el objeto receta en la página modificarRecetas.ejs
				res.render('modificarRecetas', {
					
					receta: receta
					
				})

  			}
  			else{
		      
		      	//Muestra por consola el error
		    	console.log('ERROR: ' + err);
			}


		//Cierre del findOne	
		});
		
	//Cierre de la función
	});


	//Modificar un documento de la colección de recetas
	app.post('/recetaModificada', function(req, res) {

		//Guardamos los datos obtenidos desde el formulario en las variables a modificar
		var nombre= req.body.nombre;
		var ingredientes= req.body.ingredientes;

		Recetas.update({nombre: nombre}, { nombre: nombre, ingredientes: ingredientes}, null, function (err) {

			//Si hay error
			if (err){
				
		      	//Muestra por consola el error
		    	console.log('ERROR: ' + err);
		    }
		    else{

		    	//Muestra el mensaje por consola
		    	console.log(nombre+" ha sido modificada.");

		    	//Muestra el mensaje y los datos de la receta en la página recetaModificada.ejs
				res.render('recetaModificada', {
					
					receta: nombre,
					msg: ' ha sido modificada con los siguientes datos:',
					nombre: nombre,
					ingredientes: ingredientes
					
				})

			//Cierre del else	
		    }

		//Cierre del método update
		});
		
	//Cierre de la función
	});




	// =====================================
	// ADMIN ===============================
	// =====================================

	//Panel del administrador
	app.get('/admin', function(req, res) {
		res.render('admin.ejs');
	});

	//Obtener el número de usuarios
	app.get('/admin/usuarios', function(req, res) {

		User.count({}, function(err,count){

		    console.log("Numero de usuarios:", count);

		    User.find({}, function(err,user){

		    	res.render('usuarios', {
					
						usuarios: count,
						usuario: user
				
				//Cierre de la función render		
				})

		    //Cierre de la función find			
		    });


		//Cierre del método count   
		})

	
	//Cierre de la función	
	});

	//Obtener el número de las recetas
	app.get('/admin/recetas', function(req, res) {

		Recetas.count({}, function( err, count){

		    console.log( "Numero de recetas:", count );

		    Recetas.find({}, function(err,receta){

		    	res.render('recetasAdmin', {
					
						recetas: count,
						receta: receta
				
				//Cierre de la función render		
				})

		    //Cierre de la función find			
		    });

		//Cierre del método count 
		})
		
	//Cierre de la función
	});

	app.post('/mail', function(req, res){


		// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'foodjoysocial@gmail.com',
        pass: 'foodjoysocialelisheila'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'foodjoysocial@gmail.com', // sender address
    to: 'foodjoysocial@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});

		


	});//cierre /mail


//Cierre del module.exports
};



//Función para saber si aún sigue logueado
//Un usuario tiene que estar conectado para tener acceso a esta ruta. 
function isLoggedIn(req, res, next) {

	//si el usuario está logueado continuar
	if (req.isAuthenticated())
		return next();

	//si el usuario no está logueado y trata de acceder, redireccionamos a la página principal
	res.redirect('/');

//Cierre de la función isLoggedIn
}