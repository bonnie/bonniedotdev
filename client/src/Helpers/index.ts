/* eslint-disable import/prefer-default-export */
export function getFormData(event) {
  const rawData = [...event.target.elements];
  return rawData.reduce((acc, element) => {
    if (element.name) acc[element.name] = element.value;
    return acc;
  }, {});
}
