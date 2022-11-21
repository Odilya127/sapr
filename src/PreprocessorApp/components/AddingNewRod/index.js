import { useState } from "react";

import { INITIAL_STATE } from "./constants";
import { logDOM } from "@testing-library/react";

const AddingNewRod = ({ setRodsData }) => {
  const [rodData, setRodData] = useState(INITIAL_STATE);

  const handleSaveRodData = () => {
    setRodsData((prevState) => [...prevState, rodData]);
    setRodData(INITIAL_STATE);
  };

  return (
    <div className="preprocessorApp__block">
      <h4>Добавление нового стрежня</h4>
      <div className="row mt-3">
        <div className="col">
          <label htmlFor="rod-length" className="form-label">
            Длина стержня (L)
          </label>
          <input
            type="number"
            required
            placeholder="Введите число"
            className="form-control"
            id="rod-length"
            value={rodData.rodLength}
            onChange={(event) =>
              setRodData((prevState) => {
                return {
                  ...prevState,
                  rodLength: event.target.value,
                };
              })
            }
            aria-describedby="rod-length"
          />
        </div>
        <div className="col">
          <label htmlFor="cross-sectional-area" className="form-label">
            Площадь поперечного сечения (A)
          </label>
          <input
            type="number"
            placeholder="Введите число"
            className="form-control"
            id="cross-sectional-area"
            value={rodData.crossSectionalArea}
            onChange={(event) =>
              setRodData((prevState) => {
                return {
                  ...prevState,
                  crossSectionalArea: event.target.value,
                };
              })
            }
            aria-describedby="cross-sectional-area"
          />
        </div>
        <div className="col">
          <label htmlFor="elastic-modulus" className="form-label">
            Модуль упругости (E)
          </label>
          <input
            type="number"
            placeholder="Введите число"
            className="form-control"
            id="elastic-modulus"
            value={rodData.elasticModulus}
            onChange={(event) =>
              setRodData((prevState) => {
                return {
                  ...prevState,
                  elasticModulus: event.target.value,
                };
              })
            }
            aria-describedby="elastic-modulus"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col">
          <label htmlFor="allowable-voltage" className="form-label">
            Допускаемое напряжение (Б)
          </label>
          <input
            type="number"
            placeholder="Введите число"
            className="form-control"
            id="allowable-voltage"
            value={rodData.allowableVoltage}
            onChange={(event) =>
              setRodData((prevState) => {
                return {
                  ...prevState,
                  allowableVoltage: event.target.value,
                };
              })
            }
            aria-describedby="allowable-voltage"
          />
        </div>
        <div className="col">
          <label htmlFor="concentrated-load" className="form-label">
            Сосредоточенная нагрузка (F)
          </label>
          <input
            type="number"
            placeholder="Номер узла равен номеру стержня"
            className="form-control"
            id="concentrated-load"
            value={rodData.concentratedLoad}
            onChange={(event) =>
              setRodData((prevState) => {
                return {
                  ...prevState,
                  concentratedLoad: event.target.value,
                };
              })
            }
            aria-describedby="concentrated-load"
          />
        </div>
        <div className="col">
          <label htmlFor="linear-load" className="form-label">
            Погонная нагрузка (Q)
          </label>
          <input
            type="number"
            placeholder="Введите погонное напряжение"
            className="form-control"
            id="linear-load"
            value={rodData.linearLoad}
            onChange={(event) =>
              setRodData((prevState) => {
                return {
                  ...prevState,
                  linearLoad: event.target.value,
                };
              })
            }
            aria-describedby="linear-load"
          />
        </div>
      </div>
      <div className="d-flex mt-4 justify-content-between">
        <button
          className="btn btn-danger"
          onClick={() => setRodData(INITIAL_STATE)}
        >
          Очистить
        </button>
        <button className="btn btn-success" onClick={handleSaveRodData}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddingNewRod;
