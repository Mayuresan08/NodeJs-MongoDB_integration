 //to convert string to objectId
const { ObjectId } = require("mongodb");


//importing mongodbClient
const mongo=require("../mongo");


const service={
    //Get Method
    async findPosts(req,res,next){
        //logic in db to retrieve data
        try{
          //using .toArray() method to get response as Array of objects for find()
          //old-one
        // const data= await mongo.db.collection("posts").find().toArray()
        //new-one
        const data= await mongo.posts.find().toArray()
        console.log(data)
     res.send(data)
        }
        catch(err)
        {
          console.log("Error in Get data",err)
        }
    },


    //Post-Method
    async insertPosts(req,res,next){
        //accessing req-body will returns undefined ,in-order to access req.body we have to use a middleware express.json()
        console.log( req.body)

        try{
        //logic in db to insert document
        const data=await mongo.posts.insertOne(req.body)
        console.log(data)

        res.status(201).send({...req.body,_id:data.insertedId})
        }
        
        catch(err)
        {
          console.log("Error in Post data",err)
        }
      },

      //Put-method
      async updatePosts(req,res,next){
        console.log(req.params.id)
        try{
            //logic in db to update 

            //here since _id is of type objectId , need to convert string to objectId using {objectId} from "mongo"
            
            //using-updateOne()
            // const data=await mongo.db.collection("posts").updateOne({_id:ObjectId(req.params.id)},{$set:{...req.body}})

            //using findOneAndUpdate()
            const data=await mongo.posts
                              .findOneAndUpdate({_id:ObjectId(req.params.id)},
                                                  {$set:{...req.body}},
                                                  {ReturnDocument: "after" })
        res.send(data)
        }
        catch(err)
        {
          console.log("Error in Put data",err) 
        }
    },


    //delete method
    async deletePosts(req,res,next){
        console.log(req.params.id)
        //logic in  db to delete data 
        try{
        await mongo.posts.deleteOne({_id:ObjectId(req.params.id)})
        res.end()
        }
        catch(err)
        {
          console.log("Error in Delete data",err) 
        }
    }


}
module.exports=service