import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonGroup from "../../button-group/buttonGroup";
import {
  LOCAL_STORAGE_KEY_COST_PRICE,
  LOCAL_STORAGE_KEY_DEPRECIATION,
} from "../../../shared/constants";
import { useStore } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { costPriceSlice } from "../../../store/reducers/costPriceSlice";
import DeleteModal from "../../delete-modal/deleteModal";

const CostPricePageSchema = Yup.object().shape({
  costPrice: Yup.number().typeError("Введіть число"),
  rentRateGWUse: Yup.number().typeError("Введіть число"),
  coefficientRentRateGWUse: Yup.number().typeError("Введіть число"),
  rentRateSubsoilUse: Yup.number().typeError("Введіть число"),
});

const CostPricePage = () => {
  const formik = useFormik({
    initialValues: {
      costPrice: "",
      rentRateGWUse: "",
      coefficientRentRateGWUse: "",
      rentRateSubsoilUse: "",
    },
    validationSchema: CostPricePageSchema,
    onSubmit: (values) => {
      handleCalculating();
    },
  });

  const handleCancel = () => {
    formik.setValues({
      costPrice: "",
      rentRateGWUse: "",
      coefficientRentRateGWUse: "",
      rentRateSubsoilUse: "",
    });
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
  } = useAppSelector((state) => state.costPriceReducer);

  const { setCostPriceData, clearCostPriceData } = costPriceSlice.actions;

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
  }, [costPrice, rentRateGWUse, coefficientRentRateGWUse, rentRateSubsoilUse]);

  useEffect(() => {
    const {
      costPrice,
      rentRateGWUse,
      rentRateSubsoilUse,
      coefficientRentRateGWUse,
    } = formik.values;
    if (
      costPrice ||
      rentRateGWUse ||
      rentRateSubsoilUse ||
      coefficientRentRateGWUse
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
  ]);

  useEffect(() => {
    if (
      costPrice ||
      rentRateGWUse ||
      coefficientRentRateGWUse ||
      rentRateGWUse
    ) {
      setDeleteIsDisabled(false);
    } else {
      setDeleteIsDisabled(true);
    }
  }, [costPrice, rentRateGWUse, coefficientRentRateGWUse, rentRateSubsoilUse]);

  const handleCalculating = () => {
    const {
      costPrice,
      rentRateGWUse,
      rentRateSubsoilUse,
      coefficientRentRateGWUse,
    } = formik.values;
    dispatch(
      setCostPriceData({
        costPrice: +costPrice,
        rentRateGWUse: +rentRateGWUse,
        rentRateSubsoilUse: +rentRateSubsoilUse,
        coefficientRentRateGWUse: +coefficientRentRateGWUse,
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
    formik.setValues({
      costPrice: "",
      rentRateGWUse: "",
      coefficientRentRateGWUse: "",
      rentRateSubsoilUse: "",
    });
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
