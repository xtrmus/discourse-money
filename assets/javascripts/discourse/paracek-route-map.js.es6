export default {
  resource: "user",
  map() {
    this.route(
      "paracek",
      { path: "/paracek", resetNamespace: true }
    );
  },
};