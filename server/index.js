const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const uri = process.env.Mongo_DB;
const port = 5000;

const app = express();
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PATCH'],
}));
app.use(express.json());

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const postcollection = client.db("database").collection("posts");
    const usercollection = client.db("database").collection("users");
    app.post("/register", async (req, res) => {
      const user = req.body;
      // console.log(user)
      const result = await usercollection.insertOne(user);
      res.send(result);
    });
    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });
    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });
    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });
    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (
        await postcollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      // console.log(profile)
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    app.post("/resetpassword", async (req, res) => {
      const email = req.body.email;

      if (!email) {
        return res.status(400).send({ success: false, message: "Please send an email" });
      }

      const user = await usercollection.findOne({ email });

      if (!user) {
        return res.status(404).send({ success: false, message: "No user with that email" });
      }

      const today = new Date();
      let lastReset;
      if (user.lastReset) {
        lastReset = new Date(user.lastReset);
      } 
      else {
        lastReset = null;
      } 
      if (lastReset && lastReset.toDateString() === today.toDateString()) {
        return res.status(429).send({
          success: false,
          message: "You can only request a password reset once per day.",
        });
      }

      await usercollection.updateOne(
        { email },
        {
          $set: {
            lastReset: today,
          },
        }
      );
      
      return res.send({ success: true });
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is workingon ${port}`);
});
