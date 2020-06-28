// The base for handling different players
const durationTracker = () => {
  console.log(window.actualPlayer.currentTime());

  //   window.channelSocket.push("room:current_time", {
  //     time: element.currentTime(),
  //   });
};

const playTracker = () => {
  console.log("Clicked play..");
  window.channelSocket.push("room:video_playing", {});
};

const pauseTracker = () => {
  console.log("Clicked pause..");
};

const endedTracker = () => {
  console.log("Ended..");
};

const canPlayTracker = () => {
  console.log("canplay..");
};

const canPlayThroughTracker = () => {
  console.log("canplaythrough..");
};

const loadStartTracker = () => {
  console.log("Loading has started..");
};

const seekingTracker = () => {
  console.log("Seeking..");
};

const seekedTracker = () => {
  console.log("Seeked..");
};

const stalledTracker = () => {
  console.log("Stalled..");
};

export {
  durationTracker,
  endedTracker,
  playTracker,
  pauseTracker,
  canPlayTracker,
  canPlayThroughTracker,
  loadStartTracker,
  seekingTracker,
  seekedTracker,
  stalledTracker,
};
