import { ReactNode, memo } from 'react'
import { Portal } from 'components/portal'
import { useModalMount } from './use-modal-mount'
import { ModalLayout } from 'components/moda-layout/modal-layout'

interface ModalProps {
    opened: boolean
    onClose: () => void
    children: ReactNode
}

export const Modal = memo(({ opened, onClose, children }: ModalProps) => {
    const { mounted } = useModalMount({ opened })

    if (!mounted) {
        return null
    }

    return (
        <Portal>
            <ModalLayout onClose={onClose} opened={opened}>
                {children}
            </ModalLayout>
        </Portal>
    )
})
