import { IconButton } from 'components/icon-button'
import { Modal } from 'components/modal/modal'
import { useGameStore } from 'lib/stores/game'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const GameEndBtn = () => {
  const { t } = useTranslation()
  const { endGame } = useGameStore()
  const [opened, setOpened] = useState(false)

  return (
    <>
      <IconButton icon="close" onClick={() => setOpened(true)} />
      <Modal opened={opened} onClose={() => setOpened(!opened)}>
        <div className="game-end-modal">
          <span className="game-end-modal__title">{t('finishTheGame.title')}</span>
          <span className="game-end-modal__description">{t('finishTheGame.description')}</span>
          <div className="game-end-modal__actions">
            <button type="button" onClick={() => setOpened(false)} className="button">
              {t('finishTheGame.no')}
            </button>
            <button type="button" onClick={endGame} className="button action-btn">
              {t('finishTheGame.yes')}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
