const fs = require("fs");
const data = fs.readFileSync("playerData.json");
const player = JSON.parse(data);
console.log(data);

// 01
// Get a random player from the .json file
module.exports.randomPlayer = (req, res) => {
    const randomUser = Math.floor(Math.random() * player.length);
    res.status(200).send({
      status: true,
      message: "Random User Found !!!",
      data: player[randomUser],
    });
  };

// 02
// Get all the player from the .json file
// Limit the number of player using query parameter(s)
module.exports.allPlayers = (req, res) => {
  const { limit } = req.query;
  res.status(200).send({
    status: true,
    message: "You get all the Players at your limit!",
    data: player.slice(0, limit),
  });
};

// 03
// Save a player in the .json file
// validate the body and check if all the required properties are present in the body.
module.exports.savePlayers = (req, res) => {
  const newPlayer = req.body;
  const { gender, name, contact, address, photoUrl } = newPlayer;
  if (req.body._id) {
    return res.status(500).send({
      status: false,
      message: "Only enter the Vlied value",
    });
  } else if (gender && name && contact && address && photoUrl) {
    player.push({ _id: player.length + 1, ...newPlayer });
    const newUserInfo = JSON.stringify(player);
    fs.writeFileSync("playerData.json", newUserInfo);
    return res.status(200).send({
      status: true,
      message: "New player added in Json File!",
      data: player,
    });
  } else {
    return res.status(500).send({
      status: false,
      message: "Enter all the required properties",
    });
  }
};

// 04
// Update a player's information in the .json file using its id
// validate the player id

module.exports.updatePlayerInfo = (req, res) => {
  const { id } = req.params;
  const updatedPlayerId = player.find((play) => +play._id === +id);
  console.log(updatedPlayerId);
  if (!updatedPlayerId) {
    return res.status(500).send("there don't have any data Found !!!");
  }
  const updatePlayerInfo = req.body;
  console.log(updatePlayerInfo);
  if (Object.keys(updatePlayerInfo).length === 0) {
    return res.status(500).send("give there a JSON data");
  } else {
    const index = player.indexOf(updatedPlayerId);
    player[index] = { ...updatedPlayerId, ...updatePlayerInfo };
    fs.writeFileSync("playerData.json", JSON.stringify(player));
    return res.status(200).send({
      status: true,
      message: "player updated successfully !!!",
      data: player,
    });
  }
};

// 05
// Update multiple player' information in the .json file
// Take an array of player ids and assign it to the body.
// validate the body.

module.exports.updateMultiplePlayerInfo = (req, res) => {
  const { id, updatedData } = req.body;

  if (!Array.isArray(id)) {
    return res.status(500).send({
      status: false,
      message: `Write a json data where id will be an array and updatedData will be an object. Example: { "id": [1, 2],"updatedData": {"gender": "male", "name": "Maynuddin","contact" : "01989134098"}} `,
    });
  }
  for (let i = 0; i < id.length; i++) {
    let updatedId = id[i];
    const findplayer = player.find((player) => player._id == updatedId);
    if (!findplayer) {
      return res.status(500).send("ID Not Found !!!");
    } else {
      const index = player.indexOf(findplayer);
      player[index] = { ...findplayer, ...updatedData };
    }
  }
  fs.writeFileSync("playerData.json", JSON.stringify(player));
  res.status(200).send({
    status: true,
    message: "players Info Updated",
    data: player,
  });
};

// 06
// Delete a player from the .json file using its id
//validate the player id
module.exports.PlayerRemove = (req, res) => {
  const { id } = req.params;
  const playerId = player.find((play) => +play._id === +id);
  if (!playerId) {
    return res.status(500).send("Id Not Found !!!");
  } else {
    const matchedIds = player.filter((play) => +play._id !== +id);
    fs.writeFileSync("playerData.json", JSON.stringify(matchedIds));
    res.status(200).send({
      status: true,
      message: "One player Removed !!!",
      data: matchedIds,
    });
  }
};