// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss";
import "../css/plyr.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
import { Socket } from "phoenix";
import { connectionSocket, socket } from "./components/socket";
//
import "phoenix_html";
import "./components/player.js";
import "./components/search.js";
//import "./components/socket.js";

import init from "./components/init.js";

init(() => {
  connectionSocket();
});
