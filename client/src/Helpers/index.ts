import moment from 'moment';
import { USER_LOCALSTORAGE_KEY } from 'State/Reducers/userReducer';

function getFieldValue(element: HTMLFormElement) {
  // dates need special treatment because Material UI picker won't
  // leave ISO string value unmolested
  if (element.id.startsWith('local-date')) {
    return moment.utc(element.value).toISOString();
  }

  return element.multiple ? element.value.split(',') : element.value;
}

// TODO: ts: For some reason React.FormEvent<HTMLFormElement>
//    doesn't work for the event type
export function getFormData(event) {
  const rawData = [...event.target.elements];
  return rawData.reduce((acc, element) => {
    if (element.name) acc[element.name] = getFieldValue(element);
    return acc;
  }, {});
}

export function getUploadedImageURL(imageName: string): string {
  const path = `/uploads/${imageName}`;
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:5050${path}`
    : path;
}

export function urlify(phrase: string): string {
  // turn spaces into hyphens for a friendlier url
  return phrase.replace(/ /g, '-').toLowerCase();
}

interface jwtHeader {
  'x-access-token'?: string;
}

export function getJWTHeader(): jwtHeader {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  let token = null;
  if (storedUser) {
    token = JSON.parse(storedUser).token;
  }

  return token ? { 'x-access-token': token } : {};
}
