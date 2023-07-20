import './app.css'
import { Header } from 'widgets/header'
import { Footer } from 'widgets/footer'
import { useEffect } from 'react'
import { useCountriesStore } from 'lib/stores/countries'
import { Game } from 'components/game'
import { useGameStore } from 'lib/stores/game'

// Нужно угадать флаги всех стран как можно быстрее

export const App = () => {
    const { countries, fetchCountries } = useCountriesStore()
    useEffect(() => {
        fetchCountries()
    }, [fetchCountries])

    const { startGame, gameIsOn } = useGameStore()

    return (
        <div className="app-container">
            <Header />
            <main className="content">
                {countries === null ? (
                    <b>Failder to fetch countries</b>
                ) : countries.length === 0 ? (
                    <b>Loading</b>
                ) : !gameIsOn ? (
                    <div className="start-game game">
                        <h2 className="start-game__title">Правила игры</h2>
                        <ul className="start-game__rules">
                            <li className="start-game__rule">
                                Вам нужно угадать как можно больше флагов стран за более короткое
                                время
                            </li>
                            <li className="start-game__rule">
                                Вы можете пропустить флаг, если не знаете его
                            </li>
                        </ul>
                        <button
                            className="button start-game__bth"
                            onClick={() => startGame(countries)}
                        >
                            Начать игру
                        </button>
                    </div>
                ) : (
                    <Game />
                )}
            </main>
            <Footer />
        </div>
    )
}
