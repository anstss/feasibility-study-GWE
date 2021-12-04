import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import ButtonGroup from "../../button-group/buttonGroup";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { staticPerformanceIndicatorsSlice } from "../../../store/reducers/staticPerformanceIndicatorsSlice";
import DeleteModal from "../../delete-modal/deleteModal";
import { LOCAL_STORAGE_KEY_STATIC_PERFORMANCE_INDICATORS } from "../../../shared/constants";
import { useStore } from "react-redux";

const StaticPerformanceIndicatorsSchema = Yup.object().shape({
  incomeTax: Yup.number().typeError("Введіть число"),
});

const StaticPerformanceIndicatorsPage = () => {
  const dispatch = useAppDispatch();
  const {
    incomeTaxPercent,
    totalAnnualCost,
    grossProfit,
    incomeTax,
    netProfit,
    workingCapital,
    productionAssets,
    profitabilityCostPriceGrossProfit,
    profitabilityCostPriceNetProfit,
    profitabilityProductionAssetsGrossProfit,
    profitabilityProductionAssetsNetProfit,
    paybackPeriod,
    subsoilOwnerIncome,
  } = useAppSelector((state) => state.staticPerformanceIndicatorsReducer);
  const {
    setIncomeTax,
    clearStaticPerformanceIndicators,
    setStaticPerformanceIndicatorsData,
  } = staticPerformanceIndicatorsSlice.actions;

  const {
    averageAnnualProjectedWaterProduction,
    averageAnnualProjectedWaterProductionWithLosses,
  } = useAppSelector(
    (state) => state.analysisWaterProductionVolumesReducer.statistic
  );

  const {
    costPerOneSW,
    operatingCosts,
    costPrice,
    electricityCosts,
    materialsAndSpareParts,
    maintenance,
    laboratoryWorks,
    rentGWUse,
    rentSubsoilUse,
  } = useAppSelector((state) => state.costPriceReducer);

  const { fixedAssets, totalExpenses } = useAppSelector(
    (state) => state.depreciationChargesCalculationReducer
  );

  const formik = useFormik({
    initialValues: {
      incomeTaxPercent: "",
    },
    validationSchema: StaticPerformanceIndicatorsSchema,
    onSubmit: (values) => {
      handleCalculating();
    },
  });

  const setInitialFormikValues = () => {
    formik.setValues({
      incomeTaxPercent: "",
    });
  };

  useEffect(() => {
    if (incomeTaxPercent) {
      formik.values.incomeTaxPercent = incomeTaxPercent.toString();
    }
  }, [incomeTaxPercent]);

  const handleCancel = () => {
    setInitialFormikValues();
  };

  const handleCalculating = () => {
    const { incomeTaxPercent } = formik.values;
    dispatch(setIncomeTax(+(+incomeTaxPercent).toFixed(2)));
    const totalAnnualCost = +(
      averageAnnualProjectedWaterProductionWithLosses * costPrice
    ).toFixed(2);
    const grossProfit = +(totalAnnualCost - operatingCosts).toFixed(2);
    const incomeTax = +((grossProfit / 100) * +incomeTaxPercent).toFixed(2);
    const netProfit = +(grossProfit - incomeTax).toFixed(2);
    const workingCapital = +(
      electricityCosts +
      materialsAndSpareParts +
      maintenance +
      laboratoryWorks
    ).toFixed(2);
    const productionAssets = +(fixedAssets + workingCapital).toFixed(2);
    const profitabilityCostPriceGrossProfit = +(
      (grossProfit / operatingCosts) *
      100
    ).toFixed(2);
    const profitabilityCostPriceNetProfit = +(
      (netProfit / operatingCosts) *
      100
    ).toFixed(2);
    const profitabilityProductionAssetsGrossProfit = +(
      (grossProfit / productionAssets) *
      100
    ).toFixed(2);
    const profitabilityProductionAssetsNetProfit = +(
      (netProfit / productionAssets) *
      100
    ).toFixed(2);
    const paybackPeriod = +((fixedAssets + totalExpenses) / netProfit).toFixed(
      2
    );
    const subsoilOwnerIncome = +(
      rentGWUse +
      rentSubsoilUse +
      incomeTax
    ).toFixed(2);
    dispatch(
      setStaticPerformanceIndicatorsData({
        totalAnnualCost,
        grossProfit,
        incomeTax,
        netProfit,
        workingCapital,
        productionAssets,
        profitabilityCostPriceGrossProfit,
        profitabilityCostPriceNetProfit,
        profitabilityProductionAssetsGrossProfit,
        profitabilityProductionAssetsNetProfit,
        paybackPeriod,
        subsoilOwnerIncome,
      })
    );
    saveStaticPerformanceIndicatorsToLocalStorage();
  };

  const store = useStore();

  const saveStaticPerformanceIndicatorsToLocalStorage = () => {
    const data = store.getState().staticPerformanceIndicatorsReducer;
    localStorage.setItem(
      LOCAL_STORAGE_KEY_STATIC_PERFORMANCE_INDICATORS,
      JSON.stringify(data)
    );
  };

  const handleDeleteData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_STATIC_PERFORMANCE_INDICATORS);
    dispatch(clearStaticPerformanceIndicators());
    setInitialFormikValues();
  };

  return (
    <div>
      <h2 className="fs-4 my-5">Статичні показники експлуатації</h2>
      <h3 className="fs-5">Валовий дохід та прибуток підприємства</h3>
      <div className="input-group-prepend input-text mb-2">
        Введіть податок на прибуток (у %):
      </div>
      <input
        name={"incomeTaxPercent"}
        type="text"
        className="form-control mb-2"
        value={formik.values.incomeTaxPercent}
        onChange={formik.handleChange}
      />
      {formik.errors.incomeTaxPercent && (
        <div className="invalid-feedback d-block">
          {formik.errors.incomeTaxPercent}
        </div>
      )}
      <ButtonGroup
        handleCancel={handleCancel}
        cancelIsDisabled={!formik.values.incomeTaxPercent}
        deleteIsDisabled={!incomeTaxPercent}
        handleDataIsDisabled={!formik.values.incomeTaxPercent}
        handleData={handleCalculating}
        handleDataBtnText={"Розрахувати"}
      />
      <div className="table-responsive mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Показники</th>
              <th scope="col">Одиниці виміру</th>
              <th scope="col">Значення</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Обсяг видобутку води на прогноз</td>
              <td>тис.м³/рік</td>
              <td>{averageAnnualProjectedWaterProduction}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Обсяг використання води</td>
              <td>тис.м³/рік</td>
              <td>{averageAnnualProjectedWaterProductionWithLosses}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Собівартість 1 м³ використаної води</td>
              <td>грн</td>
              <td>{costPerOneSW}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Загальні річні експлуатаційні витрати</td>
              <td>тис.грн</td>
              <td>{operatingCosts}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Відпускна ціна 1м³ води (без ПДВ)</td>
              <td>грн</td>
              <td>{costPrice}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Загальна річна вартість товарної продукції</td>
              <td>тис.грн</td>
              <td>{totalAnnualCost}</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Валовий прибуток</td>
              <td>тис.грн</td>
              <td>{grossProfit}</td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Податок на прибуток</td>
              <td>тис.грн</td>
              <td>{incomeTax}</td>
            </tr>
            <tr>
              <th scope="row">9</th>
              <td>Чистий прибуток</td>
              <td>тис.грн</td>
              <td>{netProfit}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 className="fs-5 my-3">
        Капіталовкладення у виробничі фонди та рентабельність водоспоживання.
        Окупність капіталовкладень. Дохід власника надр
      </h3>
      <div className="table-responsive mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Показники</th>
              <th scope="col">Одиниці виміру</th>
              <th scope="col">Значення</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={4}>Капіталовкладення</th>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>Основні фонди</td>
              <td>тис.грн</td>
              <td>{fixedAssets}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Обігові засоби</td>
              <td>тис.грн</td>
              <td>{workingCapital}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Виробничі фонди</td>
              <td>тис.грн</td>
              <td>{productionAssets}</td>
            </tr>
            <tr>
              <th colSpan={4}>Рентабельність підприємства</th>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>По відношенню до собівартості (валовий прибуток)</td>
              <td>%</td>
              <td>{profitabilityCostPriceGrossProfit}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>По відношенню до собівартості (чистий прибуток)</td>
              <td>%</td>
              <td>{profitabilityCostPriceNetProfit}</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>По відношенню до виробничих фондів (валовий прибуток)</td>
              <td>%</td>
              <td>{profitabilityProductionAssetsGrossProfit}</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>По відношенню до виробничих фондів (чистий прибуток)</td>
              <td>%</td>
              <td>{profitabilityProductionAssetsNetProfit}</td>
            </tr>
            <tr>
              <th scope="row" colSpan={2}>
                Строк окупності капіталовкладень
              </th>
              <td>роки</td>
              <td>{paybackPeriod}</td>
            </tr>
            <tr>
              <th scope="row" colSpan={2}>
                Дохід власника надр
              </th>
              <td>тис.грн</td>
              <td>{subsoilOwnerIncome}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <DeleteModal handleDeleteData={handleDeleteData} />
    </div>
  );
};

export default StaticPerformanceIndicatorsPage;
