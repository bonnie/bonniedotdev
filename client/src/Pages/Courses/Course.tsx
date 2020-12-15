/* eslint-disable global-require */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement } from 'react';
import { colors } from 'Theme';

import Coupon from './Coupon';
import { CourseType } from './Types/index';

const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: 345,
    minHeight: 300,
    height: '100%',
  },
  header: {
    height: '3em',
    verticalAlign: 'top',
    fontWeight: 700,
    color: colors.darkTeal,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  coupons: {
    width: '100%',
    background: '#fff',
  },
}));

type CourseProps = {
  courseData: CourseType,
};

export default function Course({ courseData }: CourseProps): ReactElement {
  const courseImgUrlStart = `${process.env.PUBLIC_URL}/images/course-images`;
  const classes = useStyles();

  return (

    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Card className={classes.root} square>
        <CardActionArea href={courseData.link} target="_blank" rel="noreferrer">
          <CardMedia
            className={classes.media}
          // eslint-disable-next-line import/no-dynamic-require
            image={`${courseImgUrlStart}/${courseData.imageName}`}
            title="Course Image"
          />
          <CardHeader className={classes.header} title={courseData.name} />
          <CardContent>
            <Typography component="p">
              {courseData.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Box className={classes.coupons}>
        <Divider variant="middle" />
        {courseData.bestCoupon
          ? <Coupon couponData={courseData.bestCoupon} courseLink={courseData.link} />
          : null}
      </Box>
    </Box>

  );
}
