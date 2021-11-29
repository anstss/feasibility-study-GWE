import React from "react";
import ButtonGroup from "../../button-group/buttonGroup";

const DepreciationPage = () => {
  return (
    <div>
      <h2 className="fs-4 my-5">Капіталовкладення та амортизаційні витрати</h2>
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
                type="text"
                className="form-control"
                placeholder={"Введіть суму витрат"}
              />
            </td>
            <td>785</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Витрати на придбання геологічної інформації</td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder={"Введіть суму витрат"}
              />
            </td>
            <td>7527</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Витрати на детальну розвідку ділянок родовища підземних вод</td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder={"Введіть суму витрат"}
              />
            </td>
            <td>543</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>
              Витрати, пов’язані із державною експертизою і оцінкою
              експлуатаційних запасів підземних вод в ДКЗ України
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder={"Введіть суму витрат"}
              />
            </td>
            <td>4545</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DepreciationPage;
