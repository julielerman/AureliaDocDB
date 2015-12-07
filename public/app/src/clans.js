export function getClans(){
 var clans = [], propertyName;
  for(propertyName in clansObject) {
    if (clansObject.hasOwnProperty(propertyName)) {
      clans.push({ code: clansObject[propertyName], name: propertyName });
    }
  }
  return clans;
}

var clansObject = {
  "American Ninja Warriors": "anj",
  "Vermont Clan": "vc",
  "Turtles": "t"
};