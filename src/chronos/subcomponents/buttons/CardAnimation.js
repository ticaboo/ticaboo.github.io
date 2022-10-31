import React from 'react';
import { motion } from 'framer-motion';

const CardAnimation = ({
  clickHandler,
  children,
  title,
  type = 'Card'
}) => {
  return (
<motion.div
    className="container"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20
    }}
  >
      {children}
    </motion.div>
  );
};

export default CardAnimation;
