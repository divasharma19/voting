// Require express and create an instance of it
const mqtt=require('mqtt')
const client=mqtt.connect('mqtt://127.0.0.1')
client.subscribe('#')
client.on('message',(topic,msg)=>{
    var msg=JSON.parse(msg)
console.log(topic)
console.log(msg)
//Looking for previous messages

/*models.message_table.findAll({
    limit:10,
    where: {
        topic: topic,
    },
    order: [ [ 'createdAt', 'DESC' ]],
}).then(function(result){
    res.send(result)
    })*/

    //creating the table for the given messages
   
    /* models.message_table.create({
        topic:topic,
        from:msg.user,
        message:msg.message

})*/

})
var express = require('express');
var models = require('./models');
const bodyparser=require('body-parser');
var app = express();
app.use(express.json())

app.use(bodyparser.urlencoded({extended:false}))


/*************************MY APIS******************************** */

// on the request to root (localhost:3000/)
app.post('/login', function (req, res,error) {
    console.log(req.body)
        models.user_info.findOne({
        where: {
        username:req.body.username,
        password:req.body.password
        }
       }).then(function(result){
           if(result){
          var number=JSON.stringify(result)
    res.status(200).end(number);}})
    .catch(error=>{res.status(error)})
    })

app.post('/register', function (req, res) {
    console.log(req.body)
    console.log("Name" + req.body.name)
    console.log("password" + req.body.password)
    const username=req.body.username
    const name=req.body.name
    const pass=req.body.password
    const phone=req.body.phone
    models.user_info
    .create({
        username:username,
        name : name,
        password : pass,
        phone:phone
    })
    .then(nexttask => {
        console.log("Then me ghus raha hai")
        res.status(200).send("Successfully Registered");
    })
    .catch(function(error){
        console.log("in catch")
        res.send(error);
        // Ooops, do some error-handling
    })
})


app.post('/fetch', function (req, res) {
    console.log(req.body)
    models.user_info.findAll({
       
            attributes:[['username','user'],['phone','number']]
    }).then(function(result){

        var number=JSON.stringify(result)
        res.status(200).end(number);
    })
});

app.post('/display', function (req, res) {
    console.log(req.body)
    console.log("Name" + req.body.username)
    const user=req.body.username
    
    models.user_info.findOne({
        where:{
            username:user
        }
    }).then(function(result){
       try{ 
      if(result){
      var phone=JSON.stringify(result.phone)
      console.log(phone)
      res.status(200).send(phone);}
       }
       catch(error){
           throw error;

       }
    })
})



// On localhost:3000/welcome







/***************************HANLDING SERVER RESPONSE************************************** */
// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});
