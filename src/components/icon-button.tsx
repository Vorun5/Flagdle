import { Icons, IconsProps } from './icons'

type IconButtonProps = {
  onClick?: () => void
  className?: string
} & Pick<IconsProps, 'color' | 'icon'>

export const IconButton = (props: IconButtonProps) => {
  return (
    <button type="button" onClick={props.onClick} className={`icon-button ${props.className}`}>
      <Icons width="30px" height="30px" {...props} />
    </button>
  )
}
