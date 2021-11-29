export default interface IStatistic {
  totalForPreviousYears: number;
  averageForPreviousYears: number;
  totalForLastTenYears: number;
  averageForLastTenYears: number;
  maxForLastTenOrLessYears: number;
  maxForLastTenOrLessYearsPercent: number;
  averageForLastTenOrLessYearsPercent: number;
  waterLossVolumePercent: number;
  averageAnnualProjectedWaterProduction: number;
  averageAnnualProjectedWaterProductionWithLosses: number;
}
