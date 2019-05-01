module.exports.getData = {
  getTotalProfit: function (sales) {
    return sales.reduce(
      ((totalProfit, currentSale) => totalProfit += parseFloat(currentSale.gross_profit)), 0
    ).toFixed(2);
  },
  getBestMonth: function (sales) {
    let monthArray = buildMonthArray(sales);

    let mostSales = Math.max(...monthArray.map(month => month.count));
    return monthArray
      .filter(month => month.count === mostSales)
      .map(month => month.month);
  },
  getMostSales: function (sales) {
    let salesPerson = sales.map(
      sale => `${sale.sales_agent.first_name} ${sale.sales_agent.last_name}`
    );

    console.log(salesPerson);
  }
};





function buildMonthArray(sales) {
  let saleDates = sales.map(sale => new Date(sale.purchase_date));
  return saleDates.reduce((months, saleDate) => {
    //  return array of objects with each month being an object
    let saleMonth = saleDate.toLocaleString("en-US", {
      month: "short"
    });
    let monthNum;
    if (months.length > 0) {
      monthNum = months.findIndex(month => {
        return month.month === saleMonth;
      });
    } else monthNum = -1;
    if (monthNum === -1) {
      // new month in array
      months.push({
        month: saleMonth,
        count: 1
      });
    } else {
      // month exists!
      months[monthNum].count++;
    }
    return months;
  }, []);

}