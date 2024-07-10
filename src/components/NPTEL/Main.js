import React, { useState, useEffect } from "react";
import supabase from './supabaseClient';
import QuestionBlock from "./QuestionBlock.js";
import RandomBackgroundComponent from "./RandomBackgroundComponent.js";
import LoadingScreen from "./LoadingScreen.js";

const Main = () => {
    const [score, setScore] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading

    useEffect(() => {
        const fetchQuestions = async () => {
            let { data: questions, error } = await supabase
                .from('questions')
                .select('*');

            if (error) {
                console.error("Error fetching questions:", error);
            } else {
                const shuffledData = [...questions].sort(() => Math.random() - 0.5);
                setShuffledQuestions(shuffledData);
            }
            setLoading(false); // Set loading to false after data is fetched
        };

        fetchQuestions();
    }, []);

    const incrementScore = () => {
        setScore(score + 1);
    };

    if (loading) {
        return <LoadingScreen />; // Display loading screen component while fetching data
    }

    return (
        <div className="wrapper">
            <RandomBackgroundComponent />
            <div className="score">Score: {score} / 120</div>
            {
                shuffledQuestions.map((eachQuestion, index) => (
                    <QuestionBlock
                        key={index}
                        question={(index + 1) + ". " + eachQuestion["question"]}
                        a={eachQuestion["a"]}
                        b={eachQuestion["b"]}
                        c={eachQuestion["c"]}
                        d={eachQuestion["d"]}
                        correctAnswer={eachQuestion["answer"]}
                        scoreIncrementFunction={incrementScore}
                    />
                ))
            }
        </div>
    );
}

export default Main;
