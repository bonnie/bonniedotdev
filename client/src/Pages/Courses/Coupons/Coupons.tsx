import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import urls from 'Constants/urls';
import useSelector from 'Hooks/useTypedSelector';
import PageTitleWithAdd from 'Pages/Common/PageTitleWithAdd';
import React, { ReactElement, useMemo } from 'react';
import { Course } from 'Types';

import Coupon from './Coupon';
import EditCouponFields from './EditCouponFields';

interface CouponsProps {
  courseData: Course;
}

export default function Coupons({
  courseData,
}: CouponsProps): ReactElement | null {
  const user = useSelector((state) => state.user);

  const couponsHeader = useMemo(() => {
    if (!user) return null;
    return (
      <Box m={2}>
        <PageTitleWithAdd
          title="Coupons"
          variant="h5"
          itemEndpoint={urls.couponURL}
          itemString="Coupon"
          ItemFieldsComponent={<EditCouponFields courseId={courseData.id} />}
        />
      </Box>
    );
  }, [user, courseData.id]);

  const coupons = useMemo(() => {
    if (user && courseData.coupons) {
      return courseData.coupons.map((couponData) => (
        <Coupon
          key={couponData.id}
          couponData={couponData}
          courseId={courseData.id}
        />
      ));
    }
    if (!user && courseData.bestCoupon) {
      return (
        <Coupon couponData={courseData.bestCoupon} courseId={courseData.id} />
      );
    }
    return null;
  }, [user, courseData]);

  return (
    <Box style={{ width: '100%', background: '#fff' }}>
      <Divider variant="middle" />
      {couponsHeader}
      {coupons}
    </Box>
  );
}
