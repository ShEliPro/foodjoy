//configuramos nuestra BD previamente creada en MongoLab

var user = process.env.USER;
var password = process.env.PASSWORD;

module.exports = {

	'url' : 'mongodb://'+user+':'+password+'@ds045970.mongolab.com:45970/pruebapp' 
	//url de tu base de datos en mongodb

};