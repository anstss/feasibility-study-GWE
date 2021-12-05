export default interface INetDiscountedCashFlowItem {
  year: number;
  netProfit: number;
  depreciation: number;
  profit: number;
  investments: number;
  cashFlow: number;
  discountCoefficient: number;
  discountedCashFlow: number;
  netDiscountedCashIncome: number;
  discountedIncome: number;
  discountedCapitalInvestment: number;
}
