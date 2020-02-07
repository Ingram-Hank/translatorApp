import React from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            color: props.color,
            displayColorPicker: "none",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = ()=> {
        let {displayColorPicker, color} = this.state;
        displayColorPicker = displayColorPicker === "none" ? "block" : "none";
        this.setState({displayColorPicker})
        if(displayColorPicker){
            this.props.updateColor(color)
        }
    }

    handleChange = (value) => {
        let color = value.hex;
        this.setState({color});
        this.props.updateColor(color)
    }
    
    componentDidUpdate(preProps) {
        if(preProps.color !== this.props.color){
            this.setState({color: this.props.color});
        }
    }
    
    render (){
        let {color, displayColorPicker} = this.state;
        return (
            <React.Fragment>
                <div className="minicolors minicolors-theme-default" onClick={this.handleClick}>
                    <input type="text" className="minicolors-input" size="7" />
                    <span className="minicolors-swatch minicolors-sprite">
                        <span className="minicolors-swatch-color" style={{background: color}}></span>
                    </span>
                </div>
                {displayColorPicker==="block" &&
                    <div style={{position:"absolute", zIndex: 66}}>
                        <SketchPicker color={this.state.color}  onChange={this.handleChange} />
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default ColorPicker;