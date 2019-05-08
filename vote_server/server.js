var express = require('express');
var models = require('./models');
const bodyparser=require('body-parser');
var app = express();
app.use(express.json())

app.use(bodyparser.urlencoded({extended:false}))

/*************************MY APIS******************************** */

// on the request to root (localhost:4000/)


app.post('/user_register', function (req, res) {
     console.log(req.body);
    const name=req.body.name
    const password=req.body.password
    const code=req.body.code
    const address=req.body.add
    console.log(address)
    models.user
    .create({
        name:name,
        password : password,
        code : code,
        address:address
    })
    .then(nexttask => {
        console.log("Executing")
        res.status(200).send("Successfully Registered");
    })
    .catch(function(error){
        console.log("in catch")
        res.status(404);
        // Ooops, do some error-handling
    })
})

app.post('/candidate_register', function (req, res) {
    console.log(req.body);
   const name=req.body.name
   const password=req.body.password
   const code=req.body.code
   const symbol=req.body.symbol
   models.candidate
   .create({
       name:name,
       password : password,
       code : code,
       symbol:symbol
   })
   .then(nexttask => {
       console.log("Executing")
       res.status(200).send("Successfully Registered");
   })
   .catch(function(error){
       console.log("in catch")
       res.status(404);
       // Ooops, do some error-handling
   })
})

app.post('/user_login', function (req, res,error) {
    const id=req.body.id
    const password =req.body.password
    console.log(id)
    console.log(password)
    models.user.findAll({

    }).then(do_next =>{
        console.log(do_next);
    })


        models.user.findOne({
        where: {
            id:id,
           password:password
        }
       }).then(function(result){
           if(result)
           {        
                    console.log("woof")  
                    var number=JSON.stringify(result)
                    console.log(number.code)
                    res.status(200).send(number);
            }
           else
             {
                console.log("in else babe")
                res.status(404);
             }
    })
    .catch(error=>{res.status(404)})
    })

 app.post('/user_fetch',function(req,res,error){
    const code=JSON.parse(req.body.result)
    console.log(code)
    models.const_details.findAll({
        attributes:['state','code','phase_date','constituency'],
        required:true,
        include:[
            {
                model:models.candidate,
                attributes:['name','symbol'],
                required:true,
                include:[
                    {
                        model:models.user,
                        required:true,
                                where:{
                                    code:code
                                }
                }]
            }]
    }).then(function(result){
        if(result)
                res.status(200).send(result)
        else
                res.status(404)
    }).catch(error=>{res.status(404)})
})
   
app.post('/vote', function (req, res,error) {
    const id=req.body.id
        models.voter.findOne({
        where: {
            ids:id
        }
       }).then(function(result){
           if(result)
           {        
            res.status(404);
            }
           else
             {
                models.voter.findOne({
                    where:{
                        symbol:req.body.symbol,
                        code:req.body.code
                    }
                }).then(function abc(result){
                        if(result){
                                models.voter.increment('count',{by:'2'})
                        }
                        else{
                            models.voter.create({
                                symbol:req.body.symbol,
                                code:req.body.code,
                                state:req.body.state,
                                constituency:req.body.constituency
                            })
                        }
                })
                
             }
    })
    .catch(error=>{res.status(404)})
    })















/***************************HANLDING SERVER RESPONSE************************************** */
// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3000 !
app.listen(4000, function () {
    console.log('Example app listening on port 4000.');
});