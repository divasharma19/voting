const request = require('request');
var readline = require('readline');
var express = require('express');
const mqtt=require('mqtt')
var app = express();

app.use(express.json())

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  var ans;

  ask();
    async function ask() {
        console.log("Enter choice");
        console.log("1.User_register 2.Candidate_register 3.User_login 4.Candidate_login");
         ans = await answer();
         switch(ans){
             case "1":
                    console.log("U are in User register");
                    user_register()
                    break;
              case "2":
                    console.log("U are in Candidate register");
                    candidate_register()
                    break;
            
              case "3":
                    console.log("U are in User login");
                    user_login()
                    break

              case "4":
                      console.log("U are in Candidate login");
                      //candidate_login()
                      break;
              default:
                      console.log("Wrong choice")
                      ask();
                    }
                }

                function isLetter(str) {
                    return /[a-zA-Z\s]+/.test(str);
                  }
                  function validatePIN (pin) {
                    if( pin.length === 6 ) {
                      if( /[0-9]/.test(pin))  {
                        return true;
                      }else {return false;}
                    }else {
                        return false;
                        }
                  }
                  function validParty(str) {
                    return  /^[A-Z]+$/.test(str)
                      
                  }
                 

                function user_register(){
                    let promise=new Promise(function(resolve){
                        rl.question('Please enter username: ', (name) =>{
                             rl.question('Please enter password : ', (pass) => {
                                 rl.question('Please enter code : ', (code) => {
                                     rl.question('Please enter address : ', (add) => {
                              
                                      n=name
                                      p=pass
                                      var c=code 
                                      var add=add;
                                      
                                     
                    if((isLetter(n)) && (isLetter(p)) && validatePIN(c)){
                                                 var json_data={
                                                    name:n,
                                                    password:p,
                                                    code:c,
                                                    add:add
                                                 }
                                 
                                     request.post({
                                       headers: {'content-type' : 'application/json'},
                                       url:     'http://localhost:4000/user_register',
                                       body:    JSON.stringify(json_data)
                                       }, function(error, response, body){
                                       if(error != null){
                                           console.log(error);
                                       }
                                        console.log(body);
                                         setTimeout(() => resolve(body), 100) 
                                      })
                                    }
                                else{
                                    console.log("Try again!Error!")
                                    ask()
                                }
                              })
                            })
                          })
                        })
                    })
                        promise.then(call=>ask())   
                
                }

                function candidate_register(){
                    let promise=new Promise(function(resolve){
                        rl.question('Please enter username: ', (name) =>{
                             rl.question('Please enter password : ', (pass) => {
                                 rl.question('Please enter code : ', (code) => {
                                     rl.question('Please enter party name : ', (symbol) => {
                              
                                      n=name
                                      p=pass
                                      var c=code 
                                      var sym=symbol;
                                      
                                    
                    if((isLetter(n)) && (isLetter(p)) && validParty(sym)  && validatePIN(c)){
                                                 var json_data={
                                                    name:n,
                                                    password:p,
                                                    code:c,
                                                    symbol:sym
                                                 }
                                 
                                     request.post({
                                       headers: {'content-type' : 'application/json'},
                                       url:     'http://localhost:4000/candidate_register',
                                       body:    JSON.stringify(json_data)
                                       }, function(error, response, body){
                                       if(error != null){
                                           console.log("error from server side");
                                           ask();
                                       }
                                        console.log(body);
                                         setTimeout(() => resolve(body), 100) 
                                      })
                                    }
                                else{
                                    console.log("Try again!Error!")
                                    ask()
                                }
                              })
                            })
                          })
                        })
                    })
                        promise.then(call=>ask())   
                
                }

            function user_login(){
                    rl.question('Please enter id : ', (id) => {                   
                        rl.question('Please enter password : ', (pass) => {
                          
                                         var id1=id
                                         p=pass   
                                         var json_data = {
                                                  id:id1,
                                                  password:p,
                                         }
                                         
                             request.post({
                                 headers: {'content-type' : 'application/json'},
                                 url:     'http://localhost:4000/user_login',
                                 body:    JSON.stringify(json_data)
                             }, function(error, response, body){
                            if(error != null){
                                    console.log("Error from login!");
                                    ask()
                             }
                          else{
                              
                              var obj1=JSON.parse(response.body)
                              console.log("Printed from login:"+ obj1.code)
                              fetch(obj1,id1); 
                             }
                        })
                    })
                 })  
} 

        function fetch(result,id)
        { 
            var json_data={result:result}
            request.post({
                          headers: {'content-type' : 'application/json'},
                          url:     'http://localhost:4000/user_fetch',
                          body:    JSON.stringify(json_data)
                     }, function(error, response, body){
                        if(error != null){
                                console.log("Error!");
                                ask()
                      }
                   else{
                          //console.log(typeof(response.body))
                          var obj1=JSON.parse(response.body)
                          console.log(obj1.phase_date) 
                          console.log(obj1.symbol)
                          console.log(obj1.name)
                          var state=obj1.state
                          var code=obj1.code
                          var constituency=obj1.constituency

                          var today=new Date()
                          if(obj1.phase_date===today.getDate())
                          {
                                rl.question('Who would you vote?',(party_name)=>{
                                            if(validParty(party_name)){
                                                    json_data={
                                                      symbol:party_name,
                                                      id:id,
                                                      state:state,
                                                      code:code,
                                                      constituency:constituency
                                                    }

                                                    request.post({
                                                      headers: {'content-type' : 'application/json'},
                                                      url:     'http://localhost:4000/vote',
                                                      body:    JSON.stringify(json_data)
                                                 }, function(error, response, body){
                                                    if(error != null){
                                                            console.log("Error!");
                                                            ask()
                                                  }
                                                  else
                                                  {

                                                  }
                                                })


                                            }
                                            else{
                                              console.log('Typo!')
                                              ask()
                                            }
                                })
                          }
                          else
                          {
                              console.log("voting is over for your zone")
                          }
                          ask()
                    }
               })
               
       }

function answer(){
    return new Promise(function(resolve){
            rl.question("Your choice:",(ans)=>{resolve(ans);
     });
  });
}
                