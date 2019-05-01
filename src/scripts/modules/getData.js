module.exports.getData = {
  getTotalProfit: function (sales) {
    return sales.reduce(
      ((totalProfit, currentSale) => totalProfit += parseFloat(currentSale.gross_profit)), 0
    ).toFixed(2);
  },
  getBestMonth: function (sales) {
    let saleDates = sales.map(sale => new Date(sale.purchase_date).toLocaleString("en-US", {
      month: "short"
    }));
    let bestMonth = 0;
    let monthSales = buildIteratorObject(saleDates);
    for (const month in monthSales) {
      if (monthSales.hasOwnProperty(month)) {
        bestMonth = Math.max(bestMonth, monthSales[month]);
      }
    }
    let bestMonths = [];
    for (const month in monthSales) {
      if (monthSales.hasOwnProperty(month) && monthSales[month] === bestMonth) {
        bestMonths.push(month);
      }
    }
    return bestMonths;
  },
  getMostSales: function (sales) {
    let salesTally = buildSalesPersonArray(sales);

    console.log(salesTally);
  }
};



function buildIteratorObject(sales) {
  return sales.reduce((accumulatorObject, currentItem) => {
    //  return array of objects with each month being an object
    if (!accumulatorObject[currentItem]) {
      accumulatorObject[currentItem] = 1;
    } else {
      accumulatorObject[currentItem]++;
    }
    return accumulatorObject;
  }, {});

}



function buildSalesPersonArray(sales) {
  let salesPeople = sales.map(sale => {
    return {
      name: `${sale.sales_agent.first_name} ${sale.sales_agent.last_name}`,
      profit: sale.gross_profit
    }
  });
  return salesPeople.reduce((people, currentSale) => {
    //  return array of objects containing each salesperson, their total sales, and gross profits.

    let personIndex = people.findIndex(person => {
      return person.name === currentSale.name;
    });

    if (personIndex === -1) {
      // new person in array
      currentSale.count = 1
      people.push(currentSale);
    } else {
      // person already sold a car!
      people[personIndex].count++;
      people[personIndex].profit += currentSale.profit;
    }
    console.log(people);
    return people;
  }, []);

}