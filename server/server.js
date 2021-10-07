import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb+srv://MERN-STACK:4g8fJ790cyf5CsBV@cluster0.4s7rg.mongodb.net/MERN-STACK",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected");
  }
);

const userScheema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Data = new mongoose.model("Data", userScheema);

//create routing
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Data.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Succesful", user: user });
      } else {
        res.send({ message: "Password did not match" });
      }
    } else {
      res.send({ message: "User not registred" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  Data.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd!!" });
    } else {
      const user = new Data({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered!!!! , Plz Login Now" });
        }
      });
    }
  });
});

app.listen(8000, () => {
  console.log("BE CREATED AT PORT 8000");
});
