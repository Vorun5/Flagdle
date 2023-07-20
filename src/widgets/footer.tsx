import { Icons } from 'components/icons'

export const Footer = () => {
    return (
        <footer className="footer">
            Is just footer
            <span
                style={{
                    color: 'red',
                }}
            >
                <Icons icon="github" width="50px" height="50px" />
            </span>
        </footer>
    )
}
