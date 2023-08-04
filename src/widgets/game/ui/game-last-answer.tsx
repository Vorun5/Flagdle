import { useGameStore } from 'lib/stores/game'

export const GameLastAnswer = () => {
    const { lastAnswer } = useGameStore()

    if (!lastAnswer) return <></>

    return (
        <div>
            <span className="answer">
                Последний ответ:{' '}
                <span className={lastAnswer.status === 'right' ? 'answer__right' : 'answer__wrong'}>
                    {lastAnswer.status === 'right' ? 'угадал' : 'не угадал'}
                </span>
            </span>
            <span className="answer">
                Мой ответ:{' '}
                <span className="country">
                    {lastAnswer.answer.name.common}
                    <div className="country__flag">
                        <img
                            src={lastAnswer.answer.flags.svg}
                            alt={lastAnswer.answer.name.common}
                        />
                    </div>
                </span>
            </span>
            {lastAnswer.status === 'wrong' && (
                <span className="answer">
                    Правильный ответ:{' '}
                    <span className="country">
                        {lastAnswer.correctAnswer.name.common}
                        <div className="country__flag">
                            <img
                                src={lastAnswer.correctAnswer.flags.svg}
                                alt={lastAnswer.correctAnswer.name.common}
                            />
                        </div>
                    </span>
                </span>
            )}
        </div>
    )
}
