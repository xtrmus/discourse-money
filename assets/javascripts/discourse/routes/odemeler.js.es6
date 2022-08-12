import DiscourseRoute from 'discourse/routes/discourse';

/**
 * Route for the path `/odemeler` as defined in `../odemeler-route-map.js.es6`.
 */
export default DiscourseRoute.extend({
  renderTemplate() {
    // Renders the template `../templates/odemeler.hbs`
    this.render('odemeler');
  }
});