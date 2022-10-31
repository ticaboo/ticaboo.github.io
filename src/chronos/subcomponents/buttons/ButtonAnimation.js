import React from 'react';
import { motion } from 'framer-motion';

/*
 aim: have a single place that sets the animation for all/most buttons.
 works, but could be a more elagant way.
 one option: pass in the icon as a child. along with click and title -thats the only difference between buttons.
 less favoured option: pojo with config.

 Note: must set type to submit for submit buttons in forms.
*/

const ButtonAnimation = ({
  clickHandler,
  children,
  title,
  type = 'button'
}) => {
  return (
    <motion.button
      type={type}
      title={title}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={clickHandler}>
      {children}
    </motion.button>
  );
};

export default ButtonAnimation;
