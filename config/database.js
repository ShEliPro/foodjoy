//configuramos nuestra BD previamente creada en MongoLab

var user = process.env.USER;
var password = process.env.PASSWORD;

module.exports = {

	'url' : 'mongodb://'+user+':'+password+'@ds063909.mongolab.com:63909/foodjoy' 
	//url de tu base de datos en mongodb
};
