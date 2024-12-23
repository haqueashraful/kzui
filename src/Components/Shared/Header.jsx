import React from 'react';
import './Header.css'
import logo from '../../assets/text_logo_black.png'

const Header = () => {
    return (
        <div>
            <ul className='kzui-nav'>
                <li>
                    <img src={logo} alt="" />
                </li>
                <li>
                    <a href="#">Welcome</a>
                </li>
                <li>
                    <a href="#">Blocks</a>
                </li>
                <li>
                    <a href="#">Settings</a>
                </li>
            </ul>
        </div>
    );
};

export default Header;