import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { minCostEffectivePowerSlice } from "../../../store/reducers/minCostEffectivePower";
import { useStore } from "react-redux";
import { LOCAL_STORAGE_KEY_MIN_COST_EFFECTIVE_POWER } from "../../../shared/constants";

const MinCostEffectivePower = () => {
  const { averageAnnualProjectedWaterProductionWithLosses } = useAppSelector(
    (state) => state.analysisWaterProductionVolumesReducer.statistic
  );
  const { costPrice, conditionalFixedCosts, variableCosts } = useAppSelector(
    (state) => state.costPriceReducer
  );
  const {
    specificVariableCosts,
    minimumCostEffectivePower,
    economicSafetyCoefficient,
    economicSecurityFrontier,
    safetyZoneFactor,
  } = useAppSelector((state) => state.minCostEffectivePowerSliceReducer);

  const { setMinCostEffectivePowerData } = minCostEffectivePowerSlice.actions;

  const dispatch = useAppDispatch();

  const calculateMinCostEffectivePower = () => {
    const specificVariableCosts = +(
      variableCosts / averageAnnualProjectedWaterProductionWithLosses
    ).toFixed(2);
    const minimumCostEffectivePower = +(
      conditionalFixedCosts /
      (costPrice - specificVariableCosts)
    ).toFixed(2);
    const economicSafetyCoefficient = +(
      averageAnnualProjectedWaterProductionWithLosses /
      minimumCostEffectivePower
    ).toFixed(2);
    const economicSecurityFrontier = +(
      averageAnnualProjectedWaterProductionWithLosses -
      minimumCostEffectivePower
    ).toFixed(2);
    const safetyZoneFactor = +(
      (economicSecurityFrontier /
        averageAnnualProjectedWaterProductionWithLosses) *
      100
    ).toFixed(2);
    dispatch(
      setMinCostEffectivePowerData({
        specificVariableCosts,
        minimumCostEffectivePower,
        economicSafetyCoefficient,
        economicSecurityFrontier,
        safetyZoneFactor,
      })
    );
    saveMinCostEffectivePowerDataToLocalStorage();
  };

  const store = useStore();

  const saveMinCostEffectivePowerDataToLocalStorage = () => {
    const data = store.getState().minCostEffectivePowerSliceReducer;
    localStorage.setItem(
      LOCAL_STORAGE_KEY_MIN_COST_EFFECTIVE_POWER,
      JSON.stringify(data)
    );
  };

  useEffect(() => {
    calculateMinCostEffectivePower();
  }, [variableCosts, averageAnnualProjectedWaterProductionWithLosses]);

  return (
    <div>
      <h2 className="fs-4 my-5">Мінімальна рентабельна потужність</h2>
      <div className="table-responsive mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Найменування показників</th>
              <th scope="col">Одиниці виміру</th>
              <th scope="col">Значення</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Фактична потужність</td>
              <td>тис.м³/рік</td>
              <td>{averageAnnualProjectedWaterProductionWithLosses}</td>
            </tr>
            <tr>
              <td>Ціна одиниці товарної продукції</td>
              <td>грн</td>
              <td>{costPrice}</td>
            </tr>
            <tr>
              <td>Умовно-постійні витрати</td>
              <td>тис.грн</td>
              <td>{conditionalFixedCosts}</td>
            </tr>
            <tr>
              <td>Змінні витрати</td>
              <td>тис.грн</td>
              <td>{variableCosts}</td>
            </tr>
            <tr>
              <td>Питомі змінні витрати</td>
              <td>грн/м³</td>
              <td>{specificVariableCosts}</td>
            </tr>
            <tr>
              <td>Мінімальна рентабельна потужність</td>
              <td>тис.м³/рік</td>
              <td>{minimumCostEffectivePower}</td>
            </tr>
            <tr>
              <td>Коефіцієнт економічної безпеки</td>
              <td>долі од.</td>
              <td>{economicSafetyCoefficient}</td>
            </tr>
            <tr>
              <td>Межа економічної безпеки</td>
              <td>тис.м³/рік</td>
              <td>{economicSecurityFrontier}</td>
            </tr>
            <tr>
              <td>Коефіцієнт зони безпеки</td>
              <td>%</td>
              <td>{safetyZoneFactor}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MinCostEffectivePower;
