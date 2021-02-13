/* eslint-disable import/prefer-default-export */
// TODO: ts: For some reason React.FormEvent<HTMLFormElement>
//    doesn't work for the event type
export function getFormData(event) {
  const rawData = [...event.target.elements];
  return rawData.reduce((acc, element) => {
    if (element.name) acc[element.name] = element.value;
    return acc;
  }, {});
}
