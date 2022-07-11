module.exports = function (temp, product) {
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
