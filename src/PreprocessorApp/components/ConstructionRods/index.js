import "../../styles.scss";
import { TABLE_HEADERS } from "./constants";

const ConstructionRods = ({ rodsData }) => {
  return (
    <div className="preprocessorApp__block mt-5">
      <h4>Стержни конструкции</h4>
      <table className="table">
        <thead>
          <tr>
            {TABLE_HEADERS.map((name) => (
              <th scope="col">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rodsData.map((elem, index) => (
            <tr key={index}>
              <th scope="row">{++index}</th>
              <td>{elem.rodLength}</td>
              <td>{elem.crossSectionalArea}</td>
              <td>{elem.elasticModulus}</td>
              <td>{elem.allowableVoltage}</td>
              <td>{elem.concentratedLoad}</td>
              <td>{elem.linearLoad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConstructionRods;
