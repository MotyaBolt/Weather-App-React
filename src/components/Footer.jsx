import React from 'react';
import './styles/Footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-link">Created by <a href="https://github.com/MotyaBolt" rel="noreferrer" target="_blank" className="profile-link">Matvey Boltach</a></p>
            <div className="icons">
                <a className="link" rel="noreferrer" target="_blank" href="https://vk.com/lupapupa0505"><i className="fab fa-vk"></i></a>
                <a className="link" rel="noreferrer" target="_blank" href="https://t.me/matv_money"><i className="fab fa-telegram"></i></a>
                <a className="link" rel="noreferrer" target="_blank" href="https://github.com/MotyaBolt"><i className="fab fa-github"></i></a>
                <a className="link" rel="noreferrer" target="_blank" href="https://codepen.io/motyabolt"><i className="fab fa-codepen"></i></a>
                <a className="link" rel="noreferrer" target="_blank" href="https://mail.google.com/mail/u/0/#inbox?compose=new"><i className="far fa-envelope"></i></a>
            </div>
        </footer>
    )
}
export default Footer;