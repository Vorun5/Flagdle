import { IconButton } from 'components/icon-button'
import { Modal } from 'components/modal/modal'
import { useGameStore } from 'lib/stores/game'
import { useState } from 'react'

export const GameEndBtn = () => {
  const { endGame } = useGameStore()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <IconButton icon="close" onClick={() => setOpened(true)} />
      <Modal opened={opened} onClose={() => setOpened(!opened)}>
        <div className="game-end-modal">
          <span className="game-end-modal__title">Вы точно хотите закончить партию?</span>
          <span className="game-end-modal__description">
            Вы ещё не отгадали все флаги и можете улучшить свой результат!
          </span>
          <div className="game-end-modal__actions">
            <button type="button" onClick={() => setOpened(false)} className="button">
              Продолжить
            </button>
            <button type="button" onClick={endGame} className="button action-btn">
              Закончить партию
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
