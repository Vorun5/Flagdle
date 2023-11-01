import { Icons } from 'components/icons'
import './footer.css'

export const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <span className="created-with-love">
          Created with love by{' '}
          <a
            className="created-with-love__creator"
            href="https://www.twitch.tv/vorun5"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vorun5
          </a>{' '}
          👻
        </span>
        <a
          className="support-project"
          href="https://boosty.to/vorun5/donate"
          target="_blank"
          rel="noopener noreferrer"
        >
          Support project 🐱‍👓
        </a>
      </div>
      <div className="footer__contacts">
        <a href="https://github.com/Vorun5/Flagdle" target="_blank" rel="noopener noreferrer">
          <Icons icon="github" width="30px" height="30px" />
        </a>
      </div>
    </footer>
  )
}
