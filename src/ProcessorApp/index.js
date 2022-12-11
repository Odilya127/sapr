import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "./styles.scss";
import { getConstructionsFromLocalStorage } from "./utils";

const ProcessorApp = () => {
  const [constructions, setConstructions] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => setConstructions(getConstructionsFromLocalStorage()), []);

  const handleDeleteConstruction = (constructionName) => {
    setConstructions(
      constructions.filter(({ name }) => name !== constructionName)
    );
    localStorage.removeItem(constructionName);
  };

  return (
    <>
      <Modal
        size="lg"
        show={isShowModal}
        onHide={() => setIsShowModal(false)}
        aria-labelledby="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="modal">
            Рассчитанные значения для конструкции
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Работа в процессе...</Modal.Body>
      </Modal>

      <div className="preprocessorApp">
        <h2 className="processorApp__title">Процессор</h2>
        <div className="preprocessorApp__block">
          <Table className=" bg-white">
            <thead>
              <tr>
                <th>№</th>
                <th>Название</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {constructions.map(({ name }, index) => (
                <tr>
                  <td>{++index}</td>
                  <td>{name.replace("construction.", "")}</td>
                  <td className="text-end">
                    <Button onClick={() => setIsShowModal(true)}>
                      Рассчитать
                    </Button>
                  </td>
                  <td className="text-end">
                    <Button onClick={() => handleDeleteConstruction(name)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ProcessorApp;
