const init = (fn) => {
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", fn)
    : fn();
};

export default init;
