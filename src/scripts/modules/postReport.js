module.exports.postReport = function (report) {

  const container = document.getElementById("container");
  container.innerHTML = `
  <h4>Total Profit: $${report.totalProfit}</h4>
  <p>Month with highest number of cars sold: ${report.bestMonth} 2017</p>
  <p>Salesperson with most sales: ${report.mostSales}</p>
  <p>Salesperson with most profit: ${report.mostProfit}</p>
  <p>Most popular model: ${report.popularModel}</p>
  <p>Bank with most loans: ${report.popularBank}</p>
  `;
}