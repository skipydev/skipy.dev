import { CONTACTS } from '../data/content'

const footerContacts = CONTACTS.filter(c => c.inFooter)

export function Footer() {
	return (
		<footer className='footer'>
			<div className='footer-inner'>
				<span className='footer-text'>
					© 2026 skipy.dev — built with React, Vite &amp; SCSS
				</span>

				<div className='footer-links'>
					{footerContacts.map(contact => (
						<a
							key={contact.id}
							href={contact.url}
							target='_blank'
							rel='noopener noreferrer'
							aria-label={contact.name}
							className='footer-icon magnetic'
						>
							<contact.Icon />
						</a>
					))}
				</div>

			</div>
		</footer>
	)
}
