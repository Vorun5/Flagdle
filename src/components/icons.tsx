interface IconsProps {
  icon: 'github' | 'arrow-r' | 'close'
  width?: string
  height?: string
  color?: string
}

export const Icons = ({ icon, width, height, color }: IconsProps) => {
  const styles = {
    width: width || '24px',
    height: height || '24px',
    color: color || 'currentColor',
  }

  switch (icon) {
    case 'github':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={styles.width}
          height={styles.height}
          viewBox="0 0 24 24"
        >
          <path
            fill={styles.color}
            fillRule="evenodd"
            d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.536 10.536 0 0 1 12 6.32a10.49 10.49 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"
          ></path>
        </svg>
      )
    case 'arrow-r':
      return (
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          width={styles.width}
          height={styles.height}
          viewBox="0 0 16 16"
        >
          <title>Trade_Icons</title>
          <polygon
            fill={styles.color}
            fillRule="evenodd"
            points="4.38 12.19 8.57 8 4.38 3.81 5.91 2.29 11.62 8 5.91 13.71 4.38 12.19"
          />
        </svg>
      )
    case 'close':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={styles.width}
          height={styles.height}
          viewBox="0 0 24 24"
        >
          <path
            fill={styles.color}
            fillRule="evenodd"
            d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
          ></path>
        </svg>
      )
    default:
      return <></>
  }
}
