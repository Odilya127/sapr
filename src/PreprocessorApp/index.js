import { useEffect, useState } from "react";
import { InputGroup, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import supportLeftIcon from "../assets/img/supportLeft.png";
import supportRightIcon from "../assets/img/supportRight.png";
import arrowLeft from "../assets/img/arrowLeft.png";
import arrowRight from "../assets/img/arrowRight.png";
import arrowLongRight from "../assets/img/arrowLongRight.png";
import arrowLongLeft from "../assets/img/arrowLongLeft.png";

import "./styles.scss";
import AddingNewRod from "./components/AddingNewRod";
import ConstructionRods from "./components/ConstructionRods";

const PreprocessorApp = () => {
  const [rodsData, setRodsData] = useState([]);
  const [isHaveSupports, setIsHaveSupports] = useState({
    supportLeft: false,
    supportRight: false,
  });
  const [isShowModal, setIsShowModal] = useState(false);
  const [constructionName, setConstructionName] = useState("");

  const drawStructure = () => {
    let canvas;
    let ctx;
    canvas = document?.getElementById("canvas");
    ctx = canvas?.getContext("2d");
    canvas.width = 1900;
    canvas.height = 600;
    ctx?.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (canvas?.getContext) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      let width = 0;
      let widthOfFirst = 1000 - 10;
      let heightOfFirst = 500 - 10;
      let currentHeight = 0;
      let totalLengthL = 0;
      for (let r = 0; r < rodsData.length; r++) {
        totalLengthL += Number(rodsData[r].rodLength);
      }
      let totalSquareA = 0;
      for (let r = 0; r < rodsData.length; r++) {
        if (totalSquareA < rodsData[r].crossSectionalArea) {
          totalSquareA = rodsData[r].crossSectionalArea;
        }
      }
      let coefL = 0;
      let coefA = 0;
      coefL = (widthOfFirst - 40) / totalLengthL;
      coefA = (heightOfFirst - 40) / totalSquareA;

      let supportLeft = document.getElementById("supportLeftIcon");
      let supportRight = document.getElementById("supportRightIcon");
      let arrowLeft = document.getElementById("arrowLeft");
      let arrowRight = document.getElementById("arrowRight");

      let arrowLongRight = document.getElementById("arrowLongRight");
      let arrowLongLeft = document.getElementById("arrowLongLeft");
      let maxHeight = 0;

      let X = 50;
      let Y = 70;
      let startX = X + 20;
      var endX = 0;
      var endY = 0;

      for (let r = 0; r < rodsData.length; r++) {
        width = rodsData[r].rodLength * coefL;
        currentHeight = rodsData[r].crossSectionalArea * coefA;

        if (currentHeight > maxHeight) {
          maxHeight = currentHeight;
        }

        endX = X;
        endY = Y;

        var widthF = 20;
        var heightF = 70;

        if (!rodsData[r].rodLength || !rodsData[r].crossSectionalArea) {
          if (r != rodsData.length - 1) {
            alert("Ошибка! Длина или площадь стержня равна нулю!");
            return;
          }
        } else {
          let xOfFirst = 50;
          let yOfFirst = 50;
          X = widthOfFirst;
          let xQ = startX;
          let widthQ = 30;
          let heightQ = 15;
          ctx.strokeRect(
            startX,
            yOfFirst + heightOfFirst / 2 - currentHeight / 2,
            width,
            currentHeight
          );
          startX += width;

          if (rodsData[r].concentratedLoad > 0) {
            ctx.drawImage(
              arrowLongRight,
              xQ,
              yOfFirst + heightOfFirst / 2 - currentHeight / 3 / 2,
              width / 2,
              currentHeight / 3
            );
          } else if (rodsData[r].concentratedLoad < 0 && r > 0) {
            ctx.drawImage(
              arrowLongLeft,
              xQ - (rodsData[r - 1].rodLength * coefL) / 2,
              yOfFirst +
                heightOfFirst / 2 -
                (rodsData[r - 1].crossSectionalArea * coefA) / 3 / 2,
              (rodsData[r - 1].rodLength * coefL) / 2,
              (rodsData[r - 1].crossSectionalArea * coefA) / 3
            );
          }

          if (rodsData[r].linearLoad > 0) {
            do {
              ctx.drawImage(
                arrowRight,
                xQ,
                yOfFirst + heightOfFirst / 2 - heightQ / 2,
                widthQ,
                heightQ
              );
              xQ += widthQ;
            } while (xQ + widthQ <= startX);
          } else if (rodsData[r].linearLoad < 0) {
            do {
              ctx.drawImage(
                arrowLeft,
                xQ,
                yOfFirst + heightOfFirst / 2 - heightQ / 2,
                widthQ,
                heightQ
              );
              xQ += widthQ;
            } while (xQ + widthQ <= startX);
          }

          let endOfFirst = widthOfFirst + 30;

          if (isHaveSupports.supportLeft) {
            ctx.drawImage(
              supportLeft,
              xOfFirst,
              yOfFirst + heightOfFirst / 2 - heightF / 2,
              widthF,
              heightF
            );
          }

          if (isHaveSupports.supportRight) {
            ctx.drawImage(
              supportRight,
              endOfFirst,
              yOfFirst + heightOfFirst / 2 - heightF / 2,
              widthF,
              heightF
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    drawStructure();
  }, [rodsData, isHaveSupports]);

  const showVisualization = rodsData.length > 0 ? {} : { display: "none" };

  const handleSaveConstruction = () => {
    localStorage.setItem(
      `construction.${constructionName}`,
      JSON.stringify({
        rodsData,
        leftLimit: isHaveSupports.supportLeft,
        rightLimit: isHaveSupports.supportRight,
      })
    );
    setRodsData([]);
    setIsShowModal(false);
  };

  return (
    <>
      <Modal show={isShowModal} onHide={() => setIsShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Введите наименование конструкции</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <Form.Control
              autoFocus
              onChange={(event) => setConstructionName(event.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShowModal(false)}>
            Закрыть
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveConstruction}
            disabled={!constructionName}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="preprocessorApp">
        <h2 className="preprocessorApp__title">Препроцессор</h2>
        <AddingNewRod offsetRodsData={{ rodsData, setRodsData }} />
        {rodsData.length > 0 ? (
          <ConstructionRods
            offsetRodsData={{ rodsData, setRodsData }}
            offsetHaveSupports={{ isHaveSupports, setIsHaveSupports }}
            setIsShowModal={setIsShowModal}
          />
        ) : null}
        <div
          className="preprocessorApp__block mt-5 canvas"
          style={showVisualization}
        >
          <img
            id="supportLeftIcon"
            src={supportLeftIcon}
            style={{ display: "none" }}
          />
          <img
            id="supportRightIcon"
            src={supportRightIcon}
            style={{ display: "none" }}
          />
          <img id="arrowLeft" src={arrowLeft} style={{ display: "none" }} />
          <img id="arrowRight" src={arrowRight} style={{ display: "none" }} />
          <img
            id="arrowLongRight"
            src={arrowLongRight}
            style={{ display: "none" }}
          />
          <img
            id="arrowLongLeft"
            src={arrowLongLeft}
            style={{ display: "none" }}
          />

          <canvas id="canvas" height="0"></canvas>
        </div>
      </div>
    </>
  );
};

export default PreprocessorApp;
