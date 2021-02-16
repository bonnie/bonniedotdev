import urls from 'Constants/urls';
import { itemEditDetails } from 'Types';

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
};

// Courses //////////////////////////////////
const coursePatchKeys = ['name', 'description', 'link', 'imageName'];

export const courseDetails: itemEditDetails = {
  itemString: 'Course',
  editUrl: urls.courseURL,
  patchRelevantKeys: coursePatchKeys,
};

// Coupons //////////////////////////////////
const couponPatchKeys = ['link', 'price', 'utcExpirationISO', 'courseId'];

export const couponDetails: itemEditDetails = {
  itemString: 'Coupon',
  editUrl: urls.couponURL,
  patchRelevantKeys: couponPatchKeys,
};

// ReviewQuotes //////////////////////////////////
const reviewQuotePatchKeys = ['body', 'courseId'];

export const reviewQuoteDetails: itemEditDetails = {
  itemString: 'Review Quote',
  editUrl: urls.reviewQuoteURL,
  patchRelevantKeys: reviewQuotePatchKeys,
};
