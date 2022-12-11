export const getConstructionsFromLocalStorage = () => {
  const constructions = [];
  for (let i = 0; i < localStorage.length; i++) {
    let storedValue = localStorage.key(i);

    if (storedValue.includes("construction")) {
      constructions.push({
        name: storedValue,
        construction: JSON.parse(localStorage.getItem(localStorage.key(i))),
      });
    }
  }
  return constructions;
};
