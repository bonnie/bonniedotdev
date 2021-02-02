import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import shameGus from 'Images/kittens/ashamedGus.jpg';
import carefreeMoxie from 'Images/kittens/carefreeMoxie.jpg';
import concernedGus from 'Images/kittens/concernedGus.jpg';
import coverEyes from 'Images/kittens/coverEyes.jpg';
import distraughtGus from 'Images/kittens/distraughtGus.jpg';
import featherGus from 'Images/kittens/featherGus.jpg';
import gusPlant from 'Images/kittens/gusPlant.jpg';
import sleeping from 'Images/kittens/sleepingKittens.jpg';
import whyGus from 'Images/kittens/whyGus.jpg';
import React, { ReactElement } from 'react';

const useStyles = makeStyles(() => ({
  kittenImage: {
    width: '100%',
    maxWidth: '512px',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
}));

// eslint-disable-next-line max-lines-per-function
export default function PageNotFound(): ReactElement {
  const classes = useStyles();

  const kittenImages = [
    concernedGus,
    sleeping,
    shameGus,
    distraughtGus,
    carefreeMoxie,
    featherGus,
    gusPlant,
    whyGus,
    coverEyes,
  ];
  const kittenCaptions = [
    'Gus is very concerned.',
    'Moxie and Gus will get right on that.',
    'Gus is ashamed.',
    'Gus is distraught.',
    'Moxie is very concerned.',
    "Gus won't let the feather get away with this.",
    "Gus swears it wasn't him.",
    'Moxie is not amused.',
    "Gus can't let Moxie see this.",
  ];

  // pick a kitten pic / caption at random
  const randNum = Math.floor(Math.random() * kittenCaptions.length);
  const image = kittenImages[randNum];
  const caption = kittenCaptions[randNum];
  return (
    <Grid container style={{ backgroundImage: 'none' }}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          That page doesn&apos;t exist.
        </Typography>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Box pt={5} textAlign="center">
          <Typography variant="h3" gutterBottom>
            {caption}
          </Typography>
          <img className={classes.kittenImage} src={image} alt="silly kitten" />
        </Box>
      </Grid>
    </Grid>
  );
}
