export function configure(aurelia) {
  // The API changed to globalResources instead of globalizeResources
  aurelia.globalResources('../date-format');
  //aurelia.globalResources('date-format');
}
