import React,{  Fragment } from 'react';

import Card from './Card';
import CompletedScreen from './CompletedScreen';
export default class MemoryGame extends React.Component {
  constructor(props) {
      super(props);
      this.count = 0;
      this.completeCount = 0;
      this.state = {
        frameworks: ['red','orange','green','blue','black','lightgreen','cyan','#9d9d9d'],
        duplicatedFrameworks: [],
        randomizedFrameworks: [],
        finalizedFrameworks: [],
        openedFrameworks: [],
        score: 0,
        completed: 0
      };
      this.start();
    }
    handleClick(name,index){
      if(this.state.openedFrameworks.length === 2){
        setTimeout(() => {
          this.check();
        },750);
      }else {
        let framework = {
          name,
          index
        };
        let finalizedFrameworks = this.state.finalizedFrameworks;
        let frameworks = this.state.openedFrameworks;
        finalizedFrameworks[index].close = false;
        frameworks.push(framework);
        this.setState({
          openedFrameworks: frameworks,
          finalizedFrameworks: finalizedFrameworks
        });
        if(this.state.openedFrameworks.length === 2){
          setTimeout(() => {
            this.check();
          },750);
        }
      }
    }
    check(){
      let finalizedFrameworks = this.state.finalizedFrameworks;
      if(this.state.openedFrameworks.length !== 0){
          if((this.state.openedFrameworks[0].name === this.state.openedFrameworks[1].name) && (this.state.openedFrameworks[0].index !== this.state.openedFrameworks[1].index)){
            finalizedFrameworks[this.state.openedFrameworks[0].index].complete = true;
            finalizedFrameworks[this.state.openedFrameworks[1].index].complete = true;
            this.count += 5;
            this.completeCount += 1;
          }else {
            finalizedFrameworks[this.state.openedFrameworks[0].index].close = true;
            finalizedFrameworks[this.state.openedFrameworks[1].index].close = true;
            this.count -= 1;
          }
          this.setState({
            finalizedFrameworks,
            openedFrameworks: [],
            score: this.count,
            completed: this.completeCount
          });
        }
    }
    start(){
      let finalizedFrameworks = [];
      this.state.duplicatedFrameworks = this.state.frameworks.concat(this.state.frameworks);
      this.state.randomizedFrameworks = this.shuffle(this.state.duplicatedFrameworks);
      this.state.randomizedFrameworks.map((name,index) => {
        finalizedFrameworks.push({
          name,
          close: true,
          complete: false,
          fail: false
        })
      });
      this.state.finalizedFrameworks = finalizedFrameworks;
    }
    shuffle(array){
      let currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    saveInDB(name,username){
      console.log(name, username);
    }
    render(){
      return (
        <Fragment>
        <span><b>High Score: {this.state.score}</b></span>
        <div className="playground">
            {
              this.state.finalizedFrameworks.map((framework, index) => {
                return <Card key={index} framework={framework.name} click={() => {this.handleClick(framework.name,index)}} close={framework.close} complete={framework.complete}/>
              })
            }
            {this.state.completed === 8 ? <CompletedScreen score={this.state.score} submitClick={this.saveInDB}/> : null}
        </div>
        </Fragment>
      )
    }
}
