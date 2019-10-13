import React from 'react';
export default class Card extends React.Component {
  constructor(props) {
      super(props);
      this.state = {

      };
    }
  clicked(framework){
    this.props.click(framework);
  }
  render(){
    return (
      <div className={"card" + (!this.props.close ? ' opened' : '') + (this.props.complete ? ' matched' : '')} onClick={() => this.clicked(this.props.framework)}>
        <div className="front">
          ?
        </div>
        <div className="back">

          <div style={{height: '100%',borderRadius: '10px',background:this.props.framework}}/>
        </div>
      </div>
    )
  }
}
