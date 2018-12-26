const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://gabriels17:VsrwDpNbrExUz6A@ds115198.mlab.com:15198/mytododb', {useNewUrlParser: true});

// Create a schema - this is like a blueprint
const todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req, res){
        // Get data from MongoDB and pass it to the view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res){
        // Get data from the view and add it to MongoDB
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        // Delete the requested item from MongoDB
        Todo.find({item: req.params.item.replace(/\-/g, ' ')}).deleteOne(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

};