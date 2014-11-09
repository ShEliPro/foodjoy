foodjoy
=======

Se trata de una Red Social Gastronómica que pone en contacto a usuarios para que compartan Recetas, Productos y Restaurantes.

La manera de compartir será subiendo una imagen, añadiendo un texto y un icono dependiendo de lo que sea el contenido.

Cada usuario tendrá su perfil con sus recetas, resturantes y producto.

- Gestión de Usuarios
- Gestión de Recetas
- Gestión de Restaurantes
- Gestión de Productos

Tecnologías a usar:

- HTML5 / CSS3 + JavaScript
- Node.js
- MongoDB

Para acceder a la base de datos desde el terminal hay que escribir el siguiente código:

	USER=xxxxxxx PASSWORD=xxxxxxxxx API_KEY=xxxxxxxxxxxxx nodemon server.js


Enlace Heroku: (actualizado todos los dias) https://foodjoy-sheli.herokuapp.com/

Enlace OpenShift: (actualizado cada semana) http://pruebaapp-sheli.rhcloud.com/

Actualizado cada cambio realizado en GitHub.

Una copia de seguridad en Dropbox.

email oficial: 
	foodjoysocial@gmail.com
web oficial de descripción del proyecto:
	 http://shelipro.github.io/foodjoy

Estructura del proyecto
-----------------------

| Nombre                             | Descripción                                                 |
| ---------------------------------- |:-----------------------------------------------------------:|
| **app**/routes.js                  | Se definen todas las rutas de la aplicación                 |
| **app/models**/recetas.js          | Estructura del Schema de recetas Mongoose                   |
| **app/models**/user.js             | Estructura del Schema de user Mongoose                      |
| **config**/passport.js             | Autenticar al usuario con el Passport Local                 |
| **config**/database.js             | Conexión con la base de datos MongoLab (nube)               |
| **public**/                        | Ficheros estáticos (css, js, img)                           |
| **public**/**js**/formulario.js    | Funciones de JavaScript (cliente)                           |
| **public**/**js**/jquery.js        | Fichero externo de jQuery (cliente)                         |
| **public**/**css**/main.css        | Main stylesheet para la página principal                    |
| **public**/**css**/profile.css     | Profile stylesheet para cada perfil de usuario.             |
| **views**/index.ejs                | Página principal con la plantilla ejs                       |
| server.js                          | Aplicación y servidor                                       |


Lista de dependencias
----------------

| Dependencia                     |  Descripción  |
| ------------------------------- |:-------------:|
| bcrypt-nodejs                   | Encriptar contraseñas |
| express                         | Framework para Node.js |
| body-parser                     | Obtener datos del html mediante el método POST (form) |
| cookie-parser                   | Para el uso de cookies |
| express-session                 | Necesario junto con cookie-parser|
| morgan                          | Muestra mensajes por consola de las peticiones|
| method-override                 | Express 4.0 middleware |
| ejs                             | Motor de plantillas para Express |
| mongoose                        | MongoDB ODM |
| mailgun-js                      | Enviar emails con Node.js |
| passport                        | Autenticar usuario|
| passport-local                  | Permite logueos locales (usuario y contraseña) |
