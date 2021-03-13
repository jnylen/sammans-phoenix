import init from "./init.js";

import playerjs from "player.js";
import videoJS from "./players/video.js";

import { addClass, removeClass } from "@oddcamp/js-utils/src/attribute";
import loadScript from "../helpers/load_script";

const Player = (data) => {
  const playerNode = document.getElementById("player");
  const defaultPage = document.getElementById("default-page");
  Promise.all(
    data.scripts.map((src) => {
      return loadScript(src, false);
    })
  ).then((values) => {
    playerNode.innerHTML = data.html.trim();

    const myPlayer = window.videojs("actualPlayer");
    myPlayer.ready(function () {
      window.actualPlayer = myPlayer;
      videoJS();
    });

    // Shouldn't be a toggle...
    addClass(defaultPage, "hidden");
    removeClass(playerNode, "hidden");
  });
};

export default Player;
