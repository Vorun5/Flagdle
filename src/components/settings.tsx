import { useState } from 'react'
import { IconButton } from './icon-button'
import { Modal } from './modal/modal'

export const Settings = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <IconButton icon="settings" onClick={() => setOpened(true)} />
      <Modal opened={opened} onClose={() => setOpened(false)}>
        В рот
      </Modal>
    </>
  )
}
