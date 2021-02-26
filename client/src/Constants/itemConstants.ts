import urls from 'Constants/urls';
import { itemEditDetails, ItemType } from 'Types';

// Talks //////////////////////////////////
const talkPatchKeys = [
  'title',
  'utcDateStringISO',
  'description',
  'slidesFilename',
  'conferenceImageName',
  'conferenceName',
  'conferenceLink',
  'recordingLink',
];

export const talkDetails: itemEditDetails = {
  itemString: 'Talk',
  editUrl: urls.talkURL,
  patchRelevantKeys: talkPatchKeys,
  itemIdentifier: ItemType.talk,
};

// Courses //////////////////////////////////
const coursePatchKeys = ['name', 'description', 'link', 'imageName'];

export const courseDetails: itemEditDetails = {
  itemString: 'Course',
  editUrl: urls.courseURL,
  patchRelevantKeys: coursePatchKeys,
  itemIdentifier: ItemType.course,
};

// Coupons //////////////////////////////////
const couponPatchKeys = ['link', 'price', 'utcExpirationISO', 'courseId'];

export const couponDetails: itemEditDetails = {
  itemString: 'Coupon',
  editUrl: urls.couponURL,
  patchRelevantKeys: couponPatchKeys,
  itemIdentifier: ItemType.coupon,
};

// ReviewQuotes //////////////////////////////////
const reviewQuotePatchKeys = ['body', 'courseId'];

export const reviewQuoteDetails: itemEditDetails = {
  itemString: 'Review Quote',
  editUrl: urls.reviewQuoteURL,
  patchRelevantKeys: reviewQuotePatchKeys,
  itemIdentifier: ItemType.reviewQuote,
};

// CheatSheets //////////////////////////////////
const cheatSheetPatchKeys = ['title', 'tagNames'];

export const cheatSheetDetails: itemEditDetails = {
  itemString: 'Cheat Sheet',
  editUrl: urls.cheatSheetURL,
  patchRelevantKeys: cheatSheetPatchKeys,
  itemIdentifier: ItemType.cheatSheet,
};
