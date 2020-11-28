/* eslint-disable import/prefer-default-export */
export const getFormData = function (event) {
  const rawData = [...event.target.elements];
  return rawData.reduce((acc, element) => {
    if (element.id) acc[element.id] = element.value;
    return acc;
  }, {});
};
