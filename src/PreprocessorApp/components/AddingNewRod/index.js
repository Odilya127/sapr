import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { INITIAL_STATE } from "./constants";

const AddingNewRod = ({ setRodsData }) => {
  const [rodData, setRodData] = useState(INITIAL_STATE);
  const [validated, setValidated] = useState(false);

  const handleSaveRodData = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      event.stopPropagation();
      setRodsData((prevState) => [...prevState, rodData]);
      setRodData(INITIAL_STATE);
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
              required
              type="number"
              placeholder="Введите число"
              value={rodData.rodLength}
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
              required
              type="number"
              placeholder="Введите число"
              value={rodData.crossSectionalArea}
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
              required
              value={rodData.elasticModulus}
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
              required
              value={rodData.allowableVoltage}
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
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="linear-load">
            <Form.Label> Погонная нагрузка (Q)</Form.Label>
            <Form.Control
              type="number"
              required
              placeholder="Введите погонное напряжение"
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
          </Form.Group>
        </Row>
        <div className="d-flex mt-4 justify-content-between">
          <Button
            className="btn btn-danger"
            onClick={(event) => handleDeleteRodData(event)}
          >
            Очистить
          </Button>
          <Button type="submit" className="btn btn-success">
            Добавить
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddingNewRod;
