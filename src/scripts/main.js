import {
  API
} from "./modules/API.js";
import {
  getData
} from "./modules/getData";
import {
  postReport
} from "./modules/postReport";


API.getLocalData("dealership")
  .then(sales => {
    let sales2017 = sales.filter(sale => sale.purchase_date.slice(0, 4) === "2017");
    let report = {
      totalProfit: getData.getTotalProfit(sales2017),
      bestMonth: getData.getBestMonth(sales2017)
      //mostSales: getMostSales(sales2017)
    };
    postReport(report);
  });

// function numToLongMonth(monthNum) {
//   let monthDate = new Date(`2017-${monthNum}-01`);
//   console.log(monthDate);
// }






// function getMostSales(sales) {
//   let saleDates = makeSaleDateArray(sales);

//   let months = [];
//   for (let i = 0; i < 12; i++) {
//     months[i] = {
//       month: i + 1,
//       sales: saleDates.filter(saleDate => {
//         return saleDate.toLocaleString("en-US", {
//           month: "numeric"
//         }) === i + 1;
//       }).length
//     };
//   }
//   console.log(months);
//   let mostSales = Math.max(...months.map(month => month.sales));
//   let bestMonth = months.find(month => month.sales === mostSales);
//   return bestMonth.month;

// }