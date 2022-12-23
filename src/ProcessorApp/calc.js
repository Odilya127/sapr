import { inv } from "mathjs";

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

  return AA.reverse();
};

const uCalc = (rod, delta) => {
  let XS = [];
  let U = [];

  for (let i = 0; i < 10; i++) {
    U[i] = 0;
    XS[i] = 0;
  }

  for (let i = 0; i < 10; i++) {
    XS[i] = (i * Number(rod.rodLength)) / 10;
  }

  for (let i = 0; i < 10; i++) {
    U[i] = (
      (1 - XS[i] / Number(rod.rodLength)) * delta[0] +
      (XS[i] / Number(rod.rodLength)) * delta[1] +
      ((Number(rod.linearLoad) * Math.pow(Number(rod.rodLength), 2)) /
        (2 * Number(rod.elasticModulus) * Number(rod.crossSectionalArea))) *
        (XS[i] / Number(rod.rodLength)) *
        (1 - XS[i] / Number(rod.rodLength))
    ).toFixed(2);
  }

  return U;
};

const nCalc = (rod, delta) => {
  let XS = [];
  let N = [];

  for (let i = 0; i < 10; i++) {
    N[i] = 0;
    XS[i] = 0;
  }

  for (let i = 0; i < 10; i++) {
    XS[i] = (i * Number(rod.rodLength)) / 10;
  }

  for (let i = 0; i < 10; i++) {
    N[i] = (
      ((Number(rod.elasticModulus) * Number(rod.crossSectionalArea)) /
        Number(rod.rodLength)) *
        (delta[0] - delta[1]) +
      ((Number(rod.linearLoad) * Number(rod.rodLength)) / 2) *
        (1 - 2 * (XS[i] / Number(rod.rodLength)))
    )?.toFixed(2);
  }

  return N;
};

const sCalc = (rod, N) => {
  let XS = [];
  let S = [];

  for (let i = 0; i < 10; i++) {
    S[i] = 0;
    XS[i] = 0;
  }

  for (let i = 0; i < 10; i++) {
    XS[i] = (i * Number(rod.rodLength)) / 10;
  }

  for (let i = 0; i < 10; i++) {
    S[i] = Number(N[i]) / Number(rod.crossSectionalArea);
  }

  return S;
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

export const calcDelta = (construction) => {
  if (construction) {
    L = construction.rodsData.map(({ rodLength }) => Number(rodLength));
    F = construction.rodsData.map(({ concentratedLoad }) =>
      Number(concentratedLoad)
    );
    Q = construction.rodsData.map(({ linearLoad }) => Number(linearLoad));
    E = construction.rodsData.map(({ elasticModulus }) =>
      Number(elasticModulus)
    );
    A = construction.rodsData.map(({ crossSectionalArea }) =>
      Number(crossSectionalArea)
    );

    const rodsCount = Q.length;

    const B = bCalc(rodsCount, construction.leftLimit, construction.rightLimit);
    const AA = aCalc(
      rodsCount,
      construction.leftLimit,
      construction.rightLimit
    );
    const inverse = inv(AA);
    const delta = multiply([B], inverse);

    const N = construction.rodsData.map((rod) => nCalc(rod, delta.flat()));

    const U = construction.rodsData.map((rod) => uCalc(rod, delta.flat()));
    console.log("u", U);

    console.log("n", N);
    const S = construction.rodsData.map((rod, index) => sCalc(rod, N[index]));

    console.log(
      "s",
      construction.rodsData.map((rod, index) => sCalc(rod, N[index]))
    );

    console.log("xs", xsCalc(construction.rodsData));

    const data = {
      N,
      U,
      S,
    };

    return { delta, N, U, S };
  }
};

export const xsCalc = (rodsData) => {
  const arr = [];

  for (let i = 0; i < 10; i++) {
    arr[i] = 0;
  }

  return rodsData?.map((rod) =>
    arr.map((value, index) => (++index * Number(rod.rodLength)) / 10)
  );
};
