import { ReviewQuoteType } from 'Pages/About/ReviewQuotes/Types';
import { CourseType } from 'Pages/Courses/Types';

export function getFormData(event) {
  const rawData = [...event.target.elements];
  return rawData.reduce((acc, element) => {
    if (element.name) acc[element.name] = element.value;
    return acc;
  }, {});
}

// need to overload because reduce errors on union types
// https://github.com/microsoft/TypeScript/issues/7294
export function hasNewItem(collection: CourseType[]): boolean;
export function hasNewItem(collection: ReviewQuoteType[]): boolean;
export function hasNewItem(collection) {
  // in this case, a new item is one with a negative id
  return collection.reduce((hasNew, item) => ((item.id < 0) ? true : hasNew), false);
}
