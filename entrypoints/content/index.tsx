import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./style.css";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "example-ui",
      position: "inline",
      onMount(container) {
        const wrapper = document.createElement("div");
        container.append(wrapper);

        const root = ReactDOM.createRoot(wrapper);
        root.render(<App />);
        return { root, wrapper };
      },
    });

    ui.mount();
  },
});
