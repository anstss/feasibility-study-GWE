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
import INetDiscountedCashFlowStatisticItem from "../../../Types/INetDiscountedCashFlowStatisticItem";

const NetDiscountedCashFlowSchema = Yup.object().shape({
  discountRate: Yup.number().typeError("Введіть число"),
});

const NetDiscountedCashFlow = () => {
  const dispatch = useAppDispatch();
  const {
    clearNetDiscountedCashFlowData,
    setNetDiscountedCashFlowData,
    setNetDiscountedCashFlowStatistic,
    setNetDiscountedCashFlowAdditionalStatistic,
  } = netDiscountedCashFlowSlice.actions;

  const {
    discountRate,
    futureInvestmentsForYears,
    netDiscountedCashFlowByDiscountRate,
    netDiscountedCashFlowStatistic,
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
    const netDiscountedCashFlowByDiscountRateStatistic =
      createNetDiscountedCashFlowStatistic(
        +discountRate,
        netDiscountedCashFlowByDiscountRate
      );
    const additionalNetDiscountedCashFlowStatistic: INetDiscountedCashFlowStatisticItem[] =
      getAdditionalNetDiscountedCashFlowStatistic();
    dispatch(
      setNetDiscountedCashFlowStatistic(
        netDiscountedCashFlowByDiscountRateStatistic
      )
    );
    dispatch(
      setNetDiscountedCashFlowAdditionalStatistic(
        additionalNetDiscountedCashFlowStatistic
      )
    );
    dispatch(
      setNetDiscountedCashFlowData({
        discountRate: +discountRate,
        futureInvestmentsForYears,
        netDiscountedCashFlowByDiscountRate,
        netDiscountedCashFlowStatistic:
          netDiscountedCashFlowByDiscountRateStatistic,
        netDiscountedCashFlowAdditionalStatistic:
          additionalNetDiscountedCashFlowStatistic,
      })
    );
    saveNetDiscountedCashFlowDataToLocalStorage();
  };

  const getAdditionalNetDiscountedCashFlowStatistic =
    (): INetDiscountedCashFlowStatisticItem[] => {
      const netDiscountedCashFlowZeroRate =
        calculateNetDiscountedCashFlowByDiscountRate(
          0,
          futureInvestmentsForYears
        );
      const netDiscountedCashFlowZeroRateStatistic =
        createNetDiscountedCashFlowStatistic(0, netDiscountedCashFlowZeroRate);
      const netDiscountedCashFlowQuarterRate =
        calculateNetDiscountedCashFlowByDiscountRate(
          25,
          futureInvestmentsForYears
        );
      const netDiscountedCashFlowQuarterStatistic =
        createNetDiscountedCashFlowStatistic(
          25,
          netDiscountedCashFlowQuarterRate
        );
      const netDiscountedCashFlowHalfRate =
        calculateNetDiscountedCashFlowByDiscountRate(
          50,
          futureInvestmentsForYears
        );
      const netDiscountedCashFlowHalfStatistic =
        createNetDiscountedCashFlowStatistic(50, netDiscountedCashFlowHalfRate);
      const netDiscountedCashFlowThreeQuartersRate =
        calculateNetDiscountedCashFlowByDiscountRate(
          75,
          futureInvestmentsForYears
        );
      const netDiscountedCashFlowThreeQuartersStatistic =
        createNetDiscountedCashFlowStatistic(
          75,
          netDiscountedCashFlowThreeQuartersRate
        );
      const netDiscountedCashFlowFullRate =
        calculateNetDiscountedCashFlowByDiscountRate(
          100,
          futureInvestmentsForYears
        );
      const netDiscountedCashFlowFullStatistic =
        createNetDiscountedCashFlowStatistic(
          100,
          netDiscountedCashFlowFullRate
        );
      return [
        netDiscountedCashFlowZeroRateStatistic,
        netDiscountedCashFlowQuarterStatistic,
        netDiscountedCashFlowHalfStatistic,
        netDiscountedCashFlowThreeQuartersStatistic,
        netDiscountedCashFlowFullStatistic,
      ];
    };

  const createNetDiscountedCashFlowStatistic = (
    rate: number,
    data: INetDiscountedCashFlowItem[]
  ): INetDiscountedCashFlowStatisticItem => {
    const statistic: INetDiscountedCashFlowItem = data.reduce(
      (
        prev: INetDiscountedCashFlowItem,
        current: INetDiscountedCashFlowItem
      ): INetDiscountedCashFlowItem => {
        return {
          year: 0,
          netProfit: +(prev.netProfit + current.netProfit).toFixed(2),
          depreciation: +(prev.depreciation + current.depreciation).toFixed(2),
          profit: +(prev.profit + current.profit).toFixed(2),
          investments: +(prev.investments + current.investments).toFixed(2),
          cashFlow: +(prev.cashFlow + current.cashFlow).toFixed(2),
          discountCoefficient: 0,
          discountedCashFlow: +(
            prev.discountedCashFlow + current.discountedCashFlow
          ).toFixed(2),
          netDiscountedCashIncome: 0,
          discountedIncome: +(
            prev.discountedIncome + current.discountedIncome
          ).toFixed(2),
          discountedCapitalInvestment: +(
            prev.discountedCapitalInvestment +
            current.discountedCapitalInvestment
          ).toFixed(2),
        };
      }
    );
    return {
      rate,
      statistic,
    };
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
              {netDiscountedCashFlowStatistic ? (
                <tr>
                  <th>Разом</th>
                  <th>{netDiscountedCashFlowStatistic.statistic.netProfit}</th>
                  <th>
                    {netDiscountedCashFlowStatistic.statistic.depreciation}
                  </th>
                  <th>{netDiscountedCashFlowStatistic.statistic.profit}</th>
                  <th>
                    {netDiscountedCashFlowStatistic.statistic.investments}
                  </th>
                  <th>{netDiscountedCashFlowStatistic.statistic.cashFlow}</th>
                  <th></th>
                  <th>
                    {
                      netDiscountedCashFlowStatistic.statistic
                        .discountedCashFlow
                    }
                  </th>
                  <th></th>
                  <th>
                    {netDiscountedCashFlowStatistic.statistic.discountedIncome}
                  </th>
                  <th>
                    {
                      netDiscountedCashFlowStatistic.statistic
                        .discountedCapitalInvestment
                    }
                  </th>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      ) : null}
      <DeleteModal handleDeleteData={handleDeleteData} />
    </div>
  );
};

export default NetDiscountedCashFlow;
