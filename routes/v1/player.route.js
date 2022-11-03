const express = require("express");
const {
  randomPlayer,
  allPlayers,
  savePlayers,
  updatePlayerInfo,
  PlayerRemove,
  updateMultiplePlayerInfo,
} = require("../../controllers/pleyer.controller");
const router = express.Router();

// 01
router.route("/random").get(randomPlayer);
// 02
router.route("/all").get(allPlayers);
// 03
router.route("/save").post(savePlayers);
// 04
router.route("/update/:id").patch(updatePlayerInfo);
// 05
router.route("/bulk-update").patch(updateMultiplePlayerInfo);
// 06
router.route("/delete/:id").delete(PlayerRemove);

module.exports = router;
