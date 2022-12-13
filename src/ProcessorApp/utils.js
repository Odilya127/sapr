export const parseObjFromLocalStorage = (obj) => {
  return JSON.parse(localStorage.getItem(obj));
};

export const getConstructionsFromLocalStorage = () => {
  const constructions = [];
  for (let i = 0; i < localStorage.length; i++) {
    let storedValue = localStorage.key(i);

    if (storedValue.includes("construction")) {
      constructions.push({
        name: storedValue,
        construction: parseObjFromLocalStorage(localStorage.key(i)),
      });
    }
  }
  return constructions;
};
