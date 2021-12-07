import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { profitabilityRatioSlice } from "../../../store/reducers/profitabilityRatioSlice";
import { useStore } from "react-redux";
import { LOCAL_STORAGE_KEY_PROFITABILITY_RATIO } from "../../../shared/constants";

const ProfitabilityRatioPage = () => {
  const dispatch = useAppDispatch();
  const { profitabilityRatio } = useAppSelector(
    (state) => state.profitabilityRatioReducer
  );
  const { setProfitabilityRatioData } = profitabilityRatioSlice.actions;
  const { netDiscountedCashFlowStatistic } = useAppSelector(
    (state) => state.netDiscountedCashFlowReducer
  );
  const { profit, discountedCashFlow, discountedIncome } =
    netDiscountedCashFlowStatistic.statistic;
  const { operatingCosts, costPerOneSW, costPrice } = useAppSelector(
    (state) => state.costPriceReducer
  );
  const {
    averageAnnualProjectedWaterProduction,
    averageAnnualProjectedWaterProductionWithLosses,
  } = useAppSelector(
    (state) => state.analysisWaterProductionVolumesReducer.statistic
  );
  const { totalExpenses, fixedAssets, investments } = useAppSelector(
    (state) => state.depreciationChargesCalculationReducer
  );
  const {
    productionAssets,
    grossProfit,
    netProfit,
    incomeTax,
    subsoilOwnerIncome,
    paybackPeriod,
    profitabilityCostPriceNetProfit,
  } = useAppSelector((state) => state.staticPerformanceIndicatorsReducer);
  const { internalRateOfReturnGraphicalMethod } = useAppSelector(
    (state) => state.internalRateOfReturnReducer
  );
  const { discountedPaybackPeriod, profitabilityIndex } = useAppSelector(
    (state) => state.lifeCycleSliceReducer
  );

  useEffect(() => {
    const profitabilityRatio = +(profit / (operatingCosts * 25)).toFixed(3);
    dispatch(setProfitabilityRatioData({ profitabilityRatio }));
    saveProfitabilityRatioToLocalStorage();
  }, [profit, operatingCosts]);

  const store = useStore();

  const saveProfitabilityRatioToLocalStorage = () => {
    const data = store.getState().profitabilityRatioReducer;
    localStorage.setItem(
      LOCAL_STORAGE_KEY_PROFITABILITY_RATIO,
      JSON.stringify(data)
    );
  };

  return (
    <div>
      <h2 className="fs-4 my-5">
        Коефіцієнт рентабельності. Очікувані техніко-економічні показники
        експлуатації
      </h2>
      {profitabilityRatio ? (
        <div className="input-group-prepend input-text mb-2">
          Визначений коефіцієнт рентабельності: {profitabilityRatio}
        </div>
      ) : null}
      <h3 className="fs-5 mt-5">
        Очікувані техніко-економічні показники експлуатації
      </h3>
      <div className="table-responsive mt-3">
        <table className="table table-striped table-hover mb-5">
          <thead>
            <tr>
              <th scope="col">Назва показників</th>
              <th scope="col">Одиниці виміру</th>
              <th scope="col">Дані</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={3}>
                Річна продуктивність підприємства водопостачання:
              </td>
            </tr>
            <tr>
              <td>- з видобутку підземних вод</td>
              <td>тис.м³</td>
              <td>{averageAnnualProjectedWaterProduction}</td>
            </tr>
            <tr>
              <td>- з використання підземних вод</td>
              <td>тис.м³</td>
              <td>{averageAnnualProjectedWaterProductionWithLosses}</td>
            </tr>
            <tr>
              <td>Технологічні втрати води</td>
              <td>тис.м³</td>
              <td>
                {
                  +(
                    averageAnnualProjectedWaterProduction -
                    averageAnnualProjectedWaterProductionWithLosses
                  ).toFixed(2)
                }
              </td>
            </tr>
            <tr>
              <td>Розрахунковий термін експлуатації родовища</td>
              <td>років</td>
              <td>25</td>
            </tr>

            <tr>
              <td>Капіталовкладення (в т.ч.):</td>
              <td>тис.грн</td>
              <td>{+(totalExpenses + fixedAssets).toFixed(2)}</td>
            </tr>
            <tr>
              <td>- на геологічне вивчення родовища</td>
              <td>тис.грн</td>
              <td>{totalExpenses}</td>
            </tr>
            <tr>
              <td>- в промбудівництво</td>
              <td>тис.грн</td>
              <td>{fixedAssets}</td>
            </tr>
            <tr>
              <td>Майбутні капіталовкладення (інвестиції)</td>
              <td>тис.грн</td>
              <td>{investments}</td>
            </tr>
            <tr>
              <td>Виробничі фонди (основні + обігові)</td>
              <td>тис.грн</td>
              <td>{productionAssets}</td>
            </tr>
            <tr>
              <td>Загальні річні експлуатаційні витрати</td>
              <td>тис.грн</td>
              <td>{operatingCosts}</td>
            </tr>
            <tr>
              <td>Експлуатаційні витрати на 1м³ видобутку</td>
              <td>грн</td>
              <td>
                {
                  +(
                    operatingCosts / averageAnnualProjectedWaterProduction
                  ).toFixed(2)
                }
              </td>
            </tr>
            <tr>
              <td>Собівартість 1 м³ використаної води</td>
              <td>грн</td>
              <td>{costPerOneSW}</td>
            </tr>
            <tr>
              <td>Відпускна ціна 1 м³ води (без ПДВ)</td>
              <td>грн</td>
              <td>{costPrice}</td>
            </tr>
            <tr>
              <td>Вартість річного обсягу</td>
              <td>тис.грн</td>
              <td>{grossProfit}</td>
            </tr>
            <tr>
              <td>Чистий річний прибуток </td>
              <td>тис.грн</td>
              <td>{netProfit}</td>
            </tr>
            <tr>
              <td>Податок на прибуток</td>
              <td>тис.грн</td>
              <td>{incomeTax}</td>
            </tr>
            <tr>
              <td>Коефіцієнт рентабельності</td>
              <td>долі один.</td>
              <td>{profitabilityRatio}</td>
            </tr>
            <tr>
              <td>Дохід власника надр</td>
              <td>тис.грн</td>
              <td>{subsoilOwnerIncome}</td>
            </tr>
            <tr>
              <td>Рівень рентабельності до собівартості продукції</td>
              <td>%</td>
              <td>{profitabilityCostPriceNetProfit}</td>
            </tr>
            <tr>
              <td>Строк окупності досягнутих капіталовкладень</td>
              <td>роки</td>
              <td>{paybackPeriod}</td>
            </tr>
            <tr>
              <td>Чистий дисконтований прибуток</td>
              <td>тис.грн</td>
              <td>{discountedIncome}</td>
            </tr>
            <tr>
              <td>Дисконтований грошовий потік</td>
              <td>тис.грн</td>
              <td>{discountedCashFlow}</td>
            </tr>
            <tr>
              <td>Внутрішня норма прибутковості</td>
              <td>%</td>
              <td>{internalRateOfReturnGraphicalMethod}</td>
            </tr>
            <tr>
              <td>Дисконтований строк окупності майбутніх капіталовкладень</td>
              <td>роки</td>
              <td>{discountedPaybackPeriod}</td>
            </tr>
            <tr>
              <td>Індекс прибутковості</td>
              <td>долі один.</td>
              <td>{profitabilityIndex}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitabilityRatioPage;
