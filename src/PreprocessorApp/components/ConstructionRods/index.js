import "../../styles.scss";
import { TABLE_HEADERS } from "./constants";

const ConstructionRods = ({ rodsData, offsetHaveSupports }) => {
  const { isHaveSupports, setIsHaveSupports } = offsetHaveSupports;

  return (
    <div className="preprocessorApp__block mt-5">
      <h4>Стержни конструкции</h4>
      <table className="table">
        <thead>
          <tr>
            {TABLE_HEADERS.map((name) => (
              <th key={name} scope="col">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rodsData.map((elem, index) => (
            <tr key={index}>
              <th scope="row">{++index}</th>
              <td>{Number(elem.rodLength)}</td>
              <td>{Number(elem.crossSectionalArea)}</td>
              <td>{Number(elem.elasticModulus)}</td>
              <td>{Number(elem.allowableVoltage)}</td>
              <td>{Number(elem.concentratedLoad)}</td>
              <td>{Number(elem.linearLoad)}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default ConstructionRods;
