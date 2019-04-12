const request = require('request');
var readline = require('readline');
var express = require('express');
const mqtt=require('mqtt')
var app = express();
const client=mqtt.connect('mqtt://127.0.0.1')
app.use(express.json())


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
var ans;
//asynch();

ask();
    async function ask() {
        console.log("Enter choice");
        console.log("1.Login 2.Register 3.Display");
         ans = await answer();
         switch(ans){
             case "1":
                    console.log("U are in Login");
                    login();
                    break;
              case "2":
                    console.log("U are in Register");
                    register();
                    break;
            
              case "3":
                    console.log("U are in Display");
                    break;

              default:{
                      console.log("Wrong choice");
                      ask();
                    }
         }
    }
    function login(){
      
               rl.question('Please enter username name : ', (username) => {                   
                        rl.question('Please enter password : ', (pass) => {
                                    un=username;
                                         console.log(`Name you entered:${un}`);
                                   
                                    p=pass;
                                         console.log(`Name you entered:${p}`);
                                         
                                    var json_data = {
                                             username:un,
                                             password: p,
                                         }

                        
                        request.post({
                            headers: {'content-type' : 'application/json'},
                            url:     'http://localhost:3000/login',
                            body:    JSON.stringify(json_data)
                        }, function(error, response, body){
                         
                          if(error != null){
                            console.log("Error!");
                            ask()
                        }
                        else{
                          console.log(typeof(response.body))
                         var obj1=JSON.parse(response.body)
                         console.log("Printed from login:"+ obj1.username)
                         fetch(obj1);
                        
                      }
                      })
                    })

            })
  
    
  
}

function register(){
    let promise=new Promise(function(resolve){
        rl.question('Please enter username: ', (username) =>{
             rl.question('Please enter name : ', (name) => {
                 rl.question('Please enter password : ', (pass) => {
                     rl.question('Please enter phone : ', (phone) => {
              
                      n=name;
                      un=username;
                      p=pass;
                      var ph=phone; 
                      var re=ph.toString()
                      var phone = re.replace(/[^0-9]/g, '');
                      function isLetter(str) {
                        return /^[a-zA-Z()]+$/.test(str);
                      }
    if((isLetter(un)) && (phone.length==10) && (isLetter(n))){
                                 var json_data={
                                    username:un,
                                    name:n,
                                    password:p,
                                    phone:phone
                                 }
                 
                     request.post({
                       headers: {'content-type' : 'application/json'},
                       url:     'http://localhost:3000/register',
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

function fetch(result){
console.log("WOOOHOOO IN FETCH")
console.log(`logged in as ${result.username}`)
request.post({
  headers: {'content-type' : 'text/plain'},
  url:     'http://localhost:3000/fetch'
  }, function(error, response, body){
  if(error != null){
      console.log(error);
  }
  else{
    console.log(response.body)
    console.log(`Whom do you want to chat with ${result.username}?`)
          rl.question('Choose the username: ', (username) =>{
                un=username;
                var json_d={username:un}
                      request.post({
                           headers: {'content-type' : 'application/json'},
                           url:     'http://localhost:3000/display',
                           body:    JSON.stringify(json_d)
                       }, function(error, response, body){
                                if(error != null){
                                  console.log("error")
                                         ask()    
                                         
                                }
                        else{
                        //console.log(typeof(response.body));
                             var body=JSON.parse(JSON.stringify(response.body))
                             console.log(body)
                             console.log("Welcome to chat!")
                             console.log(`${un}'s number:`+ body)
                             console.log(`${result.username}'s number:`+ result.phone)
                             var str1=body
                             var str2=result.phone
                             var str3=result.username
                            if(str1.localeCompare(str2)==-1)
                                   {
                                     var topic_chat=str1 + str2
                                     console.log(topic_chat)
                                  }
                            else
                                  {
                                    var topic_chat=str2 + str1
                                    console.log(topic_chat)
                                 }
                              client.subscribe(topic_chat);
                              console.log("You are subscribed");
                              client.on('message',(topic,msg)=> {
                              if(topic===topic_chat)
                                    {
                                    var info=JSON.parse(msg)
                                    //console.log(`${info}`)
                                     if(str3==info.user){
                                        incoming_message=info.message
                                        console.log(`${result.username}:` + incoming_message.toString().trim());
                                    }
                                    else{
                                      incoming_message=info.message
                                      console.log(`${info.user}:` + incoming_message.toString().trim());
                                    }
                                  }
                              });
                         
                               rl.on('line', function(line){
                               var msg1=line.toString().trim();
                               //console.log("You:" + `${msg1}`);
                               var send_msg={
                                 user:result.username,
                                message:msg1}
                               payload=JSON.stringify(send_msg)
                               client.publish(topic_chat,payload);
                               });
                         
                        }
                    })
              })
         }
  })
}                

    function answer(){
    return new Promise(function(resolve){
        rl.question("Your choice:",(ans)=>{resolve(ans);
        });
    });
   }


