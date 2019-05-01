import {
  getData
} from "./getData";
import {
  postReport
} from "./postReport";

module.exports.handleSales = function (sales) {
  let sales2017 = sales.filter(sale => sale.purchase_date.slice(0, 4) === "2017");
  let report = {
    totalProfit: getData.getTotalProfit(sales2017),
    bestMonth: getData.getBestMonth(sales2017),
    mostSales: getData.getMostSales(sales2017, "count"),
    mostProfit: getData.getMostSales(sales2017, "profit"),
    popularModel: getData.getMostPopularModel(sales2017),
    popularBank: getData.getMostCommonBank(sales2017)
  };
  postReport(report);
};