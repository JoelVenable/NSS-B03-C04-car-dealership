function getMostSales(sales, objectKeyToCheck) {
  let salesTally = buildSalesPersonArray(sales);
  let bestSales = salesTally.reduce((bestPerson, currentPerson) => {
    if (bestPerson === 0) {
      return currentPerson;
    } else if (currentPerson[objectKeyToCheck] > bestPerson[objectKeyToCheck]) {
      return currentPerson;
    } else if (bestPerson[objectKeyToCheck] > currentPerson[objectKeyToCheck]) {
      return bestPerson;
    } else {
      bestPerson.name.push(currentPerson.name[0]);
      return bestPerson;
    }
  }, 0);
  return bestSales.name;
}

function getTotalProfit(sales) {
  return sales.reduce(
    ((totalProfit, currentSale) => totalProfit += parseFloat(currentSale.gross_profit)), 0
  ).toFixed(2);
}

function getBestMonth(sales) {
  let saleDates = sales.map(sale => new Date(sale.purchase_date).toLocaleString("en-US", {
    month: "short"
  }));

  let monthSales = buildIteratorObject(saleDates);
  return getMostCommon(monthSales);

}

function getMostCommon(objectOfThingsWithCounts) {
  let mostFrequent = 0;
  for (const thing in objectOfThingsWithCounts) {
    if (objectOfThingsWithCounts.hasOwnProperty(thing)) {
      mostFrequent = Math.max(mostFrequent, objectOfThingsWithCounts[thing]);
    }
  }
  let itemsWithMost = [];
  for (const thing in objectOfThingsWithCounts) {
    if (objectOfThingsWithCounts.hasOwnProperty(thing) && objectOfThingsWithCounts[thing] === mostFrequent) {
      itemsWithMost.push(thing);
    }
  }
  return itemsWithMost;
}


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


function getMostPopularModel(sales) {
  let modelArray = buildIteratorObject(sales.map(sale => sale.vehicle.model));
  return getMostCommon(modelArray);
}

function getMostCommonBank(sales) {
  let bankArray = buildIteratorObject(sales.map(sale => sale.credit.credit_provider));
  return getMostCommon(bankArray);
}

function buildSalesPersonArray(sales) {
  let salesPeople = sales.map(sale => {
    return {
      name: [`${sale.sales_agent.first_name} ${sale.sales_agent.last_name}`],
      profit: sale.gross_profit
    };
  });
  return salesPeople.reduce((people, currentSale) => {
    //  return array of objects containing each salesperson, their total sales, and gross profits.

    let personIndex = people.findIndex(person => {
      return person.name[0] === currentSale.name[0];
    });

    if (personIndex === -1) {
      // new person in array
      currentSale.count = 1;
      people.push(currentSale);
    } else {
      // person already sold a car!
      people[personIndex].count++;
      people[personIndex].profit += currentSale.profit;
    }
    return people;
  }, []);

}


module.exports.getData = {
  getTotalProfit: getTotalProfit,
  getBestMonth: getBestMonth,
  getMostSales: getMostSales,
  getMostPopularModel: getMostPopularModel,
  getMostCommonBank: getMostCommonBank
};