//Importamos el modelo recetas
var Recetas = require('../app/models/recetas');

//module.exports es el objeto que se devuelve tras una llamada request
//así podemos usar express y passport aquí
module.exports = function(app, passport) {

	// =====================================
	// PAGINA PRINCIPAL (con links de login*) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // carga index.ejs
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	
	// mostrar formulario de login
	app.get('/login', function(req, res) {

		// renderiza la pagina y le pasa datos flash (si los hay)
		res.render('login.ejs', { message: req.flash('loginMessage') }); //loginMessage se crea en passports.js
		//req.flash: para coger datos flash de la sesión
		

	});

	// procesar formulario de login
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // si los datos son correctos entraremos al perfil
		failureRedirect : '/login', // si hay un error o los datos no son correctos redirecciona a loign
		failureFlash : true // con failureFlash:true permitimos mensajes flash
	}));

	

	// =====================================
	// RESGISTRO ===========================
	// =====================================

	// mostrar formulario de registro
	app.get('/signup', function(req, res) {

		// renderiza la pagina y le pasa datos flash (si los hay)
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// procesar formulario de registro
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // si los datos son correctos entraremos al perfil
		failureRedirect : '/signup', // si hay un error o los datos no son correctos redirecciona a loign
		failureFlash : true // con failureFlash:true permitimos mensajes flash
	}));

	// =====================================
	// PERFIL ==============================
	// =====================================

	//usamos la función isLoggedIn para verificar que el usario está logueado ya que no queremos que nadie pueda acceder al perfil sin haberse autentificado antes
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // cogemos el usuario de la session gracias a passport y se lo pasamos a la plantilla
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) { 

		req.logout(); //usamos req.logout() que nos proporciona passport para salir de la sesión de usuario. 
		res.redirect('/'); //Después, redireccionamos a la página principal.

	});


	// =====================================
	// Recetas ==============================
	// =====================================
	//Obtener la colección de recetas
	app.get('/recetas', function(req, res) {
		
		Recetas.find({},function(err,recetas){
			
			//Si existe un error
			if(err){
				
				//Muestra por consola
				console.log(err);
			}
			else{

				//Muestra el objeto receta
				res.render('recetas', {
					
					recetas: recetas
					
				})
			
			//Cierre de else		
			}
		
		//Cierre del find
		});
		
	//Cierre de la función
	});
};


function isLoggedIn(req, res, next) {

	//si el usuario está logueado continuar
	if (req.isAuthenticated())
		return next();

	//si no, redireccionamos a la página principal
	res.redirect('/');
}

