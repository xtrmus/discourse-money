import DiscourseRoute from 'discourse/routes/discourse';

/**
 * Route for the path `/odemeyap` as defined in `../odemeyap-route-map.js.es6`.
 */
export default DiscourseRoute.extend({
  renderTemplate() {
    // Renders the template `../templates/odemeyap.hbs`
    this.render('odemeyap');
  }
});