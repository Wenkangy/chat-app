const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const charRoutes= require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const path = require("path");

const app = express();
dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.options("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "GET,PUT,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Length, X-Requested-With"
  );
  res.send(200);
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});




app.use("/api/user", userRoutes);
app.use("/api/chat", charRoutes);
app.use("/api/message", messageRoutes);


//deployment

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
    res.send("api running");
  });
}

//deployment

/*app.get("/auth/userName/:userName/pswd/:pswd", (req, res) => {
  if (verify_login(req.params.userName, req.params.pswd)) {
    var token = jwt.sign({ username: `${req.params.userName}` }, "secret", {
      expiresIn: 120,
    });
    res.send(token);
  }
  res.send(req.params);
});

app.all("*", (req, res) => {
  res.send(req.params);
});
*/

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = require('socket.io')(server,{
  pingTimeout:60000,
  cors:{
    origin: "http://localhost:3000"
  },

});

io.on("connection", (socket) => {
  //console.log("connected to socket.io")
  
  socket.on("setup", (userData)=>{
    socket.join(userData._id);
    
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    // broadcasts the received message to all users in the chat room, except the sender
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });


});
/*function verify_login(userName, pswd) {
  if (userName == "kufooloo" && pswd == "secret") {
    return true;
  }
  return false;
}
*/