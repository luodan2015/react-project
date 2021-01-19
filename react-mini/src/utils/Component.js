// export default class Component {
//   static isReactComponent = {};
//   constructor(props) {
//     this.props = props;
//   }
// }

export default function Component(props) {
  this.props = props;
}

Component.prototype.isReactComponent = {};
