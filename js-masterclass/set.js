const charsets = new Set([
  "ASCII",
  "ISO-8859-1",
]);

charsets.forEach(charset => console.log(charset));

charsets.add("UTF-8");


console.log(charsets);
console.log(charsets.size);
console.log(charsets.delete("UTF-8"))
console.log(charsets.has("UTF-8"))

charsets.clear();

console.log(charsets);