module.exports.getData = {
  getTotalProfit: function (sales) {
    return sales.reduce(
      ((totalProfit, currentSale) => totalProfit += parseFloat(currentSale.gross_profit)), 0
    ).toFixed(2);
  },
  getBestMonth: function (sales) {
    let monthArray = buildMonthArray(sales);

    let mostSales = Math.max(...monthArray.map(month => month.sales));
    let bestMonths = monthArray.filter(month => month.sales === mostSales);
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    // numToLongMonth(bestMonth.month);
    return bestMonths.map(month => monthNames[month.month - 1]);
  }
  // getMostSales: function (sales) {
  //   console.log(sales);
  //   let salesPerson = sales.map(sale => {

  //   })
  // }
};





function buildMonthArray(sales) {
  let saleDates = sales.map(sale => new Date(sale.purchase_date));
  let months = [];
  for (let i = 0; i < 12; i++) {
    months[i] = {
      month: i + 1,
      sales: saleDates.filter(saleDate => {
        let saleMonth = saleDate.toLocaleString("en-US", {
          month: "numeric"
        });
        return parseInt(saleMonth) === i + 1;
      }).length
    };
  }
  return months;
}