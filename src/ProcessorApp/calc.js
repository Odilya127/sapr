import matrixInverse from "matrix-inverse";

let L = [];
let F = [];
let Q = [];
let E = [];
let A = [];

const bCalc = (rodsCount, leftLimit, rightLimit) => {
  const b = [];

  for (let i = 0; i < rodsCount + 1; i++) {
    b[i] = [];
    for (let j = 0; j < rodsCount + 1; j++) {
      b[i][j] = 0;
    }
  }

  for (let i = 0; i < F.length; i++) {
    if (i === 0) {
      b[i] = F[0] + (Q[0] * L[0]) / 2;
      b[i + 1] = (Q[0] * L[0]) / 2;
    } else if (i === rodsCount) {
      b[i] = F[i];
      b[i] += (Q[i - 1] * L[i - 1]) / 2;
    } else {
      b[i] += F[i] + (Q[i] * L[i]) / 2;
      b[i + 1] = (Q[i] * L[i]) / 2;
    }
  }

  if (leftLimit) {
    b[0] = 0.0;
  }
  if (rightLimit) {
    b[rodsCount] = 0.0;
  }

  return b;
};

const aCalc = (rodsCount, leftLimit, rightLimit) => {
  let AA = [];

  for (let i = 0; i < rodsCount + 1; i++) {
    AA[i] = [];
  }

  for (let i = 0; i < rodsCount + 1; i++) {
    for (let j = 0; j < rodsCount + 1; j++) {
      AA[i][j] = 0;
    }
  }

  for (let i = 0; i < rodsCount + 1; i++) {
    if (i === rodsCount) {
      AA[rodsCount][rodsCount] =
        (E[rodsCount - 1] * A[rodsCount - 1]) / L[rodsCount - 1];
    } else {
      let k = (E[i] * A[i]) / L[i];
      AA[i][i] += k;
      AA[i + 1][i + 1] += k;
      AA[i + 1][i] -= k;
      AA[i][i + 1] -= k;
    }
  }

  if (leftLimit) {
    AA[0][0] = 1.0;
    AA[0][1] = 0.0;
    AA[1][0] = 0.0;
  }
  if (rightLimit) {
    AA[rodsCount][rodsCount] = 1.0;
    AA[rodsCount][rodsCount - 1] = 0.0;
    AA[rodsCount - 1][rodsCount] = 0.0;
  }

  return AA;
};

function multiply(a, b) {
  var aNumRows = a.length,
    aNumCols = a[0].length,
    bNumRows = b.length,
    bNumCols = b[0].length,
    m = new Array(aNumRows); // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0; // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

export const calc = (rod) => {
  if (rod) {
    L = rod.rodsData.map(({ rodLength }) => Number(rodLength));
    F = rod.rodsData.map(({ concentratedLoad }) => Number(concentratedLoad));
    Q = rod.rodsData.map(({ linearLoad }) => Number(linearLoad));
    E = rod.rodsData.map(({ elasticModulus }) => Number(elasticModulus));
    A = rod.rodsData.map(({ crossSectionalArea }) =>
      Number(crossSectionalArea)
    );

    const rodsCount = Q.length;

    const B = bCalc(rodsCount, rod.leftLimit, rod.rightLimit);
    const AA = aCalc(rodsCount, rod.leftLimit, rod.rightLimit);
    const inverse = matrixInverse(AA);
    const delta = multiply([B], inverse);

    return delta;
  }
};
