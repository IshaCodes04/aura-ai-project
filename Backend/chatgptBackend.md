**Now Today I started creating a ChatGpt project clone with fully functionalities within it**

- in my chatgpt project i add some features like multiple chats , or in evry chat we discuss evrything by exchanging the messages

- one additional feature is that chatgpt remembers every diff chats messages data , after making a new chat or discuss new messages

*Let's start*

- npm init -y
- npm i express , mongoose , jsonwebtoken , bcryptjs , dotenv , cookie parser
- create a .env file

*In app.js*

first we create server and use packages
- folder src -> app.js -> create server , use middleware or cookie-parser 

*In server.js*

start server and connect to database
- require app -> require dotenve -> start server 
- require connectdb func -> then call the fnc

*In db.js*

create database
- create folder db -> create db.js file -> require mongoose -> create connectdb function


*Now we create user Schema*

create userSchema
-create models folder -> create user.model.js file -> require mongoose -> create userSchema with name , email or password , timestamp

*Now we create auth-routes*

create router
-create routes folder -> create auth.routes.js file -> create a router and then use router in app.js
- create register or login api routes

*Now we create Authcontrollers*

require jwt, bcrypt , userModel in auth.controller.js
- create registerUser Controller
- create loginUser Controller


*Now we create a feature where an user create their own chat*

here we create a middleware becos a chat created when an user is logged in
 - create authMiddleware

*Now we create chat-routes*

create chatSchema
- create router , or api routes for chat in chat.route.js 

*Now we create chat Schema*

- create chat schema in chat.model.js file -> create chatSchema with user (for check user), title (chat tittle), lastActivity and timestamps

*Now we create chatControllers*

- createChat Controller
- we get only {title} from frontend , create chatModel , and send json message with title, id , lastActivity, user chat

*Now we implement socket io*

- npm install socket.io
- create httpserver 
- connect socket server through postman

*Now we add security*

- like when any user login and we verify the user is loged in or not tb tk woh socket io server se connect nhi hona chahiye

- user or socket server would set a connection and then they communicate together

- client/user send req to the socket server for build a connection now server check user is valid or not for a connection (these valid logics we can build in middlewares) :-

1. server check is the user is logged in or not
2. server check is the user is valid or not

*Now we create middleware for authentic user*

- after logged in copy the token and paste it in headers of socket io api with key value pair here we send token through cookies in socket server

- now access the token in middleware , npm i cookies and here successfully we created socket io middleware

*Now we exchange messages through AI*

- we used json format for our msg , add (chat -id and content) , add an ai-message event and add listener then send message 

*Now we take return message through AI*

- now upper we send message to Ai now we take return message through ai for that we use gemini api key

- create an api key from google docs copy the api key and paste in .env file, now for hide all .env keys use an extension called env default 

- now go to google docs -> then Quickstart -> then install googlegemini package 

*Now we use gemini key*

- create services folder -> create ai.service.js file in it -> go to Quickstart copy the js code paste it in ai.service.js 

- require @google/genai
- create a func which able to run content then export and import in socker.server.js

*Create a listener for response of human message through ai*

- socket.on pe ek ai-message krke listener lga h or usme messagePayload recieve hoga usme 2 chije hongi ek (chat - chat-id , content - message text paylaod)  hoga jo hum postamn se ai ke pass bhej rhe h

- next ai jo hmari services h usse generate kra rhe h generateResponse jisme hum content pass kr rhe h 

- content pass krne ke bd jo bhi ai response dega generate krke dega usse socket emit ke jriye he waps se return kra rhe h jisme content ka response h or nessagePayload h

- now postman m events pr jake ai-response event add krke uspe listener lgayenge then send krenge toh ai response milega jisme content or chat-id hogi in json format

*Now we save our all message for so that we have to maintain a chathistory*

- create model for messageSchema with user , chat , content or role , timestamps and export it

- import messageModel in socket.server.js

- now we have to save user message and also return message from our model

- save chatHistory of user then save chatHistory of model

*Now we create short term memory of ai*

- create chatHistory on the basis of short term memory
- we pass only some properties like role, or parts we pass text content in parts and use for this 
- ab chatHistory add kr denge response m so now check all the responses by postmon through ai and here our short term memory is implemented

*Now we implement Long Term Memory* *This whole concept know as RAG*

* For LTM first we knw that what is vector or vector DB? *vector embeddings*

- Vector's also know as embeddings 
- Vector means how LLM's can read or find the meaning of words for ex =
  ring => [] it means ring is a single word which can be convert into vectors. 
- vector's are array [] of numbers or float ,
- every number's value is pre decided ,
- there are restrictions in number's = n>-1 (greater then -1) or n<1 (less then +1)

* example of vector -> ring => [-0.3385738972, 0.3485835435, -0.3495827428] a single word ring converts into number's 

* Total number of arrays in vector's = 1024 , 768 , 3072 But here we used 768 number combination only 

* Here we follow 768 combination means we create 768 vectors with a single word

*Let's see how a single word can be converts into vector*

* gemini-2.0-flash -> is a large language model we are using ,Now we give some input to the gemini and recieve some output as well from gemini in the form of text 

. gemini-2.0-flash => who is the president of indin in 2010? (input) 
. gemini-2.0-flash => generate some output blaah blaah...

* Similar way mein when we convert a word or a string into vector's we are using the Specific model's 

. gemini-embedding-001 model we used for create vector's / embeddings and length we used = 768
                                 
* Here we can see both ques are related about cars then both ques vector's also very close together's

                                 (x)             (y)           (z)
For ex ->  i have a red car => [0.3283487483, -0.92372982, 0.328438443] a line convert into vectors 
                                        (x)                (y)        (z)
Do you have any idea about my car? => [0.32834893487, -0.92372322, 0.32843800]

*Pricing in inputs of ai*
 
* More inputs = more rate of pricing per text messages with ai 
* our sentence converts into token know as tokenization 
* Both input or output tokens will be calculated then pricing decides

* some filling words removed from the sentence in tokennization for ex -

- the car is running on the highway at the speed of 140km/h 
                     ( Sentence after closest tokennization )
- car running highway speed 140km/h
             (here 5 tokens will be spend on each words)

* After tokennization sentence gone for embeddings then goes to gemini model then output will be generated successfully

*What is imp for implement Long Term Memory*

* Long term memory implement with the help of vector database 
- what does vector db do? -> it convert words into vector embeddings
- why we use 768 dimensions for convert ? -> more inputs more dimensions
- we convert input data into vector after this plot it on graph and pick the closes parts of the inputs / words this is long term memory

*Here we use Pinecone vector database for store embeddings*

- vectors ke ass pass ke points unn points ko search krna ek quiry hoti h iske liye use krte h pinecone db and also used for store vectors

- Go to pinecode db and successfully sign up then we need to create index in database
- Index means? a collection for vector's database

*Set up Pinecone*

- click on create index -> enter name my chatgpt project -> scroll down and select dimensions 768 -> click create index 
- Go to pinecone docs -> quickstart -> install an sdk in js code 


*Vector.service.js file*

- create new file in services called vector.service.js
- copy create an index code in js and paste it in file
- require pinecone db , generate new api key and paste in .env and paste it in vector file code
- we code two functions createMemory or queryMemory and export the func

*Socket.server.js*

- require both fnc in socket.server.js
- convert normal text into vectors -> go to gemini docs look generate embeddings it creates vectors 
- ai-models.embedded-content fnc we use to create vectors in google docs Embeddings


*ai.service.js*
- create a generateVector function and export it

*socket.server.js*
- write vector fnc for convert user input into vectors

* Now open postman :- connect to socket io -> go to messages write and send message then we see vectors generate in the form of array of objects but we need direct values of vector's then we use first index in return

- now we store the vectors in pinecone db after connect postman see in pinecone indexes click on fetch vector's will show with their chat, user or message id

* go on postman connect the socker server and send json ai-message then saw in pinecone db both user or model vector's successfully generated as well as their messages

*Now we find last messages in memory on the basis of vector*

- means user ke current question se related koi phle question pucha huya h model se ya nhi yh fine krenge ab queryVector ki help se

*Now we implement long term memory in ai model*

- queryVector se vector find krke use them as a long term memory

- now all ai chats saved on mongo db as well as pinecone db 

* now create a new chat in postman ab new chat create ki h toh uski koi bhii short term memory nhi hogi ek empty array milega ab woh memory show krega long term memory se jo pinecone db se aa rhi hogi 

- ab jo memory pinecone db se ayegi usse as a long term memory pass krenge

* Ab firse stm or ltm bnayenge then unhe console kra ke dekhenge 

* Now our short term memory and long term memory all are successfullly implemented yaaaay !!!! 