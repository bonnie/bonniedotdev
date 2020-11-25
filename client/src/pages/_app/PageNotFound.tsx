import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';

import shameGus from '../../images/kittens/ashamedGus.jpg';
import carefreeMoxie from '../../images/kittens/carefreeMoxie.jpg';
import concernedGus from '../../images/kittens/concernedGus.jpg';
import distraughtGus from '../../images/kittens/distraughtGus.jpg';
import featherGus from '../../images/kittens/featherGus.jpg';
import gusPlant from '../../images/kittens/gusPlant.jpg';
import sleeping from '../../images/kittens/sleepingKittens.jpg';

export default function PageNotFound(): ReactElement {
  const kittenImages = {
    concernedGus,
    sleeping,
    shameGus,
    distraughtGus,
    carefreeMoxie,
    featherGus,
    gusPlant,
  };
  const kittenCaptions = [
    'Gus is very concerned.',
    'Moxie and Gus will get right on that.',
    'Gus is ashamed.',
    'Gus is distraught.',
    'Moxie is very concerned.',
    'Gus will make the feather pay.',
    'Gus swears it wasn&apos;t him.',
  ];

  // pick a kitten pic / caption at random
  const randNum = Math.floor((Math.random() * kittenCaptions.length));
  const image = kittenImages[randNum];
  const caption = kittenCaptions[randNum];
  return (
    <Container>
      <Typography variant="h1" gutterBottom>Oops!</Typography>
      <Typography variant="subtitle1" gutterBottom>That page doesn&apos;t exist.</Typography>
      <Typography variant="h3" gutterBottom>{caption}</Typography>
      <img src={image} alt="silly kitten" />
    </Container>
  );
}
