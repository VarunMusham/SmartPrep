import { useState } from "react"

const QuestionBlock = (props) => {

    const [clickedOption, setClickedOption] = useState("z");
    const [alreadyClicked, setAlreadyClicked] = useState(false);

    const handleOptionClick = (key) => {
        setClickedOption(key);
        if (key === props.correctAnswer && alreadyClicked === false) {
            props.scoreIncrementFunction();
        }
        setAlreadyClicked(true);
    };

    const getOptionColourClass = (optionKey) => {
        if (!clickedOption) {
            return ""; // No option clicked yet
        }
        if (optionKey === clickedOption) {
            return optionKey === props.correctAnswer ? "optionColourGreen" : "optionColourRed";
        }
        return "";
    };

    const gethoverAnimation = () => {
        if (alreadyClicked) return "";
        return "hoverAnimation";
    }

    const onClickText = () => {
        if (alreadyClicked)
            return (clickedOption === props.correctAnswer) ? "correct" : "incorrect";
        return ""; // default
    };

    return (
        <div className="questionBlock">
            <div className="question">
                {props.question}
            </div>
            
            <div className="optionSection">
                <div className={`option1 ${getOptionColourClass("a")} ${ gethoverAnimation() }`} onClick={() => { handleOptionClick("a") }}>a. {props.a}</div>
                <div className={`option1 ${getOptionColourClass("b")} ${ gethoverAnimation() }`} onClick={() => { handleOptionClick("b") }}>b. {props.b}</div>
                <div className={`option1 ${getOptionColourClass("c")} ${ gethoverAnimation() }`} onClick={() => { handleOptionClick("c") }}>c. {props.c}</div>
                <div className={`option1 ${getOptionColourClass("d")} ${ gethoverAnimation() }`} onClick={() => { handleOptionClick("d") }}>d. {props.d}</div>
            </div>

            <div className={`onClickText ${onClickText()}`}>
                {
                    onClickText()
                }
            </div>
        </div>
    )
}

export default QuestionBlock;