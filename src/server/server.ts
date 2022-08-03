import { WebSocketTransport } from "@colyseus/ws-transport"
import { Server } from "colyseus"
import dotenv from "dotenv"
import express from "express"
import http from "http"
import path from "path"
import { monitor } from "@colyseus/monitor";
import * as fs from 'fs';

var cors = require('cors')

import GameRooms from "./game/Hall_01"
import LobbyRooms from "./game/lobby"
import AcceuilRooms from "./game/acceuil"
// Get environment variables
dotenv.config()
const HOST = process.env.HOST || "0.0.0.0"
const PORT = parseInt(process.env.PORT || "3000")

// Instantiate Express app
const app = express()

app.use(express.json())

// Serve dist folder
const distPath = path.join(__dirname, "../../dist/")
app.use(express.static(distPath))

app.use('/colyseus', monitor());
app.use(cors())
// Register frontend pages
app.get("/", (_request, response) => {
  response.sendFile(distPath + "/index.html")
})

app.get('/scores', (_request, res) => {
  const donnes = fs.readFileSync('./src/server/scores.json');
  res.setHeader('Content-Type', 'application/json');
  res.end(donnes);
})

app.post('/scores', (request, res: any) => {
  console.log("POST SCORES !!")
  // console.log(request.body)
  const data:any = fs.readFileSync("./src/server/scores.json");
  const myObject = JSON.parse(data);
  myObject[`${request.body.equipe}`] = {
    "joueurs": request.body.joueur,
    "score": `${request.body.score}`
  }

  // console.log(Object.values(myObject))
  // const scoreCroissant = Object.values(myObject).sort(function(obj1, obj2) {
  //   return (obj1[0] as any).score - (obj2[0] as any).score;
  // });
  const test = []

  const scoreCroissant = Object.entries(myObject).sort(function(obj1, obj2) {
    console.log(obj1)
    console.log("PUIS")
    console.log(obj2)
    test.push(obj1)
  return (obj1[1] as any).score - (obj2[1] as any).score;
});
  console.log(test)

//   const output = Object.fromEntries(
//   Object.entries(scoreCroissant)
//     .filter(([k, v]) => {
//       return true; // some irrelevant conditions here
//     })
// );

// console.log(output)
  //
  // var newData2 = JSON.stringify(scoreCroissant[0]);
  // console.log("EEEEEEEEEEEEEEEETT")
  // console.log(newData2)
  // fs.writeFile("./src/server/scores.json", newData2, (err) => {
  //   if (err) throw err;
  // });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({"status":"ok"}));
})

app.get('/:id', (_request, response) => {
  response.sendFile(distPath + "/index.html")
})



// Define game server
const server = http.createServer(app)
const gameServer = new Server({
  transport: new WebSocketTransport({
    server: server,
    pingInterval: 5000,
    pingMaxRetries: 3,
  }),
})

// Register room handlers
gameServer.define("lobby", LobbyRooms).filterBy(['salon']).enableRealtimeListing();
gameServer.define("game_instance", GameRooms).filterBy(['salon'])
gameServer.define("acceuil", AcceuilRooms);

// Start game server
void gameServer.listen(PORT, HOST)
console.info(`Listening on http://${HOST}:${PORT}`)
