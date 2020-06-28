import iconTemplate from "../templates/icon.js";

const playVideo = (channel) => {
  channel.on("play_video", (payload) => {
    let icon = `<svg class="h-full w-full" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>`;

    iconTemplate(icon, payload);
  });
};

export default playVideo;
