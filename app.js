const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors:{
    origin: "*"
  }
});
const port = process.env.PORT || 3000;

app.get("/",(req, res, next)=>{
  res.send("heloooooooooooooo");
});

const Binance = require('node-binance-api');
const binance = new Binance().options({
  APIKEY: '9iawjLbEFzBWNBZ8mtCKoQcY3tb6uRU7k1HbXnNtOrvizGf1vIZolWBOEWxLwewj',
  APISECRET: 'zTm2jMhG7GaS3FYJudOB7ppyEb7PZLISb1WEZPe3EwrDeF47zAuGQPXhzfYtGlbi'
});
binance.futuresBookTickerStream( 'BTCUSDT', console.log );
//bat su kien khi co client ket noi
io.on("connection", (socket)=>{
  console.log(socket.id + " connection");
  io.emit("hello", socket.id);
  //bat data client send len
  socket.on("send", (data)=>{
    console.log("enter");
    io.emit("hello", data);
  });

});



http.listen(port, ()=>{
  console.log("new connection");
});
