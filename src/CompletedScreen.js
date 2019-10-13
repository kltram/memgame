import React from 'react';
export default class CompletedScreen extends React.Component {
  constructor(props) {
      super(props);
      this.name = React.createRef();
      this.username = React.createRef();
      this.state = {

      };
    }

  clicked(){
    if(this.name.current.value !== '' && this.username.current.value !== '')
    {
      this.props.submitClick(this.name.current.value, this.username.current.value);
    }else{
      alert("Name and user name is empty!!!");
    }
  }
  render(){
    return (
      <div className="completedScreen">
        <div className="scorelabel">Your Score: {this.props.score}</div>
        <input ref={this.name} className="yrName" placeholder="Enter your name:"/>
        <input ref={this.username} className="yrName" placeholder="Enter user name:"/>
        <button className="submt" onClick={() => this.clicked()}>Ok</button>
      </div>
    )
  }
}
