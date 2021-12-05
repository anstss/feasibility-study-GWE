import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonGroup from "../../button-group/buttonGroup";
import DeleteModal from "../../delete-modal/deleteModal";
import { LOCAL_STORAGE_KEY_NET_DISCOUNTED_CASH_FLOW } from "../../../shared/constants";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { netDiscountedCashFlowSlice } from "../../../store/reducers/netDiscountedCashFlowSlice";
import { transformStringToNumberArray } from "../../../shared/helpers";
import INetDiscountedCashFlowItem from "../../../Types/INetDiscountedCashFlowItem";
import { useStore } from "react-redux";

const NetDiscountedCashFlowSchema = Yup.object().shape({
  discountRate: Yup.number().typeError("Введіть число"),
});

const NetDiscountedCashFlow = () => {
  const dispatch = useAppDispatch();
  const { clearNetDiscountedCashFlowData, setNetDiscountedCashFlowData } =
    netDiscountedCashFlowSlice.actions;

  const {
    discountRate,
    futureInvestmentsForYears,
    netDiscountedCashFlowByDiscountRate,
  } = useAppSelector((state) => state.netDiscountedCashFlowReducer);
  const { netProfit } = useAppSelector(
    (state) => state.staticPerformanceIndicatorsReducer
  );
  const { fixedAssetsCharges, investmentsCharges } = useAppSelector(
    (state) => state.depreciationChargesCalculationReducer
  );

  useEffect(() => {
    if (discountRate) {
      formik.values.discountRate = discountRate.toString();
    }
    if (futureInvestmentsForYears) {
      setFutureInvestments(
        futureInvestmentsForYears.toString().replaceAll(",", " ")
      );
    }
  }, [discountRate]);

  const formik = useFormik({
    initialValues: {
      discountRate: "",
    },
    validationSchema: NetDiscountedCashFlowSchema,
    onSubmit: (values) => {
      handleCalculatingNetDiscountedCashFlow();
    },
  });

  const [futureInvestments, setFutureInvestments] = useState<string | number[]>(
    ""
  );

  const handleChangeWaterFutureInvestments = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFutureInvestments(event.target.value);
  };

  const handleCalculatingNetDiscountedCashFlow = () => {
    const { discountRate } = formik.values;
    const futureInvestmentsForYears: number[] = transformStringToNumberArray(
      futureInvestments.toString()
    );
    const netDiscountedCashFlowByDiscountRate =
      calculateNetDiscountedCashFlowByDiscountRate(
        +discountRate,
        futureInvestmentsForYears
      );
    dispatch(
      setNetDiscountedCashFlowData({
        discountRate: +discountRate,
        futureInvestmentsForYears,
        netDiscountedCashFlowByDiscountRate,
      })
    );
    saveNetDiscountedCashFlowDataToLocalStorage();
  };

  const store = useStore();

  const saveNetDiscountedCashFlowDataToLocalStorage = () => {
    const data = store.getState().netDiscountedCashFlowReducer;
    localStorage.setItem(
      LOCAL_STORAGE_KEY_NET_DISCOUNTED_CASH_FLOW,
      JSON.stringify(data)
    );
  };

  const calculateNetDiscountedCashFlowByDiscountRate = (
    rate: number,
    futureInvestmentsForYears: number[]
  ): INetDiscountedCashFlowItem[] => {
    const data: INetDiscountedCashFlowItem[] = [];
    const depreciation = +(fixedAssetsCharges + investmentsCharges).toFixed(2);
    for (let i = 0; i < 25; i++) {
      const profit = +(netProfit + depreciation).toFixed(2);
      const investments = futureInvestmentsForYears[i]
        ? +futureInvestmentsForYears[i].toFixed(2)
        : 0;
      const cashFlow = +(profit - investments).toFixed(2);
      const discountCoefficient = +(1 / Math.pow(1 + rate / 100, i)).toFixed(2);
      const discountedCashFlow = +(cashFlow * discountCoefficient).toFixed(2);
      const discountedCapitalInvestment = +(
        investments * discountCoefficient
      ).toFixed(2);
      const discountedIncome = +(
        discountedCashFlow + discountedCapitalInvestment
      ).toFixed(2);
      let netDiscountedCashIncome = discountedCashFlow;
      if (i !== 0 && i <= 24) {
        netDiscountedCashIncome = +(
          data[i - 1].netDiscountedCashIncome + discountedCashFlow
        ).toFixed(2);
      }
      const item: INetDiscountedCashFlowItem = {
        year: i,
        netProfit,
        depreciation,
        profit,
        investments,
        cashFlow,
        discountCoefficient,
        discountedCashFlow,
        netDiscountedCashIncome,
        discountedIncome,
        discountedCapitalInvestment,
      };
      data.push(item);
    }
    return data;
  };

  const handleCancel = () => {
    formik.setValues({
      discountRate: "",
    });
    setFutureInvestments("");
  };

  const handleDeleteData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY_NET_DISCOUNTED_CASH_FLOW);
    dispatch(clearNetDiscountedCashFlowData());
    handleCancel();
  };

  const [cancelIsDisabled, setCancelIsDisabled] = useState<boolean>(true);
  const [handleDataIsDisabled, setHandleDataIsDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    if (formik.values.discountRate || futureInvestments) {
      setCancelIsDisabled(false);
    } else {
      setCancelIsDisabled(true);
    }
    if (formik.values.discountRate && futureInvestments) {
      setHandleDataIsDisabled(false);
    } else {
      setHandleDataIsDisabled(true);
    }
  }, [formik.values.discountRate, futureInvestments]);

  return (
    <div>
      <h2 className="fs-4 my-5">Чистий дисконтований грошовий потік</h2>
      <div className="input-group-prepend mb-2">
        Введіть ставку дисконтування (у %):
      </div>
      <input
        name={"discountRate"}
        type="text"
        className="form-control mb-2"
        value={formik.values.discountRate}
        onChange={formik.handleChange}
      />
      {formik.errors.discountRate && (
        <div className="invalid-feedback d-block">
          {formik.errors.discountRate}
        </div>
      )}
      <div className="input-group-prepend mb-2">
        Введіть майбутні капіталовкладення для 25 років (розділяючи пробілом),
        всі нечислові значення будуть проігноровані:
      </div>
      <input
        type="text"
        className="form-control mb-2"
        value={futureInvestments.toString()}
        onChange={handleChangeWaterFutureInvestments}
      />
      <ButtonGroup
        handleCancel={handleCancel}
        cancelIsDisabled={cancelIsDisabled}
        deleteIsDisabled={!discountRate || !futureInvestmentsForYears}
        handleDataIsDisabled={handleDataIsDisabled}
        handleData={handleCalculatingNetDiscountedCashFlow}
        handleDataBtnText={"Розрахувати"}
      />
      {netDiscountedCashFlowByDiscountRate.length !== 0 ? (
        <div className="table-responsive mb-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Рік</th>
                <th scope="col">Чистий прибуток</th>
                <th scope="col">Амортизація</th>
                <th scope="col">Дохід</th>
                <th scope="col">Інвестиції</th>
                <th scope="col">Грошовий потік</th>
                <th scope="col">Коефіцієнт дисконтування</th>
                <th scope="col">Дисконтований грошовий потік</th>
                <th scope="col">Чистий дисконтований грошовий прибуток</th>
                <th scope="col">Дисконтований дохід</th>
                <th scope="col">Дисконтовані капіталовкладення</th>
              </tr>
            </thead>
            <tbody>
              {netDiscountedCashFlowByDiscountRate.map((el) => {
                const {
                  year,
                  netProfit,
                  depreciation,
                  profit,
                  investments,
                  cashFlow,
                  discountCoefficient,
                  discountedCashFlow,
                  netDiscountedCashIncome,
                  discountedIncome,
                  discountedCapitalInvestment,
                } = el;
                return (
                  <tr>
                    <td>{year}</td>
                    <td>{netProfit}</td>
                    <td>{depreciation}</td>
                    <td>{profit}</td>
                    <td>{investments}</td>
                    <td>{cashFlow}</td>
                    <td>{discountCoefficient}</td>
                    <td>{discountedCashFlow}</td>
                    <td>{netDiscountedCashIncome}</td>
                    <td>{discountedIncome}</td>
                    <td>{discountedCapitalInvestment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
      <DeleteModal handleDeleteData={handleDeleteData} />
    </div>
  );
};

export default NetDiscountedCashFlow;
