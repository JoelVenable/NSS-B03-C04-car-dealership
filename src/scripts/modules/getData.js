module.exports.getData = {
  getTotalProfit: function (sales) {
    return sales.reduce(
      ((totalProfit, currentSale) => totalProfit += parseFloat(currentSale.gross_profit)), 0
    ).toFixed(2);
  }
}