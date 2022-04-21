const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const fs = require('fs');

let OverlayConfig = fs.readFileSync('JSON/OverlayConfig.json');
let overlay = JSON.parse(OverlayConfig);

const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 9001 });

var gameState = require('./gameState')

server.listen(3000, () => {
    console.log('listening');
});

let _blueDragons = ['Ocean']
let _redDragons = []

wss.on("connection", ws => {
    console.log("New client connected!");
    
    ws.on('message', function (message) {
        //Parse JSON
        console.log(JSON.parse(message.toString()))
        _json = JSON.parse(message.toString())

        //Send OVERLAY CONFIG
        if(_json.requestType == "OverlayConfig") {
            console.log("Overlay Config")
            ws.send(JSON.stringify(overlay))
            setTimeout(() => {
                ws.send(JSON.stringify(gameState.gameState(255, _blueDragons, _redDragons, 2600, 2700)))
            }, 500);
            return;
        }

        if(_json.eventType == "ObjectiveKilled") {
            if(_json.TeamName == "CHAOS") {
                _blueDragons.push(_json.ObjectiveName)
                console.log(_blueDragons)
                wss.broadcast(JSON.stringify(gameState.gameState(260, _blueDragons, _redDragons, 2600, 2700)))
            }
            if(_json.TeamName == "ORDER") {
                _redDragons.push(_json.ObjectiveName)
                console.log(_redDragons)
                wss.broadcast(JSON.stringify(gameState.gameState(260, _blueDragons, _redDragons, 2600, 2700)))
            }

            
        wss.broadcast(JSON.stringify(_json));
        }
    });

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });

});

wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/tick', (req, res) => {
    wss.broadcast(JSON.stringify(gameState.gameState(260, _blueDragons, _redDragons, 2600, 2700)))
    return res.status(200).send("OK")
});