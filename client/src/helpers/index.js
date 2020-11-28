/* eslint-disable import/prefer-default-export */
export const getFormData = function (event) {
  const rawData = [...event.target.elements];
  return rawData.reduce((acc, element) => {
    if (element.name) acc[element.name] = element.value;
    return acc;
  }, {});
};
