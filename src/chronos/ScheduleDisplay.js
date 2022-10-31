import React from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AtScheduleIcon } from './icons';

const ScheduleDisplay = ({ timer }) => {
  const { watch } = useFormContext();
  const schedule = watch('schedule');

  const hasSchedule = () => {
    //console.log(timer.schedule);
    if (!schedule) return false;
    if (schedule.h !== '' && schedule.m !== '' && schedule.s !== '')
      return false;
    return true;
  };

  return (
    <>
      <motion.div
        title=""
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}>
        <div className=" flex justify-start pl-3 align-middle">
          {schedule.h}: {schedule.m}
          <span className="pl-1">
            <AtScheduleIcon xy="4" />
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default ScheduleDisplay;
