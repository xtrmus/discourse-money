import DiscourseRoute from 'discourse/routes/discourse';

/**
 * Route for the path `/paracek` as defined in `../paracek-route-map.js.es6`.
 */
export default DiscourseRoute.extend({
  renderTemplate() {
    // Renders the template `../templates/paracek.hbs`
    this.render('paracek');
  }
});