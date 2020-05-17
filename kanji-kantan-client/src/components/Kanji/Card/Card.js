import React, { Component } from 'react';
import './Card.css';
import Button from '@material-ui/core/Button';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lockShowFull: false
        };
    }

    handleClick = () => {
        this.refs.Card.classList.toggle("backCard");
        this.refs.Card.classList.toggle("frontCard");
        this.refs.frontCard.classList.toggle("deactive");
        this.refs.frontCard.classList.toggle("active");
        this.refs.backCard.classList.toggle("deactive");
        this.refs.backCard.classList.toggle("active");
    }

    UNSAFE_componentWillReceiveProps = () => {
        if (
            (this.refs.Card.classList.value === "backCard" && !this.state.lockShowFull) ||
            (this.refs.Card.classList.value === "frontCard" && this.state.lockShowFull)
        ) {
            this.handleClick();
        }
    }

    handleChange = () => {
        let { lockShowFull } = this.state;
        if (this.refs.Card.classList.value === "frontCard" && !lockShowFull) {
            this.handleClick();
        }
        this.setState({
            lockShowFull: !lockShowFull
        })
    }
    render() {
        let { data } = this.props;
        let { lockShowFull } = this.state;
        return (
            <div className="cartContainer">
                <div className="buttonOver">
                    <Button
                        variant="outlined"
                        color={lockShowFull ? "primary" : "secondary"}
                        onClick={() => this.handleChange()}
                        className="button"
                    >
                        Alway display full content: {lockShowFull ? "enable" : "disable"}
                    </Button>
                </div>
                <div
                    ref="Card"
                    className="frontCard"
                    onClick={() => this.handleClick()}>
                    <div
                        ref="frontCard"
                        className="active"
                    >
                        <div className="frontKanji">{data.kanji}</div>
                    </div>
                    <div
                        ref="backCard"
                        className="back deactive"
                    >
                        <div className="backKanji">{data.kanji}</div>
                        <div className="backRefer">({data.hanviet})</div>
                        <div className="backYomi">{data.onyomi}</div>
                        <div className="backYomi">{data.kunyomi}</div>
                        <div className="backContent">{data.meaning}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;