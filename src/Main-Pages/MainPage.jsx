import React from 'react';
import './MainPage.css'
import Sidebar from '../Components/Sidebar/Sidebar';
import MainContent from '../Components/Main-Content/MainContent';

const MainPage = () => {
    return (
        <div className='kzui-main-page'>
            <h1>Settings</h1>
            <div className="kzui-main-container">
                {/* side bar */}
                <div >
                    <Sidebar />
                </div>

                {/* main content */}
               <div>
                <MainContent />
               </div>
            </div>

        </div>
    );
};

export default MainPage;