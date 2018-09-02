
// class Message extends Component {
//   static defaultProps = {
//     type: 'loading',
//     text: '',
//   }

//   msg = {
//     loading: {
//       cls: 'alert-warning',
//       icon: <i className="fa fa-spinner fa-pulse"></i>,
//       text: _TRANS('all', 'loading') + '...'
//     },
//     danger: {
//       cls: 'alert-danger',
//       icon: <i className="fa fa-times"></i>,
//     },
//     success: {
//       cls: 'alert-success',
//       icon: <i className="fa fa-check"></i>,
//     },
//   };

//   render() {
//     let msg = this.msg[this.props.type];
//     if (this.props.text) {
//       msg.text = this.props.text;
//     }
//     return (
//       <div className={"loader alert " + msg.cls}>
//         <div className="loader__status">
//           <div className="loader__status__icon">
//             {msg.icon}
//           </div>
//         </div>
//         <div className="loader__text">
//           {msg.text}
//         </div>
//       </div>
//     );
//   }
// }