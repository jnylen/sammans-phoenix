import init from "./init.js";

import { toggleClass } from "@kollegorna/js-utils/src/attribute";
//import loadScript from "@kollegorna/js-utils/src/load-script";
const loadScript = (src, cache = true) => {
  return new Promise((resolve, reject) => {
    if (!cache) {
      const time = new Date().getTime();
      src = `${src}${src.includes("?") ? "&" : "?"}cachebust${time}=${time}`;
    }

    const script = document.createElement("script");
    script.addEventListener("load", resolve);
    script.addEventListener("error", () => reject("Error loading script"));
    script.addEventListener("abort", () => reject("Script loading aborted"));
    script.async = false;
    script.src = src;
    document.head.appendChild(script);
  });
};

const Player = (data) => {
  const playerNode = document.getElementById("player");

  console.log(data);
  console.log(playerNode);

  data.scripts.forEach((src) => {
    console.log(src);
    loadScript(src, false)
      .then(() => {
        console.log("loaded");
      })
      .catch((error) => {
        console.log("error");
      });
  });

  playerNode.innerHTML = data.html.trim();

  const defaultPage = document.getElementById("default-page");
  toggleClass(defaultPage, "hidden");
  toggleClass(playerNode, "hidden");
};

export default Player;
