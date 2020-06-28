import init from "./init.js";

import { getElements } from "@kollegorna/js-utils/src/selector";
import playerjs from "player.js";

init(() => {
  getElements(".player").forEach((item) => {
    console.log(item);
    console.log("hello");
    const player = new playerjs.Player(item);
    player.on("ready", function () {
      player.on("play", () => {
        console.log("play");
      });

      player.getDuration((duration) => console.log(duration));

      if (player.supports("method", "mute")) {
        player.mute();
      }

      player.play();
    });
  });
});
