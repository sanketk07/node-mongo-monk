var express = require('express');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var userData = db.get('user-data'); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  	
    var data = userData.find({});
    data.on('success', function(docs){
        res.render('index', {items: docs});
    });
  	
});

router.post('/insert', function(req, res, next) {
   var item = {
   	 title: req.body.title,
   	 content: req.body.content,
   	 author: req.body.author
   };
   
   //can assign to a variable and use a callbak function to watch the success/error. Just like car data above
   userData.insert(item);
  
   res.redirect('/');

});

router.post('/update', function(req, res, next) {
  
  	var item = {
   	 title: req.body.title,
   	 content: req.body.content,
   	 author: req.body.author
   	};

   	var id = req.body.id;

    //2 ways to do this
    //1st technique. Selector and actual data to be updated
    //serData.update({"_id": db.id(id)}, item);

    //2nd technique. Directly using 
    userData.updateById(id, item);
   	
});

router.post('/delete', function(req, res, next) {
  
  	var id = req.body.id;

    //2 ways to do this
    //1st Way
    //userData.delete({"_id": db.id(id)});

    //2nd Way. Directly using 
    userData.removeById(id);
  	
});

module.exports = router;
