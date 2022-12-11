import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../styles.scss";

import { TABLE_COLUMNS } from "./constants";

const ConstructionRods = ({
  offsetRodsData,
  offsetHaveSupports,
  setIsShowModal,
}) => {
  const { isHaveSupports, setIsHaveSupports } = offsetHaveSupports;
  const { rodsData, setRodsData } = offsetRodsData;

  return (
    <div className="preprocessorApp__block mt-5">
      <h4>Стержни конструкции</h4>
      <BootstrapTable
        keyField="id"
        classes="bg-white"
        data={rodsData.map((rod, index) => {
          return { ...rod, indexNumber: ++index };
        })}
        columns={TABLE_COLUMNS}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          afterSaveCell: (_oldValue, newValue, currentRod, column) => {
            setRodsData(
              rodsData.map((rod) => {
                if (rod.id === currentRod.id) {
                  return { ...rod, [column.dataField]: newValue };
                }
                return rod;
              })
            );
          },
        })}
      />

      <Row>
        <Col>
          <input
            className="form-check-input"
            type="checkbox"
            value={isHaveSupports.supportLeft}
            onChange={() =>
              setIsHaveSupports((prevState) => {
                return {
                  ...prevState,
                  supportLeft: !prevState.supportLeft,
                };
              })
            }
            id="supportLeft"
          />
          <label className="form-check-label mx-3" htmlFor="supportLeft">
            Опора слева
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            value={isHaveSupports.supportRight}
            onChange={() =>
              setIsHaveSupports((prevState) => {
                return {
                  ...prevState,
                  supportRight: !prevState.supportRight,
                };
              })
            }
            id="supportRight"
          />
          <label className="form-check-label mx-3" htmlFor="supportRight">
            Опора справа
          </label>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => setIsShowModal(true)}>
            Сохранить конструкцию
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ConstructionRods;
