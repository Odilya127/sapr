import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { INITIAL_STATE } from "./constants";

const AddingNewRod = ({ offsetRodsData }) => {
  const [rodData, setRodData] = useState(INITIAL_STATE);
  const [validated, setValidated] = useState(false);
  const [disabledAddNewRog, setDisabledAddNewRog] = useState(false);

  const { rodsData, setRodsData } = offsetRodsData;

  const validateEnterValues = (event) => {
    if (
      rodData.rodLength != null &&
      rodData.rodLength > 0 &&
      rodData.crossSectionalArea != null &&
      rodData.elasticModulus != null &&
      rodData.allowableVoltage != null &&
      rodData.concentratedLoad != null &&
      rodData.linearLoad != null &&
      (rodsData.length === 0 || rodsData[rodsData.length - 1].rodLength > 0)
    ) {
      setRodsData((prevState) => [
        ...prevState,
        {
          ...rodData,
          rodLength: rodData.rodLength,
          crossSectionalArea: rodData.crossSectionalArea,
          elasticModulus: rodData.elasticModulus,
          allowableVoltage: rodData.allowableVoltage,
          concentratedLoad:
            rodData.concentratedLoad != null ? rodData.concentratedLoad : 0,
          linearLoad: rodData.linearLoad != null ? rodData.linearLoad : 0,
        },
      ]);
      setRodData(INITIAL_STATE);
      alert("Стержень успешно добавлен");
    } else if (
      rodData.concentratedLoad != null &&
      rodData.rodLength == null &&
      rodData.crossSectionalArea == null &&
      rodData.elasticModulus == null &&
      rodData.allowableVoltage == null &&
      rodData.linearLoad == null &&
      rodsData.length > 0 &&
      rodsData[rodsData.length - 1].rodLength > 0
    ) {
      setRodsData((prevState) => [
        ...prevState,
        {
          ...rodData,
          rodLength: rodData.rodLength,
          crossSectionalArea: rodData.crossSectionalArea,
          elasticModulus: rodData.elasticModulus,
          allowableVoltage: rodData.allowableVoltage,
          concentratedLoad:
            rodData.concentratedLoad != null ? rodData.concentratedLoad : 0,
          linearLoad: rodData.linearLoad != null ? rodData.linearLoad : 0,
        },
      ]);
      setDisabledAddNewRog(true);
      setRodData(INITIAL_STATE);
      alert("Последний стержень успешно добавлен");
    } else {
      event.preventDefault();
      alert("Неправильно введены обязательные поля");
    }
  };

  const handleSaveRodData = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.stopPropagation();
      validateEnterValues(event);
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const handleDeleteRodData = (event) => {
    event.preventDefault();
    setRodData(INITIAL_STATE);
  };

  return (
    <div className="preprocessorApp__block">
      <h4>Добавление нового стрежня</h4>
      <Form noValidate validated={validated} onSubmit={handleSaveRodData}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="rod-length">
            <Form.Label>Длина стержня (L)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите число"
              value={rodData.rodLength != null ? rodData.rodLength : ""}
              aria-describedby="rod-lenght"
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    rodLength: event.target.value,
                  };
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="cross-sectional-area">
            <Form.Label>Площадь поперечного сечения (A)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите число"
              value={
                rodData.crossSectionalArea != null
                  ? rodData.crossSectionalArea
                  : ""
              }
              aria-describedby="cross-sectional-area"
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    crossSectionalArea: event.target.value,
                  };
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="elastic-modulus">
            <Form.Label>Модуль упругости (E)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите число"
              value={
                rodData.elasticModulus != null ? rodData.elasticModulus : ""
              }
              aria-describedby="elastic-modulus"
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    elasticModulus: event.target.value,
                  };
                })
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="allowable-voltage">
            <Form.Label>Допускаемое напряжение (Б)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите число"
              aria-describedby="allowable-voltage"
              value={
                rodData.allowableVoltage != null ? rodData.allowableVoltage : ""
              }
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    allowableVoltage: event.target.value,
                  };
                })
              }
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="concentrated-load">
            <Form.Label>Сосредоточенная нагрузка (F)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Номер узла равен номеру стержня"
              value={
                rodData.concentratedLoad != null ? rodData.concentratedLoad : ""
              }
              onChange={(event) =>
                setRodData((prevState) => {
                  return {
                    ...prevState,
                    concentratedLoad: event.target.value,
                  };
                })
              }
              aria-describedby="concentrated-load"
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="linear-load">
            <Form.Label> Погонная нагрузка (Q)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Введите погонное напряжение"
              value={rodData.linearLoad != null ? rodData.linearLoad : ""}
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
          </Form.Group>
        </Row>
        <div className="d-flex mt-4 justify-content-between">
          <Button
            className="btn btn-danger"
            onClick={(event) => handleDeleteRodData(event)}
          >
            Очистить
          </Button>
          <Button
            type="submit"
            className="btn btn-success"
            disabled={disabledAddNewRog}
          >
            Добавить
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddingNewRod;
