module.exports = {
    gameState: function(gameTime, blueDragons, redDragons, blueGold, redGold) {
        //let blueDragons = [] 
        //let redDragons = [] 
        //let blueGold = 28000;
        //let redGold = 2500;

        return _gameState = {
            stateData: {
                gameTime: gameTime,
                gamePaused: false,
                scoreboard: {
                    BlueTeam: {
                        Name: "BTM",
                        Icon: "TeamIcons\\Default.png",
                        Score: 1,
                        Kills: 0,
                        Towers: 0,
                        Gold: blueGold,
                        Dragons: blueDragons
                    },
                    RedTeam: {
                        Name: "RTM",
                        Icon: "Cache\\TeamIcons\\Default.png",
                        Score: 0,
                        Kills: 0,
                        Towers: 0,
                        Gold: redGold,
                        Dragons: redDragons
                    },
                    GameTime: gameTime,
                    SeriesGameCount: 5
                },
                inhibitors: {
                    Inhibitors: [
                        {
                            id: "T1_L1",
                            key: 0,
                            timeLeft: 100
                        },
                        {
                            id: "T1_C1",
                            key: 1,
                            timeLeft: 0
                        },
                        {
                            id: "T1_R1",
                            key: 2,
                            timeLeft: 0
                        },
                        {
                            id: "T2_R1",
                            key: 3,
                            timeLeft: 160
                        },
                        {
                            id: "T2_C1",
                            key: 4,
                            timeLeft: 140
                        },
                        {
                            id: "T2_L1",
                            key: 5,
                            timeLeft: 120
                        }
                    ]
                },
                goldGraph: {
                    "0": 0,
                    "100": 100,
                    "200": 200,
                    "300": 300,
                    "400": -400,
                    "500": -500,
                    "600": -600,
                    "700": -700
                },
                blueGold: blueGold,
                redGold: redGold,
                blueColor: "rgb(66,133,244)",
                redColor: "rgb(234,67,53)"
            },
            eventType: "GameHeartbeat"
        }
    }
}