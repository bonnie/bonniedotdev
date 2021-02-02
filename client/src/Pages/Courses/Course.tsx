import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { ReactElement, useMemo } from 'react';
import { colors } from 'Theme';

import AddCouponButton from './Coupons/AddCouponButton';
import Coupon from './Coupons/Coupon';
import DeleteCouponButton from './Coupons/DeleteCouponButton';
import EditCouponButton from './Coupons/EditCouponButton';
import { CourseType } from './Types';

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
  coupons: {
    width: '100%',
    background: '#fff',
  },
}));

interface CourseProps {
  courseData: CourseType;
  editButtons: ReactElement | null;
}

// eslint-disable-next-line max-lines-per-function
export default function Course({
  courseData,
  editButtons,
}: CourseProps): ReactElement {
  const classes = useStyles();
  const loggedIn = !!editButtons;

  const couponsHeader = useMemo(() => {
    return loggedIn ? (
      <Box m={2}>
        <Typography variant="h5" style={{ display: 'inline' }}>
          Coupons
        </Typography>
        <AddCouponButton courseId={courseData.id} />
      </Box>
    ) : null;
  }, [loggedIn, courseData.id]);

  const coupons = useMemo(() => {
    if (!courseData.coupons) return null;
    if (!loggedIn) {
      if (!courseData.bestCoupon) return null;
      return <Coupon couponData={courseData.bestCoupon} editButtons={null} />;
    }
    // if we got to here, then we're logged in and there are coupons
    return courseData.coupons.map((couponData) => {
      const couponEditButtons = (
        <>
          <EditCouponButton
            id={couponData.id}
            couponData={couponData}
            courseId={courseData.id}
          />
          <DeleteCouponButton id={couponData.id} name="this coupon" />
        </>
      );
      return (
        <Coupon
          key={couponData.id}
          couponData={couponData}
          editButtons={couponEditButtons}
        />
      );
    });
  }, [loggedIn, courseData.bestCoupon, courseData.coupons, courseData.id]);

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
                image={`/images/courses/${courseData.imageName}`}
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
              {editButtons}
            </Box>
            <CardContent>
              <Typography component="p">{courseData.description}</Typography>
            </CardContent>
          </Card>
          <Box className={classes.coupons}>
            <Divider variant="middle" />
            {couponsHeader}
            {coupons}
          </Box>
        </Box>
      </Grid>
    ),
    [classes, courseData, couponsHeader, editButtons, coupons],
  );
}

// /* eslint-disable global-require */
// import Box from '@material-ui/core/Box';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import Divider from '@material-ui/core/Divider';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import concreteImage from 'Images/course-images/concrete.jpg';
// import stoneStairsImage from 'Images/course-images/stone-staircase.jpg';
// import udemyCourseImage from 'Images/course-images/udemy-course-image.jpg';
// import React, { ReactElement } from 'react';
// import { colors } from 'Theme';

// import Coupon from './Coupons/Coupon';
// import { CourseType } from './Types/index';

// /* TODO: this is hacky! Be able to upload image */
// const images = {
//   'udemy-course-image.jpg': udemyCourseImage,
//   'concrete.jpg': concreteImage,
//   'stone-staircase.jpg': stoneStairsImage,
// };

// const useStyles = makeStyles(() => ({
//   root: {
//     minWidth: 345,
//     minHeight: 300,
//     height: '100%',
//   },
//   header: {
//     height: '3em',
//     verticalAlign: 'top',
//     fontWeight: 700,
//     color: colors.darkTeal,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   coupons: {
//     width: '100%',
//     background: '#fff',
//   },
// }));

// type CourseProps = {
//   courseData: CourseType,
// };

// export default function Course({ courseData }: CourseProps): ReactElement {
//   const classes = useStyles();

//   return (

//     <Box display="flex" flexDirection="column" justifyContent="space-between">
//       <Card className={classes.root} square>
//         <CardActionArea href={courseData.link} target="_blank" rel="noreferrer">
//           <CardMedia
//             className={classes.media}
//             image={images[courseData.imageName]}
//             title="Course Image"
//           />
//           <CardHeader className={classes.header} title={courseData.name} />
//           <CardContent>
//             <Typography component="p">
//               {courseData.description}
//             </Typography>
//           </CardContent>
//         </CardActionArea>
//       </Card>
//       <Box className={classes.coupons}>
//         <Divider variant="middle" />
//         {courseData.bestCoupon
//           ? <Coupon couponData={courseData.bestCoupon} courseLink={courseData.link} />
//           : null}
//       </Box>
//     </Box>

//   );
// }
