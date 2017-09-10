import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import classnames from 'classnames';
import './toolbar.scss';

export class Toolbar extends React.PureComponent {
  static propTypes = {
    alternateLeftItems: PropTypes.node,
    alternateRightItems: PropTypes.node,
    className: PropTypes.string,
    isAlternate: PropTypes.bool,
    leftItems: PropTypes.node,
    position: PropTypes.oneOf(['bottom', 'top']),
    rightItems: PropTypes.node,
    style: PropTypes.object,
  }

  static defaultProps = {
    alternateLeftItems: [],
    alternateRightItems: [],
    leftItems: [],
    rightItems: [],
  }

  render() {
    return h('.toolbar', {
      className: this.getClassName(),
      style: this.props.style,
    }, [
      h('.toolbar__left', {}, this.getLeftItems()),
      h('.toolbar__right', {}, this.getRightItems()),
    ]);
  }

  getClassName() {
    return classnames({
      'toolbar--bottom': this.props.position === 'bottom',
      'toolbar--top': this.props.position !== 'bottom',
      'toolbar--alternate': this.props.isAlternate,
    }, this.props.className);
  }

  getLeftItems() {
    return this.props.isAlternate
      ? this.props.alternateLeftItems
      : this.props.leftItems;
  }

  getRightItems() {
    return this.props.isAlternate
      ? this.props.alternateRightItems
      : this.props.rightItems;
  }
}
