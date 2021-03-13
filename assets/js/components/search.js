import init from "./init.js";

import { toggleClass } from "@oddcamp/js-utils/src/attribute";

init(() => {
  const searchDiv = document.querySelector("#search");
  if (!searchDiv) return;

  const searchButton = document.querySelector("#search-button");

  searchButton.addEventListener("click", () => {
    toggleClass(searchDiv, "hidden");
    toggleClass(searchButton, "opacity-75");
  });
});
