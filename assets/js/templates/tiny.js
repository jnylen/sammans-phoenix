import Mustache from "mustache";

const tinyTemplate = (values) => {
  let template = `
      <h4 class="font-black w-auto mr-1 flex-shrink truncate" style="min-width: 20%;" title="{{{name}}}">{{{name}}}</h4>
      <div class="flex-1 flex flex-wrap items-center w-2/3">{{{message}}}</div>
      <time class="w-auto mr-1 flex-shrink">{{{time}}}</time>
    `;

  let childElement = document.createElement("div");
  childElement.className =
    "text-xs text-cool-gray-500 flex flex-no-wrap items-start mb-2 w-full";

  let html = Mustache.render(template, values);
  childElement.innerHTML = html;

  const eventBox = document.querySelector("#events_box");

  eventBox.appendChild(childElement);
  eventBox.scrollIntoView(false);
};

export default tinyTemplate;
