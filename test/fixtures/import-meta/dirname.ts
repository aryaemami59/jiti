console.log("import.meta.dirname", import.meta.dirname);
console.log("import.meta.filename", import.meta.filename);

console.log("__dirname", __dirname);
console.log("__filename", __filename);

console.log(import.meta.dirname === __dirname);
console.log(import.meta.filename === __filename);

export {};
