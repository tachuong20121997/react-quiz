export const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
}

export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string
}; 