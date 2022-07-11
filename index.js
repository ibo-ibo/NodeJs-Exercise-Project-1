const fs = require("fs");
const path = require("path");
const http = require("http");
const { URL } = require("url");

const replaceTemplate = function (temp, product) {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  output = output.replace(/{%NUTRITIONS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCTPLACE%}/g, product.from);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  return output;
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
let tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const myURL = new URL(`http://127.0.0.1:8000${req.url}`);
  const { searchParams, pathname: pathName } = myURL;
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((item) => replaceTemplate(tempCard, item))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[searchParams.get("id")];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.end("Page not found");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
