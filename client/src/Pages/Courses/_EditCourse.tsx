export {};
// /* eslint-disable sonarjs/cognitive-complexity */

// import DateFnsUtils from '@date-io/date-fns';
// import Box from '@material-ui/core/Box';
// import Card from '@material-ui/core/Card';
// import Input from '@material-ui/core/Input';
// import makeStyles from '@material-ui/core/styles/makeStyles';
// import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// import { getFormData } from 'Helpers';
// import useLogger from 'Hooks'// import moment from 'moment';
// import AddButton from 'Pages/Common/AddButton';
// import EditButtons from 'Pages/Common/EditButtons';
// import {
//   addCourse,
//   deleteCourse,
//   editCourse,
// } from 'Pages/Courses/Redux/Actions';
// import { CouponType, CourseType } from 'Pages/Courses/Types';
// import React, { ReactElement, useCallback, useMemo, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { colors } from 'Theme';
// import _ from 'underscore';

// import EditCoupon from './Coupons/_EditCoupon';

// const useStyles = makeStyles(() => ({
//   formField: {
//     width: '100%',
//     marginTop: '15px',
//   },
//   notSavedCard: {
//     // TODO: something spiffier than a green background for a new course
//     // maybe a badge?
//     background: '#efe',
//   },
// }));

// export type CouponsById = Map<number, CouponType>;
// interface EditCourseProps {
//   courseData: CourseType;
//   courseIndex: number;
//   deleteCourseFromState: (number) => void;
// }

// // eslint-disable-next-line max-lines-per-function
// export default function EditCourse({
//   courseData,
//   courseIndex,
//   deleteCourseFromState,
// }: EditCourseProps): ReactElement {
//   const dispatch = useDispatch();
//   const classes = useStyles();

//   // negative id indicates not in the db. Just delete from state.
//   const notSaved = courseData.id < 0;

//   // for coupon management. Store by id for easy access
//   const couponsById: CouponsById = new Map();
//   if (courseData.coupons) {
//     courseData.coupons.forEach((c) => {
//       // make a copy of the coupon data so it doesn't mutate with changes to the map
//       if (c.id) couponsById.set(c.id, { ...c });
//     });
//   }

//   const [coupons, setCoupons] = useState<CouponsById>(couponsById);

//   const handleSubmit = useCallback(
//     (event) => {
//       event.preventDefault();

//       // gather data from the form
//       const formData = getFormData(event);

//       // remove coupon data
//       // TODO: this is pretty hacky; refactor to be more elegant
//       const relevantKeys = ['name', 'description', 'courseLink', 'imageName'];
//       const newCourseData = _.pick(formData, ...relevantKeys);

//       // had to name link "courseLink" so as not to get confused with coupon links
//       // rename back now
//       newCourseData.link = newCourseData.courseLink;
//       delete newCourseData.courseLink;

//       // gather coupon data from state
//       newCourseData.coupons = [];
//       for (const [id, couponData] of coupons) {
//         // remove id if it's negative, since new coupons don't need id
//         if (id < 0) delete couponData.id;
//         // update date to isoformat
//         couponData.utcExpirationISO = moment(
//           couponData.utcExpirationISO,
//         ).toISOString();
//         newCourseData.coupons.push(couponData);
//       }

//       if (notSaved) {
//         dispatch(addCourse(newCourseData));
//       } else {
//         dispatch(editCourse(newCourseData, courseData));
//       }
//     },
//     [dispatch, coupons, courseData, notSaved],
//   );

//   const handleDelete = useCallback(async () => {
//     if (notSaved) {
//       deleteCourseFromState(courseData.id);
//     } else {
//       // it's got to be deleted from the db
//       dispatch(deleteCourse(courseData.id));
//     }
//   }, [dispatch, notSaved, courseData.id, deleteCourseFromState]);

//   const addCoupon = useCallback(() => {
//     // add to the Map by ID. Use negative id to indicate new coupon.
//     const newId = 0 - (coupons.size + 1);
//     const newCoupon: CouponType = {
//       id: newId,
//       code: '',
//       link: '',
//       price: 9.99,
//       utcExpirationISO: moment(new Date()).toString(),
//     };
//     const newCoupons = new Map(coupons);
//     newCoupons.set(newId, newCoupon);
//     setCoupons(newCoupons);
//   }, [coupons]);

//   const deleteCoupon = useCallback(
//     (couponId) => {
//       // remove from coupon state
//       const newCoupons = new Map(coupons);
//       newCoupons.delete(couponId);
//       setCoupons(newCoupons);
//     },
//     [coupons],
//   );

//   const updateCoupon = useCallback(
//     (property, value, couponId) => {
//       // update state
//       const newCoupons = new Map(coupons);
//       const couponData = coupons.get(couponId);
//       if (!couponData) {
//         // something went wrong if the id is not in the coupons state
//         logToServer('critical', `found coupon id [${couponId}] not in state`);
//         return;
//       }
//       couponData[property] = value;
//       newCoupons.set(couponId, couponData);
//       setCoupons(newCoupons);
//     },
//     [coupons],
//   );

//   const couponElements: ReactElement[] = useMemo(() => {
//     const elements: ReactElement[] = [];
//     // when I use for ... in, typescript complains that id is a string(??)
//     for (const [id] of coupons) {
//       const couponData = coupons.get(id);

//       // to make TypeScript happy :-/
//       if (couponData !== undefined) {
//         elements.push(
//           <EditCoupon
//             key={id}
//             couponData={couponData}
//             deleteCoupon={deleteCoupon}
//             updateCoupon={updateCoupon}
//           />,
//         );
//       }
//     }
//     return elements;
//   }, [coupons, updateCoupon, deleteCoupon]);

//   const itemLabel = `Course ${courseIndex}`;

//   return useMemo(
//     () => (
//       <Card className={notSaved ? classes.notSavedCard : ''}>
//         <Box p={2}>
//           <form aria-label={itemLabel} onSubmit={handleSubmit}>
//             <Input type="hidden" name="id" value={courseData.id} />
//             <TextField
//               className={classes.formField}
//               multiline
//               required
//               name="name"
//               aria-label={`${itemLabel} name`}
//               label="Course name"
//               defaultValue={courseData.name}
//             />
//             <TextField
//               className={classes.formField}
//               multiline
//               required
//               name="description"
//               aria-label={`${itemLabel} description`}
//               label="Description"
//               defaultValue={courseData.description}
//             />
//             <TextField
//               className={classes.formField}
//               multiline
//               required
//               name="courseLink"
//               aria-label={`${itemLabel} link`}
//               label="Full Link"
//               defaultValue={courseData.link}
//             />

//             {/* TODO: allow uploading of image */}
//             <TextField
//               className={classes.formField}
//               required
//               name="imageName"
//               aria-label={`${itemLabel} image`}
//               label="Image name"
//               defaultValue={courseData.imageName}
//             />
//             <Box
//               style={{
//                 border: `2px ${colors.mediumTeal} solid`,
//                 marginTop: '10px',
//                 background: '#eeeeee',
//               }}
//             >
//               <Typography style={{ paddingLeft: 5 }}>Coupons</Typography>
//               <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                 {couponElements}
//               </MuiPickersUtilsProvider>
//               <AddButton onClick={addCoupon} size="small" itemString="Coupon" />
//             </Box>
//             <EditButtons
//               handleDelete={handleDelete}
//               itemString="course"
//               itemLabel={`Course ${courseIndex}`}
//             />
//           </form>
//         </Box>
//       </Card>
//     ),
//     [
//       addCoupon,
//       classes,
//       courseData,
//       couponElements,
//       handleDelete,
//       courseIndex,
//       handleSubmit,
//       itemLabel,
//       notSaved,
//     ],
//   );
// }
