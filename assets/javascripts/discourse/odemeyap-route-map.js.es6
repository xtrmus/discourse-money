export default {
  resource: "user",
  map() {
    this.route(
      "odemeyap",
      { path: "/odemeyap", resetNamespace: true }
    );
  },
};