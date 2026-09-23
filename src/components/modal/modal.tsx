import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './modal.css'

type ModalProps = {
  opened: boolean
  onClose: () => void
  label: string
  children: ReactNode
}

export const Modal = ({ opened, onClose, label, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (opened && !dialog.open) dialog.showModal()
    if (!opened && dialog.open) dialog.close()
  }, [opened])

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal"
      aria-label={label}
      onClose={onClose}
      onClick={event => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <div className="modal__content">{children}</div>
    </dialog>,
    document.body,
  )
}
