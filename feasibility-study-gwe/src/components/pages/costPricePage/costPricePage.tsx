import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonGroup from "../../button-group/buttonGroup";
import { LOCAL_STORAGE_KEY_COST_PRICE } from "../../../shared/constants";
import { useStore } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { costPriceSlice } from "../../../store/reducers/costPriceSlice";
import DeleteModal from "../../delete-modal/deleteModal";
import IDepreciationCharges from "../../../Types/IDepreciationCharges";

const CostPricePageSchema = Yup.object().shape({
  costPrice: Yup.number().typeError("Введіть число"),
  rentRateGWUse: Yup.number().typeError("Введіть число"),
  coefficientRentRateGWUse: Yup.number().typeError("Введіть число"),
  rentRateSubsoilUse: Yup.number().typeError("Введіть число"),
  basicSalary: Yup.number().typeError("Введіть число"),
  electricityCosts: Yup.number().typeError("Введіть число"),
  materialsAndSpareParts: Yup.number().typeError("Введіть число"),
  maintenance: Yup.number().typeError("Введіть число"),
  laboratoryWorks: Yup.number().typeError("Введіть число"),
  otherExpenses: Yup.number().typeError("Введіть число"),
});

const CostPricePage = () => {
  const formik = useFormik({
    initialValues: {
      costPrice: "",
      rentRateGWUse: "",
      coefficientRentRateGWUse: "",
      rentRateSubsoilUse: "",
      basicSalary: "",
      electricityCosts: "",
      materialsAndSpareParts: "",
      maintenance: "",
      laboratoryWorks: "",
      otherExpenses: "",
    },
    validationSchema: CostPricePageSchema,
    onSubmit: (values) => {
      handleCalculating();
    },
  });

  const setInitialFormikValues = () => {
    formik.setValues({
      costPrice: "",
      rentRateGWUse: "",
      coefficientRentRateGWUse: "",
      rentRateSubsoilUse: "",
      basicSalary: "",
      electricityCosts: "",
      materialsAndSpareParts: "",
      maintenance: "",
      laboratoryWorks: "",
      otherExpenses: "",
    });
  };

  const handleCancel = () => {
    setInitialFormikValues();
  };

  const dispatch = useAppDispatch();
  const [cancelIsDisabled, setCancelIsDisabled] = useState<boolean>(true);
  const [deleteIsDisabled, setDeleteIsDisabled] = useState<boolean>(true);
  const [handleDataIsDisabled, setHandleDataIsDisabled] =
    useState<boolean>(true);
  const {
    costPrice,
    rentRateGWUse,
    coefficientRentRateGWUse,
    rentRateSubsoilUse,
    basicSalary,
    conditionalFixedCosts,
    electricityCosts,
    materialsAndSpareParts,
    maintenance,
    laboratoryWorks,
    otherExpenses,
    rentGWUse,
    rentSubsoilUse,
    variableCosts,
    operatingCosts,
    operatingCostsPerOnePW,
    costPerOneSW,
  } = useAppSelector((state) => state.costPriceReducer);

  const { depreciationCharges, fixedAssetsCharges } = useAppSelector(
    (state) => state.depreciationChargesCalculationReducer
  );
  const [
    fixedAssetsAndExpensesDepreciation,
    setFixedAssetsAndExpensesDepreciation,
  ] = useState<number>(0);
  const { setCostPriceData, clearCostPriceData } = costPriceSlice.actions;

  const calculateFixedAssetsAndExpensesDepreciation = (): number => {
    const totalDepreciationChargesKeys = Object.keys(depreciationCharges);
    let totalDepreciationCharges = 0;
    totalDepreciationChargesKeys.forEach((key) => {
      totalDepreciationCharges +=
        depreciationCharges[key as keyof IDepreciationCharges];
    });
    const fixedAssetsAndExpensesDepreciation = +(
      totalDepreciationCharges + fixedAssetsCharges
    ).toFixed(2);
    return fixedAssetsAndExpensesDepreciation;
  };

  useEffect(() => {
    setFixedAssetsAndExpensesDepreciation(
      calculateFixedAssetsAndExpensesDepreciation()
    );
  }, [depreciationCharges, fixedAssetsCharges]);

  useEffect(() => {
    if (costPrice) {
      formik.values.costPrice = costPrice.toString();
    }
    if (rentRateGWUse) {
      formik.values.rentRateGWUse = rentRateGWUse.toString();
    }
    if (coefficientRentRateGWUse) {
      formik.values.coefficientRentRateGWUse =
        coefficientRentRateGWUse.toString();
    }
    if (rentRateSubsoilUse) {
      formik.values.rentRateSubsoilUse = rentRateSubsoilUse.toString();
    }
    if (basicSalary) {
      formik.values.basicSalary = basicSalary.toString();
    }
    if (electricityCosts) {
      formik.values.electricityCosts = electricityCosts.toString();
    }
    if (materialsAndSpareParts) {
      formik.values.materialsAndSpareParts = materialsAndSpareParts.toString();
    }
    if (maintenance) {
      formik.values.maintenance = maintenance.toString();
    }
    if (laboratoryWorks) {
      formik.values.laboratoryWorks = laboratoryWorks.toString();
    }
    if (otherExpenses) {
      formik.values.otherExpenses = otherExpenses.toString();
    }
  }, [
    costPrice,
    rentRateGWUse,
    coefficientRentRateGWUse,
    rentRateSubsoilUse,
    basicSalary,
    electricityCosts,
    materialsAndSpareParts,
    maintenance,
    laboratoryWorks,
    otherExpenses,
  ]);

  useEffect(() => {
    const {
      costPrice,
      rentRateGWUse,
      rentRateSubsoilUse,
      coefficientRentRateGWUse,
      basicSalary,
      electricityCosts,
      materialsAndSpareParts,
      maintenance,
      laboratoryWorks,
      otherExpenses,
    } = formik.values;
    if (
      costPrice ||
      rentRateGWUse ||
      rentRateSubsoilUse ||
      coefficientRentRateGWUse ||
      basicSalary ||
      electricityCosts ||
      materialsAndSpareParts ||
      maintenance ||
      laboratoryWorks ||
      otherExpenses
    ) {
      setCancelIsDisabled(false);
    } else {
      setCancelIsDisabled(true);
    }
    if (
      costPrice &&
      rentRateGWUse &&
      rentRateSubsoilUse &&
      coefficientRentRateGWUse
    ) {
      setHandleDataIsDisabled(false);
    } else {
      setHandleDataIsDisabled(true);
    }
  }, [
    formik.values.costPrice,
    formik.values.rentRateGWUse,
    formik.values.coefficientRentRateGWUse,
    formik.values.rentRateSubsoilUse,
    formik.values.basicSalary,
    formik.values.electricityCosts,
    formik.values.materialsAndSpareParts,
    formik.values.maintenance,
    formik.values.laboratoryWorks,
    formik.values.otherExpenses,
  ]);

  useEffect(() => {
    if (
      costPrice ||
      rentRateGWUse ||
      coefficientRentRateGWUse ||
      rentRateGWUse ||
      basicSalary ||
      electricityCosts ||
      materialsAndSpareParts ||
      maintenance ||
      laboratoryWorks ||
      otherExpenses ||
      variableCosts ||
      operatingCosts ||
      operatingCostsPerOnePW ||
      costPerOneSW
    ) {
      setDeleteIsDisabled(false);
    } else {
      setDeleteIsDisabled(true);
    }
  }, [
    costPrice,
    rentRateGWUse,
    coefficientRentRateGWUse,
    rentRateSubsoilUse,
    basicSalary,
    electricityCosts,
    materialsAndSpareParts,
    maintenance,
    laboratoryWorks,
    otherExpenses,
    variableCosts,
    operatingCosts,
    operatingCostsPerOnePW,
    costPerOneSW,
  ]);

  const {
    averageAnnualProjectedWaterProduction,
    averageAnnualProjectedWaterProductionWithLosses,
  } = useAppSelector(
    (state) => state.analysisWaterProductionVolumesReducer.statistic
  );

  const handleCalculating = () => {
    const {
      costPrice,
      rentRateGWUse,
      rentRateSubsoilUse,
      coefficientRentRateGWUse,
      basicSalary,
      electricityCosts,
      materialsAndSpareParts,
      maintenance,
      laboratoryWorks,
      otherExpenses,
    } = formik.values;
    const conditionalFixedCosts = +(
      +basicSalary + fixedAssetsAndExpensesDepreciation
    ).toFixed(2);
    const rentGWUse = +(
      ((averageAnnualProjectedWaterProduction * +rentRateGWUse) / 100) *
      +coefficientRentRateGWUse
    ).toFixed(2);
    const rentSubsoilUse = +(
      ((averageAnnualProjectedWaterProductionWithLosses * +costPrice) / 100) *
      +rentRateSubsoilUse
    ).toFixed(2);
    const variableCosts = +(
      +electricityCosts +
      +materialsAndSpareParts +
      +maintenance +
      +laboratoryWorks +
      +otherExpenses +
      rentGWUse +
      rentSubsoilUse
    ).toFixed(2);
    const operatingCosts = +(conditionalFixedCosts + variableCosts).toFixed(2);
    const operatingCostsPerOnePW = +(
      operatingCosts / averageAnnualProjectedWaterProduction
    ).toFixed(2);
    const costPerOneSW = +(
      operatingCosts / averageAnnualProjectedWaterProductionWithLosses
    ).toFixed(2);
    dispatch(
      setCostPriceData({
        costPrice: +(+costPrice).toFixed(2),
        rentRateGWUse: +(+rentRateGWUse).toFixed(2),
        rentRateSubsoilUse: +(+rentRateSubsoilUse).toFixed(2),
        coefficientRentRateGWUse: +(+coefficientRentRateGWUse).toFixed(2),
        basicSalary: +(+basicSalary).toFixed(2),
        conditionalFixedCosts,
        electricityCosts: +(+electricityCosts).toFixed(2),
        materialsAndSpareParts: +(+materialsAndSpareParts).toFixed(2),
        maintenance: +(+maintenance).toFixed(2),
        laboratoryWorks: +(+laboratoryWorks).toFixed(2),
        otherExpenses: +(+otherExpenses).toFixed(2),
        rentGWUse,
        rentSubsoilUse,
        variableCosts,
        operatingCosts,
        operatingCostsPerOnePW,
        costPerOneSW,
      })
    );
    saveCostPriceDataToLocalStorage();
  };

  const store = useStore();

  const saveCostPriceDataToLocalStorage = () => {
    const data = store.getState().costPriceReducer;
    localStorage.setItem(LOCAL_STORAGE_KEY_COST_PRICE, JSON.stringify(data));
  };

  const handleDeleteData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_COST_PRICE);
    dispatch(clearCostPriceData());
    setInitialFormikValues();
  };

  return (
    <div>
      <h2 className="fs-4 my-5">Собівартість продукції</h2>
      <div className="input-group-prepend input-text mb-2">
        Введіть ціну на товарну продукцію (у грн):
      </div>
      <input
        name={"costPrice"}
        type="text"
        className="form-control mb-2"
        value={formik.values.costPrice}
        onChange={formik.handleChange}
      />
      {formik.errors.costPrice && (
        <div className="invalid-feedback d-block">
          {formik.errors.costPrice}
        </div>
      )}
      <div className="input-group-prepend input-text mb-2">
        Введіть ставку рентної плати за спеціальне використання підземних вод (у
        грн):
      </div>
      <input
        name={"rentRateGWUse"}
        type="text"
        className="form-control mb-2"
        value={formik.values.rentRateGWUse}
        onChange={formik.handleChange}
      />
      {formik.errors.rentRateGWUse && (
        <div className="invalid-feedback d-block">
          {formik.errors.rentRateGWUse}
        </div>
      )}
      <div className="input-group-prepend input-text mb-2">
        Введіть коефіцієнт до ставок рентної плати за спеціальне використання
        підземних вод:
      </div>
      <input
        name={"coefficientRentRateGWUse"}
        type="text"
        className="form-control mb-2"
        value={formik.values.coefficientRentRateGWUse}
        onChange={formik.handleChange}
      />
      {formik.errors.coefficientRentRateGWUse && (
        <div className="invalid-feedback d-block">
          {formik.errors.coefficientRentRateGWUse}
        </div>
      )}
      <div className="input-group-prepend input-text mb-2">
        Введіть ставку рентної плати за користування надрами (у %):
      </div>
      <input
        name={"rentRateSubsoilUse"}
        type="text"
        className="form-control mb-2"
        value={formik.values.rentRateSubsoilUse}
        onChange={formik.handleChange}
      />
      {formik.errors.rentRateSubsoilUse && (
        <div className="invalid-feedback d-block">
          {formik.errors.rentRateSubsoilUse}
        </div>
      )}
      <div className="table-responsive mt-3">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Назва витрат</th>
              <th scope="col">Одиниці виміру</th>
              <th scope="col">На прогноз</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={4} className="text-center">
                Умовно-постійні витрати
              </th>
            </tr>
            <tr>
              <th scope="row">1</th>
              <td>
                Основна зарплата з нарахувань персоналу, зайнятого у видобутку
                та водопостачанні
              </td>
              <td>тис.грн</td>
              <td>
                <input
                  name={"basicSalary"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.basicSalary}
                  onChange={formik.handleChange}
                />
                {formik.errors.basicSalary && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.basicSalary}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                Амортизація основних засобів та витрат на облаштування родовища
              </td>
              <td>тис.грн</td>
              <td>{fixedAssetsAndExpensesDepreciation}</td>
            </tr>
            <tr>
              <th scope="row"></th>
              <th>Всього умовно-постійних</th>
              <th>тис.грн</th>
              <th>{conditionalFixedCosts}</th>
            </tr>
            <tr>
              <th colSpan={4} className="text-center">
                Змінні витрати
              </th>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Плата за електроенергію</td>
              <td>тис.грн</td>
              <td>
                <input
                  name={"electricityCosts"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.electricityCosts}
                  onChange={formik.handleChange}
                />
                {formik.errors.electricityCosts && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.electricityCosts}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Матеріали та запчастини</td>
              <td>тис.грн</td>
              <td>
                <input
                  name={"materialsAndSpareParts"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.materialsAndSpareParts}
                  onChange={formik.handleChange}
                />
                {formik.errors.materialsAndSpareParts && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.materialsAndSpareParts}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Поточний ремонт</td>
              <td>тис.грн</td>
              <td>
                <input
                  name={"maintenance"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.maintenance}
                  onChange={formik.handleChange}
                />
                {formik.errors.maintenance && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.maintenance}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Лабораторні роботи</td>
              <td>тис.грн</td>
              <td>
                <input
                  name={"laboratoryWorks"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.laboratoryWorks}
                  onChange={formik.handleChange}
                />
                {formik.errors.laboratoryWorks && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.laboratoryWorks}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Інші витрати</td>
              <td>тис.грн</td>
              <td>
                <input
                  name={"otherExpenses"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.otherExpenses}
                  onChange={formik.handleChange}
                />
                {formik.errors.otherExpenses && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.otherExpenses}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Рентна плата за спецводокористування</td>
              <td>тис.грн</td>
              <td>{rentGWUse}</td>
            </tr>
            <tr>
              <th scope="row">9</th>
              <td>Рентна плата за надра</td>
              <td>тис.грн</td>
              <td>{rentSubsoilUse}</td>
            </tr>
            <tr>
              <th scope="row"></th>
              <th>Всього змінні витрати</th>
              <th>тис.грн</th>
              <th>{variableCosts}</th>
            </tr>
            <tr>
              <th scope="row"></th>
              <th>Разом експлуатаційні витрати</th>
              <th>тис.грн</th>
              <th>{operatingCosts}</th>
            </tr>
            <tr>
              <th scope="row"></th>
              <th>Річний обсяг видобутої води</th>
              <th>тис.грн</th>
              <th>{averageAnnualProjectedWaterProduction}</th>
            </tr>
            <tr>
              <th scope="row"></th>
              <th>Експлуатаційні витрати на 1 м³ видобутої води</th>
              <th>грн</th>
              <th>{operatingCostsPerOnePW}</th>
            </tr>
            <tr>
              <th scope="row"></th>
              <th>Річний обсяг використаної води</th>
              <th>тис.грн</th>
              <th>{averageAnnualProjectedWaterProductionWithLosses}</th>
            </tr>
            <tr>
              <th scope="row"></th>
              <th>Собівартість 1 м³ реалізованої води</th>
              <th>грн</th>
              <th>{costPerOneSW}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonGroup
        handleCancel={handleCancel}
        cancelIsDisabled={cancelIsDisabled}
        deleteIsDisabled={deleteIsDisabled}
        handleDataIsDisabled={handleDataIsDisabled}
        handleData={handleCalculating}
        handleDataBtnText={"Розрахувати"}
      />
      <DeleteModal handleDeleteData={handleDeleteData} />
    </div>
  );
};

export default CostPricePage;
