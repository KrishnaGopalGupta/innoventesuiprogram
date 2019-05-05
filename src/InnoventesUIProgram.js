import React from 'react';
import './Innovent.css';
const Data = {
    rooms: 'roomCount',
    adult: 'adultCount',
    children: 'childrenCount'
}

const Icon = {
    rooms: 'fa fa-bed',
    adult: 'fa fa-user',
    children: 'fa fa-child'
}

export default class InnoventesUIProgram extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCount: 1,
            adultCount: 1,
            childrenCount: 0,
            isDisable: false
        };
    }

    incrementitem = (key) => {
        if (key === 'roomCount') {
            if ((this.state.roomCount + 1) <= 5) {
                this.setState({ roomCount: this.state.roomCount + 1 })
            } 
        } else if (key === 'adultCount') {
            let canIncrementAdult = ((this.state.adultCount + 1) + (this.state.childrenCount)) <= (this.state.roomCount * 4);
            if (canIncrementAdult) {
                this.setState({ adultCount: this.state.adultCount + 1 })
            }
            else if (this.state.roomCount < 5) {
                this.setState({
                    adultCount: this.state.adultCount + 1,
                    roomCount: this.state.roomCount + 1
                })
            }
        } else if (key === 'childrenCount') {
            let canIncrementchild = ((this.state.adultCount) + (this.state.childrenCount + 1)) <= (this.state.roomCount * 4);
            if (canIncrementchild) {
                this.setState({ childrenCount: this.state.childrenCount + 1 })
            }
            else if (this.state.roomCount < 5 && this.state.adultCount > 0) {
                this.setState({
                    childrenCount: this.state.childrenCount + 1, roomCount: this.state.roomCount + 1
                });
            }
        }    }

    decrement = (key) => {
        if (key === 'roomCount') {
            let canAdOrChdecrement = ((this.state.adultCount) + (this.state.childrenCount + 1)) > (this.state.roomCount - 1 * 4);
            if (canAdOrChdecrement) {
                let childrenCount = this.state.childrenCount;
                let adultCount = this.state.adultCount;
                while (childrenCount + adultCount > (this.state.roomCount - 1) * 4) {
                    if (childrenCount === 0) {
                        adultCount -= 1;
                    } else {
                        childrenCount -= 1;
                    }
                }
                this.setState({ childrenCount: childrenCount, adultCount, roomCount: this.state.roomCount - 1 });
            }
            else if (this.state.roomCount === 1) {
                this.setState({ [key + 'IncreDisabled']: true })
            }
                }
        this.setState({
            [key]: this.state[key] - 1
        });    }

    checkDisabled(val) {
        if ((val === 'roomCount' || val === 'adultCount') && this.state[val] === 1) {
            return true;
        }
        else if ((val === 'childrenCount') && this.state[val] === 0) {
            return true;
        }
        else
            return false;
    }

    render() {
        const customeButtons = Object.keys(Data);

       
        
    return (
            <div className="container main-container-spacing">
                <div className="">
                    <h3> <span className="fa fa-users" className="heading-style">Choose number of <b>people</b> </span>  </h3>

                    <div className="data-display">
                        {customeButtons.map((key) => {
                            return (<div className="data-style display-5" >
                            <div>
                                <span className="font-style-look"><i className={Icon[key]} aria-hidden="true"  ></i> {key} </span>
                              <span className="data-output-style">
                                    <button onClick={() => this.decrement(Data[key])} className="Button-right-style" disabled={this.checkDisabled(Data[key])}><span>-</span> </button>
                                   <label className="output-result"> {this.state[Data[key]]}</label>
                                    <button onClick={() => this.incrementitem(Data[key])} className="Button-left-style" ><label>+</label> </button>
                             
                                </span>

                                </div>
                                <hr/>
                                    </div>
                            
                            )
                        })

                    
                        }
                        

                    </div>
                </div>

            </div>

        )
    }
}
