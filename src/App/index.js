import { useState } from "react";

import "./styles.scss";
import { AppType } from "./constants";
import { getApp } from "./utils";

const Index = () => {
  const [activeApp, setActiveApp] = useState(AppType.Preprocessor);

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">САПР</h1>
        <nav className="app__nav">
          <a
            type="button"
            onClick={() => setActiveApp(AppType.Preprocessor)}
            className={`app__link${
              activeApp === AppType.Preprocessor ? "_active" : "_notActive"
            }`}
          >
            Препроцессор
          </a>
          /
          <a
            type="button"
            onClick={() => setActiveApp(AppType.Processor)}
            className={`app__link${
              activeApp === AppType.Processor ? "_active" : "_notActive"
            }`}
          >
            Процессор
          </a>
        </nav>
      </header>
      <section>{getApp(activeApp)}</section>
    </div>
  );
};

export default Index;
