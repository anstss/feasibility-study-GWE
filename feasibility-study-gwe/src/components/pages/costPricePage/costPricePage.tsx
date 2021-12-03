import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonGroup from "../../button-group/buttonGroup";

const CostPricePageSchema = Yup.object().shape({
  costPrice: Yup.number()
    .typeError("Введіть число")
    .required("Заповніть це поле"),
  rentRateGWUse: Yup.number()
    .typeError("Введіть число")
    .required("Заповніть це поле"),
  coefficientRentRateGWUse: Yup.number()
    .typeError("Введіть число")
    .required("Заповніть це поле"),
  rentRateSubsoilUse: Yup.number()
    .typeError("Введіть число")
    .required("Заповніть це поле"),
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

  const [cancelIsDisabled, setCancelIsDisabled] = useState<boolean>(true);
  const [handleDataIsDisabled, setHandleDataIsDisabled] =
    useState<boolean>(true);

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

  const handleCalculating = () => {
    console.log("test");
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
        Введіть ставку рентної плати за спеціальне використання підземних вод:
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
        Введіть ставку рентної плати за користування надрами:
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
        deleteIsDisabled={false}
        handleDataIsDisabled={handleDataIsDisabled}
        handleData={handleCalculating}
        handleDataBtnText={"Розрахувати"}
      />
    </div>
  );
};

export default CostPricePage;
