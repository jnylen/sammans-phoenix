import { Socket, Presence } from "phoenix";

let socket = new Socket("/socket", {
  params: { token: window.userToken },
});

import { toggleClass } from "@kollegorna/js-utils/src/attribute";
import userJoined from "../events/user_joined";
import userLeft from "../events/user_left";
import videoQueued from "../events/video_queued";
import videoPlaying from "../events/video_playing";
import videoPaused from "../events/video_playing";

const connectionSocket = () => {
  const roomDiv = document.querySelector("#room-show");
  if (!roomDiv) return;

  const connectionDiv = document.querySelector("#connection");

  // Finally, connect to the socket:
  socket.connect();

  // Now that you are connected, you can join channels with a topic:
  let channel = socket.channel("room:" + window.channelId, {
    name: window.userName,
  });

  let presence = new Presence(channel);

  function renderOnlineUsers(presence) {
    document.querySelector("#user-count").innerHTML = Object.keys(
      presence.state
    ).length;
  }

  presence.onSync(() => renderOnlineUsers(presence));

  channel
    .join()
    .receive("ok", (resp) => {
      document.querySelector("#room-title").innerHTML = window.userName;
      toggleClass(connectionDiv, "bg-green-400");
    })
    .receive("error", (resp) => {
      document.querySelector("#room-title").innerHTML = "Connecting..";
      toggleClass(connectionDiv, "bg-red-400");
    })
    .receive("timeout", (resp) => {
      document.querySelector("#room-title").innerHTML = "Connecting..";
      toggleClass(connectionDiv, "bg-gray-600");
    });

  // Set it globally
  window.channelSocket = channel;

  // Events
  userJoined();
  userLeft();
  videoQueued();
  videoPlaying();
  videoPaused();

  // Buttons
  const addVideo = () => {
    const url = document.querySelector("#search-field").value;
    console.log(url);
    channel.push("room:video_add", { url: url });
  };

  const searchButton = document.querySelector("#actual-search-button");
  searchButton.addEventListener("click", () => {
    addVideo();
  });

  const searchInput = document.querySelector("#search-field");
  searchInput.addEventListener("keyup", () => {
    if (event.keyCode == 13) {
      addVideo();
    }
  });
};

export { connectionSocket, socket };
