import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';

import ReviewQuotes from './ReviewQuotes';

/** ******* for testing -- remove */
const fakeReviewQuotesData = [
  {
    courseName: 'React Testing with Jest and Enzyme',
    reviewQuotes: [
      { id: 1, reviewQuote: 'Massacre a bird in the living room and then look like the cutest and most innocent animal on the planet poop on grasses for eat fish on floor. Scamper vommit food and eat it again chase after silly colored fish toys around the house claws in the eye of the beholder. Catty ipsum sleep on dog bed, force dog to sleep on floor. Hiiiiiiiiii feed me now do not try to mix old food with new one to fool me!' },
      { id: 2, reviewQuote: 'Cats are fats i like to pets them' },
    ],
  },
  {
    courseName: 'Regular Expressions for Beginners and Beyond! With Exercises',
    reviewQuotes: [
      { id: 1, reviewQuote: 'Massacre a bird in the living room and then look like the cutest and most innocent animal on the planet poop on grasses for eat fish on floor. Scamper vommit food and eat it again chase after silly colored fish toys around the house claws in the eye of the beholder. Catty ipsum sleep on dog bed, force dog to sleep on floor. Hiiiiiiiiii feed me now do not try to mix old food with new one to fool me!' },
      { id: 2, reviewQuote: 'Cats are fats i like to pets them' },
      { id: 3, reviewQuote: 'i like to walk on the deck, watching the horizon, dreaming of a good bowl of milk cat walks in keyboard ' },
    ],
  },
];
  /** ******* end: for testing -- remove */

export default function About(): ReactElement {
  return (
    <Box>
      <Box component="section" mt={4} mb={4} p={2} pt={2}>
        <Typography variant="h2" gutterBottom>About Bonnie</Typography>
        <Typography style={{ fontSize: 16, fontWeight: 500 }}>
          Bonnie&apos;s wide-ranging past positions include education programs at a planetarium,
          high school physics teacher, coding boot camp instructor, and developer
          infrastructure engineer test frameworks. All of her favorite jobs have involved explaining
          thorny technical concepts in some form, and she&apos;s pleased as punch to
          be producing online content full-time. She feels weird writing about herself
          in the third person.
        </Typography>
      </Box>
      <ReviewQuotes reviewQuotesData={fakeReviewQuotesData} />
    </Box>
  );
}
