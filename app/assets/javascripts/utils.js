function vector3ToString(vector3){
  console.log("[" + vector3.x + ", " + vector3.y + ", " + vector3.z + "]")
}
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
function constrain(v, min, max){
  if( v < min )
    v = min;
  else
  if( v > max )
    v = max;
  return v;
}

function map(value, start1,  stop1, start2,  stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function randomBetween(low, high) {
  if (low >= high) return low;
  var diff = high - low;
  return Math.random() * diff + low;
}
