import React from 'react';
import './Sidebar.css'
import logo1 from '../../assets/note-2.svg'
import logo2 from '../../assets/color-swatch.svg'
import logo3 from '../../assets/programming-arrows.svg'

const Sidebar = () => {
    return (
        <div  className='kzui-sidebar'>
            <ul>
                <h4>
                    Menu
                </h4>
                <li>
                    <p>
                        <img src={logo1} alt="" />
                    </p>
                    General
                </li>
                <li>
                    <p>
                        <img src={logo2} alt="" />
                    </p>
                    Design System
                </li>
                <li>
                    <p>
                        <img src={logo3} alt="" />
                    </p>
                    Intregration
                </li>
            </ul>

        </div>
    );
};

export default Sidebar;