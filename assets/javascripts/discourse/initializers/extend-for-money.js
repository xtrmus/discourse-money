import { withPluginApi } from "discourse/lib/plugin-api";
import { isEmpty } from "@ember/utils";


function addSetting(api) {
  api.modifyClass("controller:preferences/profile", {
    pluginId: "discourse-money",

    actions: {
      save() {
        this.set(
          "model.custom_fields.see_money",
          this.get("model.see_money")
        );
        this.get("saveAttrNames").push("custom_fields");
        this._super();
      },
    },
  });
}

export default {
  name: "extend-for-money",
  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    if (siteSettings.money_enabled) {
      withPluginApi("0.1", (api) => addSetting(api, siteSettings));
    }
  },
};
