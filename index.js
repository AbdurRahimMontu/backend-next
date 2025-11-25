const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config()


app.use(cors());
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Server is running')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.juobova.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db('nextDB')
    const product = db.collection('products')




 app.get('/products', async (req,res)=>{
    const result = await product.find().toArray()
    res.send(result)
})

  app.post('/products',async(req,res)=>{
  const data = (req.body)
  const result =await product.insertOne(data)
  res.send(result)
 })

 app.get('/manageProduct', async(req,res)=>{
    const email = req.query.email
    const result= await product.find({email: email}).toArray()
    res.send(result)
  })

app.delete('/manageProduct/:id', async(req,res)=>{
   const id = req.params.id
   const query = {_id: new ObjectId(id)}
   const result = await product.deleteOne(query)
   res.send(result)
})
app.get("/manageProduct/:id", async (req, res) => {
   const id = req.params.id
   const query = {_id: new ObjectId(id)}
   const result = await product.findOne(query)
   res.send(result)
})



    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port,()=>{
    console.log(`Port is Running No ${port}`);
})
