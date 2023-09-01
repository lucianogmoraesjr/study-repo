const timeUnits = new Map([
  [
    "second",
    1
  ],
  [
    "minute",
    60
  ],
]);

timeUnits.set("hour", 3600);

timeUnits.forEach((value, key) => console.log(key, value));

timeUnits.delete("hour");

console.log(timeUnits);
console.log(timeUnits.size);
console.log(timeUnits.has("hour"));
console.log(timeUnits.get("minute"));

timeUnits.clear();

console.log(timeUnits.size);