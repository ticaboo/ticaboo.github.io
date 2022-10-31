import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AtScheduleIcon,
  AtStartIcon,
  IntervalIcon,
  AtEndIcon
} from '../../icons';

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label }
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className = ' tab-list-active';
    }

    return (
      <div
        className={'flex justify-center furniture-border ' + className}
        onClick={onClick}>
        {label === 'schedule' && <AtScheduleIcon />}
        {label === 'at start' && <AtStartIcon />}
        {label === 'interval' && <IntervalIcon />}
        {label === 'at finish' && <AtEndIcon />}
      </div>
    );
  }
}

export default Tab;
