import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "./styles.scss";
import {
  getConstructionsFromLocalStorage,
  parseObjFromLocalStorage,
} from "./utils";
import { calcDelta, xsCalc } from "./calc";

const ProcessorApp = () => {
  const [constructions, setConstructions] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedConstruction, setSelectedConstruction] = useState();

  const handleDeleteConstruction = (constructionName) => {
    setConstructions(
      constructions.filter(({ name }) => name !== constructionName)
    );
    localStorage.removeItem(constructionName);
  };

  useEffect(() => setConstructions(getConstructionsFromLocalStorage()), []);
  const deltaValues = calcDelta(parseObjFromLocalStorage(selectedConstruction))
    ?.delta?.map((delta) => delta)
    .flat();

  console.log(deltaValues);

  // console.log(
  //   "calc",
  //   calcDelta(parseObjFromLocalStorage(selectedConstruction))
  // );

  // console.log("jopa", nCalc(construction?.rodsData?.[0], deltaValues));

  // console.log(
  //   " parseObjFromLocalStorage(selectedConstruction)?.rodsData[0]",
  //   parseObjFromLocalStorage(selectedConstruction)?.rodsData[0]
  // );

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
        <Modal.Body>
          {xsCalc(
            parseObjFromLocalStorage(selectedConstruction)?.rodsData
          )?.map((xsArr, index) => (
            <div className="card-body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{`Стержень ${++index}`}</th>
                    {xsArr.map((val) => (
                      <th>{val}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>N</td>
                    {calcDelta(
                      parseObjFromLocalStorage(selectedConstruction)
                    ).N?.[--index]?.map((val) => (
                      <td>{val}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>U</td>
                    {calcDelta(
                      parseObjFromLocalStorage(selectedConstruction)
                    ).U?.[index]?.map((val) => (
                      <td>{val}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>σ</td>
                    {calcDelta(
                        parseObjFromLocalStorage(selectedConstruction)
                    ).S?.[index]?.map((val) => (
                        <td
                            className={
                              Number(val) <=
                              Number(
                                  parseObjFromLocalStorage(selectedConstruction)
                                      ?.rodsData?.[index]?.allowableVoltage
                              ) &&
                              Number(val) >=
                              -Number(
                                  parseObjFromLocalStorage(selectedConstruction)
                                      ?.rodsData?.[index]?.allowableVoltage
                              )
                                  ? `text-success`
                                  : "text-danger"
                            }
                        >
                          {val}
                        </td>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </div>
          ))}
        </Modal.Body>
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
                    <Button
                      onClick={() => {
                        setSelectedConstruction(name);
                        setIsShowModal(true);
                      }}
                    >
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
