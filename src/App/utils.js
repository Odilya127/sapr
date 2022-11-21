import Preprocessor from "../PreprocessorApp";
import Processor from "../ProcessorApp";
import { AppType } from "./constants";

export const getApp = (appType) => {
  switch (appType) {
    case AppType.Preprocessor:
      return <Preprocessor />;
    case AppType.Processor:
      return <Processor />;
    default:
      return null;
  }
};
