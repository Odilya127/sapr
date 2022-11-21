import { useState } from "react";

import "./styles.scss";
import AddingNewRod from "./components/AddingNewRod";
import ConstructionRods from "./components/ConstructionRods";

const PreprocessorApp = () => {
  const [rodsData, setRodsData] = useState([]);

  return (
    <div className="preprocessorApp">
      <h2 className="preprocessorApp__title">Препроцессор</h2>
      <AddingNewRod setRodsData={setRodsData} />
      {rodsData.length > 0 ? <ConstructionRods rodsData={rodsData} /> : null}
    </div>
  );
};

export default PreprocessorApp;
