import React, { useEffect, useState } from "react";
import ButtonGroup from "../../button-group/buttonGroup";
import { useFormik } from "formik";
import * as Yup from "yup";
import IExpenses from "../../../Types/IExpenses";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { depreciationChargesCalculationSlice } from "../../../store/reducers/depreciationChargesCalculationSlice";
import { useStore } from "react-redux";
import { LOCAL_STORAGE_KEY_DEPRECIATION } from "../../../shared/constants";

const DepreciationExpensesSchema = Yup.object().shape({
  depreciationPercent: Yup.number().typeError("Введіть число"),
  specialPermission: Yup.number().typeError("Введіть число"),
  geologicalInformation: Yup.number().typeError("Введіть число"),
  fieldsExploration: Yup.number().typeError("Введіть число"),
  stateExamination: Yup.number().typeError("Введіть число"),
});

const expensesInitialState: IExpenses = {
  specialPermission: "",
  geologicalInformation: "",
  fieldsExploration: "",
  stateExamination: "",
};

const DepreciationPage = () => {
  const [expenses, setExpenses] = useState<IExpenses>(expensesInitialState);
  const { expensesAmount, depreciationCharges } = useAppSelector(
    (state) => state.depreciationChargesCalculationReducer
  );
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

  const dispatch = useAppDispatch();
  const { setDepreciationPercent, setExpensesAmount, setDepreciationCharges } =
    depreciationChargesCalculationSlice.actions;

  const formik = useFormik({
    initialValues: {
      depreciationPercent: "",
      ...expenses,
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
    } = formik.values;
    let specialPermissionDepreciationCharges = 0;
    let geologicalInformationDepreciationCharges = 0;
    let fieldsExplorationDepreciationCharges = 0;
    let stateExaminationDepreciationCharges = 0;
    if (!depreciationPercent) return;
    if (specialPermission) {
      specialPermissionDepreciationCharges =
        (specialPermission / 100) * +depreciationPercent;
    }
    if (geologicalInformation) {
      geologicalInformationDepreciationCharges =
        (geologicalInformation / 100) * +depreciationPercent;
    }
    if (fieldsExploration) {
      fieldsExplorationDepreciationCharges =
        (fieldsExploration / 100) * +depreciationPercent;
    }
    if (stateExamination) {
      stateExaminationDepreciationCharges =
        (stateExamination / 100) * +depreciationPercent;
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
    dispatch(setDepreciationPercent(+depreciationPercent));
    dispatch(setExpensesAmount(expensesAmount));
    dispatch(setDepreciationCharges(depreciationCharges));
    saveDepreciationDataToLocalStorage();
  };

  const store = useStore();

  const saveDepreciationDataToLocalStorage = () => {
    const data = store.getState().depreciationChargesCalculationReducer;
    localStorage.setItem(LOCAL_STORAGE_KEY_DEPRECIATION, JSON.stringify(data));
  };

  const handleCancel = () => {
    setExpenses(expensesInitialState);
    formik.resetForm();
  };

  const [cancelIsDisabled, setCancelIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const {
      specialPermission,
      geologicalInformation,
      fieldsExploration,
      stateExamination,
    } = formik.values;
    if (
      specialPermission ||
      geologicalInformation ||
      fieldsExploration ||
      stateExamination
    ) {
      setCancelIsDisabled(false);
    } else {
      setCancelIsDisabled(true);
    }
  }, [formik.values]);

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
