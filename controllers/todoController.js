var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds159866.mlab.com:59866/todo');

var todoschema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo',todoschema);
/*var itemOne = Todo({item: 'get Flowers'}).save(function(err){
	if(err) throw err;
	console.log('item saved');
});*/



//var data = [{item: 'get milk'},{item: 'walk dog'},{item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo',function(req,res){
	Todo.find({}, function(err, data) {
		if(err) throw err;
		res.render('todo', {todos: data});	
	});
});	

app.post('/todo', urlencodedParser, function(req,res){
	//console.log("ok");
	var newTodo = Todo(req.body).save(function(err,data){
		if(err) throw err;
		res.json(data);
	});
	/*data.push(req.body);
	res.json(data);*/
});

app.delete('/todo/:item',function(req,res){
	Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data){
		if(err) throw err;
		res.json(data);
	})
	/*data = data.filter(function(todo){
		return todo.item.replace(/ /g,'-') !== req.params.item;
	});
	res.json(data);*/
});

};