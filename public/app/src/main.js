export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('resources/index')
    .plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());
}
