import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import { classes } from 'common/util';
import { CONFIRM_TIMEOUT } from 'common/constants';
import { Ellipsis } from 'components';
import styles from './Button.module.scss';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirming: false,
    };

    this.timeout = null;
  }

  componentWillUnmount() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  render() {
    let { className, children, to, href, onClick, icon, reverse, selected, disabled, primary, active, confirmNeeded, inProgress, ...rest } = this.props;
    const { confirming } = this.state;

    if (confirmNeeded) {
      if (confirming) {
        className = classes(styles.confirming, className);
        icon = faExclamationCircle;
        children = <Ellipsis key="text">Click to Confirm</Ellipsis>;
        const onClickOriginal = onClick;
        onClick = () => {
          if (onClickOriginal) onClickOriginal();
          if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = undefined;
            this.setState({ confirming: false });
          }
        };
      } else {
        to = null;
        href = null;
        onClick = () => {
          this.setState({ confirming: true });
          this.timeout = window.setTimeout(() => {
            this.timeout = undefined;
            this.setState({ confirming: false });
          }, CONFIRM_TIMEOUT);
        };
      }
    }

    const iconOnly = !children;
    const { rel, target, ...elementProps } = rest;
    const content = [
      icon && (
        typeof icon === 'string' ?
          <div className={classes(styles.icon, styles.image)} key="icon"
               style={{ backgroundImage: `url(${icon})` }} /> :
          <FontAwesomeIcon className={styles.icon} fixedWidth icon={inProgress ? faSpinner : icon} spin={inProgress}
                           key="icon" />
      ),
      children,
    ];

    const sharedProps = {
      ...elementProps,
      className: classes(styles.button, reverse && styles.reverse, selected && styles.selected, disabled && styles.disabled, primary && styles.primary, active && styles.active, iconOnly && styles.icon_only, className),
      onClick: disabled ? null : onClick,
    };

    if (to) {
      return (
        <Link {...sharedProps} to={disabled ? null : to}>
          {content}
        </Link>
      );
    }

    if (href) {
      return (
        <a {...sharedProps} href={disabled ? null : href} rel={rel || 'noopener noreferrer'} target={target || '_blank'}>
          {content}
        </a>
      );
    }

    return (
      <div {...sharedProps}>
        {content}
      </div>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  reverse: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  active: PropTypes.bool,
  confirmNeeded: PropTypes.bool,
  inProgress: PropTypes.bool,
};

Button.defaultProps = {
  reverse: false,
  selected: false,
  disabled: false,
  primary: false,
  active: false,
  confirmNeeded: false,
  inProgress: false,
};

export default Button;

