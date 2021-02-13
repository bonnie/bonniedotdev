/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import urls from 'Constants/urls';
import EditItemButtons from 'Pages/Common/EditButtons';
import React, { ReactElement, useMemo } from 'react';
import { colors } from 'Theme';
import { Course as CourseType } from 'Types';

import Coupons from './Coupons/Coupons';
import EditCourseFields from './EditCourseFields';

const coursePatchKeys = ['name', 'description', 'link', 'imageName'];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 345,
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
}));

const editCourseButtons = (courseData) => (
  <EditItemButtons
    itemString="Course"
    itemData={courseData}
    ItemFieldsComponent={<EditCourseFields courseData={courseData} />}
    patchRelevantKeys={coursePatchKeys}
    itemEndpoint={urls.talkURL}
  />
);

interface CourseProps {
  courseData: CourseType;
}

// eslint-disable-next-line max-lines-per-function
export default function Course({ courseData }: CourseProps): ReactElement {
  const classes = useStyles();

  return useMemo(
    () => (
      <Grid
        style={{ display: 'flex', alignItems: 'stretch' }}
        item
        xs={12}
        sm={6}
        md={4}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Card className={classes.root} square>
            <CardActionArea
              href={courseData.link}
              target="_blank"
              rel="noreferrer"
            >
              <CardMedia
                className={classes.media}
                image={`/static/images/courses/${courseData.imageName}`}
                title="Course Image"
              />
            </CardActionArea>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Link href={courseData.link} target="_blank" rel="noreferrer">
                <CardHeader
                  className={classes.header}
                  title={courseData.name}
                />
              </Link>
              {editCourseButtons(courseData)}
            </Box>
            <CardContent>
              <Typography component="p">{courseData.description}</Typography>
            </CardContent>
          </Card>
          <Coupons courseData={courseData} />
        </Box>
      </Grid>
    ),
    [courseData],
  );
}
