import { useEffect, useRef } from 'react'

export const useKeydown = (key: string, callback: (event: Event) => void) => {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        const handler: EventListener = (event) => {
            if ((event as KeyboardEvent).key === key) {
                callbackRef.current(event)
            }
        }

        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [key])
}
