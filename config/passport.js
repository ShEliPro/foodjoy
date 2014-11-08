//Este fichero está en : config/passport.js
//Hemos creado nuestro objeto passport en server.js. Y luego el fichero passport.js cogerá el objeto passport.
//Aquí es dónde las funciones sirven para guardar nuestro usuario en sesión.

// cargamos lo necesario para el objeto passport
var LocalStrategy = require('passport-local').Strategy;

//Cargamos el modelo user
var User = require('../app/models/user');

//module.exports es el objeto que se devuelve tras una llamada request
//así podemos usar passport
module.exports = function(passport) {

    // =========================================================================
    // Configuración de sesión passport ========================================
    // =========================================================================
    
    // para sesiones persistentes
    // passport serializa y deserializa a los usarios de la sesion guardando su ID al serializar y buscando su ID al deserializar

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // REGISTRO LOCAL ==========================================================
    // =========================================================================

    // usamos local-signup para diferenciarlo del login y poder usar "estrategias" diferentes para cada uno, si solo tuvieramos uno se llamaria 'local' por defecto
    passport.use('local-signup', new LocalStrategy({

        // por defecto "local strategy" usa nombre de usuario (username) y password
        // en vez de username nosotros pondremos email **en un futuro añadiremos mas campos
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // permite mandar la request completa al callback
    },

    function(req, email, password, done) {

        //buscamos en nuestra DB coincidencias con el email ingresado 
        User.findOne({ 'local.email' :  email }, function(err, user) {

            // si hay errores, devuelve el error
            if (err)
                return done(err);
                console.log("ERROR");
            // comprueba si el email ya existe, si es así muestra un mensaje flash
            if (user) {
                return done(err);
                console.log("El usuario ya existe");
            } else {

                // si no existe el email en la BD crea el usuario con las credenciales introducidas
                var newUser            = new User();

                newUser.local.email    = email;
                // usamos la función generateHash que hemos creado en el modelo user para guardar la contraseña encriptada
                newUser.local.password = newUser.generateHash(password); 
                

                // añade el usuario a la BD
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));

    // =========================================================================
    // LOGIN LOCAL =============================================================
    // =========================================================================

    // usamos local-login para diferenciarlo del login y poder usar "estrategias" diferentes para cada uno, si solo tuvieramos uno se llamaria 'local' por defecto

    passport.use('local-login', new LocalStrategy({

        // por defecto "local strategy" usa nombre de usuario (username) y password
        // en vez de username nosotros pondremos email **en un futuro podríamos hacer que pudiera loguearse con email o username independientemente
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'El usuario no existe')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Password incorrecto')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

};