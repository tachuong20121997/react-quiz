import React from 'react';
import { AnswerObject } from '../Utils';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions
}) => {
    return (
        <Wrapper>

            <p className='number'>
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {
                    answers.map((answer) => {
                        return <div key={answer}>
                            <ButtonWrapper
                                key={answer}
                                correct={userAnswer?.correctAnswer === answer}
                                userClicked={userAnswer?.answer === answer}
                            >
                                <button
                                    value={answer}
                                    disabled={!!userAnswer}
                                    onClick={callback}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                                </button>
                            </ButtonWrapper>
                        </div>
                    })
                }
            </div>
        </Wrapper>
    );
}

export default QuestionCard;