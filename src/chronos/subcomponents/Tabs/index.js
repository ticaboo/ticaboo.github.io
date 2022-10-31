import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[2].props.label
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab }
    } = this;

    return (
      <div className="tabs">
        <div className="tab-list grid grid-cols-4 gap-0 content-centre  ">
          {children.map((child) => {
            const { label, title } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                title={title}
                onClick={onClickTabItem}
              />
            );
          })}
        </div>
        <div className="tab-content pb-2">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
