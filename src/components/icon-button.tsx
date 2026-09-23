import { Icons, IconsProps } from './icons'

type IconButtonProps = {
  onClick?: () => void
  className?: string
  'aria-label': string
} & Pick<IconsProps, 'color' | 'icon'>

export const IconButton = (props: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      aria-label={props['aria-label']}
      className={`icon-button ${props.className ?? ''}`}
    >
      <Icons width="30px" height="30px" {...props} />
    </button>
  )
}
