import { PureComponent } from 'react';

export default class LifeCycle extends PureComponent {
  componentDidMount() {
    const { onMount } = this.props;
    if (typeof onMount === 'function') onMount.call(this, this);
  }

  componentWillUnmount() {
    const { onUnmount } = this.props;
    if (typeof onUnmount === 'function') onUnmount.call(this, this);
  }

  render() {
    return null;
  }
}
