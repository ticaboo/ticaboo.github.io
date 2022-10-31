import React from 'react';
import useCollapse from 'react-collapsed';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { SettingsIcon } from '../icons';
import ScheduleDisplay from '../ScheduleDisplay';

/*
Panelordion -like an accordion but simpler - a single collapsible, expandable panel.

https://blog.logrocket.com/create-collapsible-react-components-react-collapsed/

driven by hasInterval:
false:
    V interval
true
    ^ [interval edit]  [x] alert
    H : M : S          [x] announce

*/

const Collapse = ({ children, titleChildren }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible">
      <div className="pl-2  pr-2 pt-1 pb-1" {...getToggleProps()}>
        <div className="flex justify-between text-sm furniture mt-1">
          <div className="">
            <ScheduleDisplay />
          </div>
          <motion.div
            title=""
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}>
            <div className="flex items-start mt-1">
              {isExpanded && <FiChevronUp className=" text-1xl" />}
              {!isExpanded && <FiChevronDown className=" text-1xl" />}
              <span>
                {' '}
                <SettingsIcon />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Collapse;
