import React, { useEffect, useState } from "react";
import ButtonGroup from "../../button-group/buttonGroup";
import { useFormik } from "formik";
import * as Yup from "yup";
import IExpenses from "../../../Types/IExpenses";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { depreciationChargesCalculationSlice } from "../../../store/reducers/depreciationChargesCalculationSlice";
import { useStore } from "react-redux";
import { LOCAL_STORAGE_KEY_DEPRECIATION } from "../../../shared/constants";
import IDepreciationCharges from "../../../Types/IDepreciationCharges";

const DepreciationExpensesSchema = Yup.object().shape({
  depreciationPercent: Yup.number().typeError("Введіть число"),
  specialPermission: Yup.number().typeError("Введіть число"),
  geologicalInformation: Yup.number().typeError("Введіть число"),
  fieldsExploration: Yup.number().typeError("Введіть число"),
  stateExamination: Yup.number().typeError("Введіть число"),
  fixedAssets: Yup.number().typeError("Введіть число"),
});

const expensesInitialState: IExpenses = {
  specialPermission: "",
  geologicalInformation: "",
  fieldsExploration: "",
  stateExamination: "",
};

const DepreciationPage = () => {
  const [expenses, setExpenses] = useState<IExpenses>(expensesInitialState);
  const {
    depreciationPercent,
    expensesAmount,
    depreciationCharges,
    fixedAssets,
    fixedAssetsCharges,
  } = useAppSelector((state) => state.depreciationChargesCalculationReducer);
  const {
    specialPermission,
    geologicalInformation,
    fieldsExploration,
    stateExamination,
  } = expensesAmount;
  const {
    specialPermissionDepreciationCharges,
    geologicalInformationDepreciationCharges,
    fieldsExplorationDepreciationCharges,
    stateExaminationDepreciationCharges,
  } = depreciationCharges;

  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalDepreciationCharges, setTotalDepreciationCharges] =
    useState<number>(0);
  const [totalExpensesWithFixedAssets, setTotalExpensesWithFixedAssets] =
    useState<number>(0);
  const [
    totalDepreciationChargesWithFixedAssets,
    setTotalDepreciationChargesWithFixedAssets,
  ] = useState<number>(0);

  useEffect(() => {
    if (depreciationPercent) {
      formik.values.depreciationPercent = depreciationPercent.toString();
    }
    if (specialPermission) {
      formik.values.specialPermission = specialPermission;
    }
    if (geologicalInformation) {
      formik.values.geologicalInformation = geologicalInformation;
    }
    if (fieldsExploration) {
      formik.values.fieldsExploration = fieldsExploration;
    }
    if (stateExamination) {
      formik.values.stateExamination = stateExamination;
    }
    if (fixedAssets) {
      formik.values.fixedAssets = fixedAssets.toString();
    }
  }, [
    depreciationPercent,
    specialPermission,
    geologicalInformation,
    fieldsExploration,
    stateExamination,
    fixedAssets,
  ]);

  const dispatch = useAppDispatch();
  const {
    setDepreciationPercent,
    setExpensesAmount,
    setDepreciationCharges,
    setFixedAssetsAndCharges,
  } = depreciationChargesCalculationSlice.actions;

  const formik = useFormik({
    initialValues: {
      depreciationPercent: "",
      ...expenses,
      fixedAssets: "",
    },
    validationSchema: DepreciationExpensesSchema,
    onSubmit: (values) => {
      handleCalculating();
    },
  });

  const handleCalculating = () => {
    const {
      depreciationPercent,
      specialPermission,
      geologicalInformation,
      fieldsExploration,
      stateExamination,
      fixedAssets,
    } = formik.values;
    let specialPermissionDepreciationCharges = 0;
    let geologicalInformationDepreciationCharges = 0;
    let fieldsExplorationDepreciationCharges = 0;
    let stateExaminationDepreciationCharges = 0;
    if (!depreciationPercent) return;
    if (specialPermission) {
      specialPermissionDepreciationCharges = +(
        (specialPermission / 100) *
        +depreciationPercent
      ).toFixed(2);
    }
    if (geologicalInformation) {
      geologicalInformationDepreciationCharges = +(
        (geologicalInformation / 100) *
        +depreciationPercent
      ).toFixed(2);
    }
    if (fieldsExploration) {
      fieldsExplorationDepreciationCharges = +(
        (fieldsExploration / 100) *
        +depreciationPercent
      ).toFixed(2);
    }
    if (stateExamination) {
      stateExaminationDepreciationCharges = +(
        (stateExamination / 100) *
        +depreciationPercent
      ).toFixed(2);
    }
    const expensesAmount = {
      specialPermission,
      geologicalInformation,
      fieldsExploration,
      stateExamination,
    };
    const depreciationCharges = {
      specialPermissionDepreciationCharges,
      geologicalInformationDepreciationCharges,
      fieldsExplorationDepreciationCharges,
      stateExaminationDepreciationCharges,
    };
    let fixedAssetsCharges = 0;
    if (fixedAssets) {
      fixedAssetsCharges = +(
        (+fixedAssets / 100) *
        +depreciationPercent
      ).toFixed(2);
    }
    dispatch(setDepreciationPercent(+(+depreciationPercent).toFixed(2)));
    dispatch(setExpensesAmount(expensesAmount));
    dispatch(setDepreciationCharges(depreciationCharges));
    dispatch(
      setFixedAssetsAndCharges({
        fixedAssets: +fixedAssets,
        fixedAssetsCharges,
      })
    );
    saveDepreciationDataToLocalStorage();
  };

  const store = useStore();

  const saveDepreciationDataToLocalStorage = () => {
    const data = store.getState().depreciationChargesCalculationReducer;
    localStorage.setItem(LOCAL_STORAGE_KEY_DEPRECIATION, JSON.stringify(data));
  };

  const handleCancel = () => {
    formik.setValues({
      depreciationPercent: "",
      ...expensesInitialState,
      fixedAssets: "",
    });
  };

  const [cancelIsDisabled, setCancelIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const {
      depreciationPercent,
      specialPermission,
      geologicalInformation,
      fieldsExploration,
      stateExamination,
    } = formik.values;
    if (
      depreciationPercent ||
      specialPermission ||
      geologicalInformation ||
      fieldsExploration ||
      stateExamination
    ) {
      setCancelIsDisabled(false);
    } else {
      setCancelIsDisabled(true);
    }
    const totalExpensesKeys = Object.keys(formik.values).filter(
      (key) => key !== "depreciationPercent" && key !== "fixedAssets"
    );
    let totalExpenses = 0;
    totalExpensesKeys.forEach((key) => {
      totalExpenses += +formik.values[key as keyof IExpenses];
    });
    setTotalExpenses(totalExpenses);
    const totalDepreciationChargesKeys = Object.keys(depreciationCharges);
    let totalDepreciationCharges = 0;
    totalDepreciationChargesKeys.forEach((key) => {
      totalDepreciationCharges +=
        depreciationCharges[key as keyof IDepreciationCharges];
    });
    setTotalDepreciationCharges(totalDepreciationCharges);
    setTotalExpensesWithFixedAssets(+(fixedAssets + totalExpenses).toFixed(2));
    setTotalDepreciationChargesWithFixedAssets(
      +(fixedAssetsCharges + totalDepreciationCharges).toFixed(2)
    );
  }, [
    formik.values.depreciationPercent,
    formik.values.specialPermission,
    formik.values.geologicalInformation,
    formik.values.fieldsExploration,
    formik.values.stateExamination,
    formik.values.fixedAssets,
  ]);

  return (
    <div>
      <h2 className="fs-4 my-5">Капіталовкладення та амортизаційні витрати</h2>
      <div className="input-group-prepend input-text mb-2">
        Введіть нарахування амортизації зазначених активів (% річних від їх
        початкової вартості), на термін прогнозу, який становить 25 років:
      </div>
      <input
        name={"depreciationPercent"}
        type="text"
        className="form-control mb-2"
        value={formik.values.depreciationPercent}
        onChange={formik.handleChange}
      />
      {formik.errors.depreciationPercent && (
        <div className="invalid-feedback d-block">
          {formik.errors.depreciationPercent}
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Назва витрат</th>
              <th scope="col">
                Сума витрат, яка підлягає амортизації (тис.грн.)
              </th>
              <th scope="col">Амортизаційні відрахування (тис.грн.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                Плата за спецдозвіл на користування надрами з метою видобування
              </td>
              <td>
                <input
                  name={"specialPermission"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.specialPermission}
                  onChange={formik.handleChange}
                />
                {formik.errors.specialPermission && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.specialPermission}
                  </div>
                )}
              </td>
              <td>{specialPermissionDepreciationCharges}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Витрати на придбання геологічної інформації</td>
              <td>
                <input
                  name={"geologicalInformation"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.geologicalInformation}
                  onChange={formik.handleChange}
                />
                {formik.errors.geologicalInformation && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.geologicalInformation}
                  </div>
                )}
              </td>
              <td>{geologicalInformationDepreciationCharges}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>
                Витрати на детальну розвідку ділянок родовища підземних вод
              </td>
              <td>
                <input
                  name={"fieldsExploration"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.fieldsExploration}
                  onChange={formik.handleChange}
                />
                {formik.errors.fieldsExploration && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.fieldsExploration}
                  </div>
                )}
              </td>
              <td>{fieldsExplorationDepreciationCharges}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>
                Витрати, пов’язані із державною експертизою і оцінкою
                експлуатаційних запасів підземних вод в ДКЗ України
              </td>
              <td>
                <input
                  name={"stateExamination"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.stateExamination}
                  onChange={formik.handleChange}
                />
                {formik.errors.stateExamination && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.stateExamination}
                  </div>
                )}
              </td>
              <td>{stateExaminationDepreciationCharges}</td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>Всього (нематеріальні активи):</td>
              <td>{totalExpenses}</td>
              <td>{totalDepreciationCharges}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Основні засоби:</td>
              <td>
                <input
                  name={"fixedAssets"}
                  type="text"
                  className="form-control"
                  placeholder={"Введіть суму витрат"}
                  value={formik.values.fixedAssets}
                  onChange={formik.handleChange}
                />
                {formik.errors.fixedAssets && (
                  <div className="invalid-feedback d-block">
                    {formik.errors.fixedAssets}
                  </div>
                )}
              </td>
              <td>{fixedAssetsCharges}</td>
            </tr>
            <tr>
              <th scope="row"></th>
              <td>Разом:</td>
              <td>{totalExpensesWithFixedAssets}</td>
              <td>{totalDepreciationChargesWithFixedAssets}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonGroup
        handleCancel={handleCancel}
        cancelIsDisabled={cancelIsDisabled}
        deleteIsDisabled={false}
        handleDataIsDisabled={false}
        handleData={handleCalculating}
        handleDataBtnText={"Розрахувати"}
      />
    </div>
  );
};

export default DepreciationPage;
