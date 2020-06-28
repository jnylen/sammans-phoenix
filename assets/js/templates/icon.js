import Mustache from "mustache";

const iconTemplate = (icon, values) => {
  let template = `
        <div class="bg-cool-gray-900 rounded-full p-3 h-12 w-12 flex items-center justify-center">
            {{icon}}
        </div>
        <div class="pl-4 text-sm">
          <h4 class="font-black">{{name}}</h4>
          <span>{{message}}</span>
        </div>
    `;

  let childElement = document.createElement("div");
  childElement.className = "flex items-center text-cool-gray-300 mb-2";

  let html = Mustache.render(template, values);
  childElement.innerHTML = html;
  document.querySelector("#events").appendChild(childElement);
};

export default iconTemplate;
