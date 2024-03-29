//importing express module
const express= require("express");
//creating server
const app=express();
//calling the router for posts
const postRoutes=require("./routes/posts.routes");
//calling the mongodbclient from mongo.js
const mongo=require("./mongo");


//db should be connected before server is started, cannot directly connect
// mongo.connect()
//in-order to connect to db and then start the server, wrapping all other middleware in IIFE and using promises (Async and await)
(async ()=>{
    try{
        await mongo.connect();

        //common-middleware for every request
//using a express.json() to convert req.body from raw to json 
app.use(express.json())


//calling middleware on mount path:/posts and passing handler function
app.use("/posts", postRoutes)
//starting the server
app.listen(3001,()=>{console.log("server running on port 3001")})


        }
    catch(err)
    {
        console.log("Error",err)
    }

})();
