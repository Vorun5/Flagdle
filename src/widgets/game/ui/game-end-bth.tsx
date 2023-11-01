import { IconButton } from 'components/icon-button'
import { Modal } from 'components/modal/modal'
import { useGameStore } from 'lib/stores/game'
import { useState } from 'react'

export const GameEndBth = () => {
  const { endGame } = useGameStore()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <IconButton icon="close" onClick={() => setOpened(true)} />
      <Modal opened={opened} onClose={() => setOpened(!opened)}>
        <div className="game-end-modal">
          <span className="game-end-modal__title">Вы точно хотите закончить партию?</span>
          <span className="game-end-modal__description">
            Вы ещё не отгадали все флаги и можете улучшить результат!
          </span>
          <div className="game-end-modal__actions">
            <button type="button" onClick={() => setOpened(false)} className="button">
              Отмена
            </button>
            <button type="button" onClick={endGame} className="button game-end-modal__cancel-bth">
              Закончить
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
