import React from 'react';
import './MainContent.css'
import DataTable from './DataTable';

const MainContent = () => {
    return (
        <div className='kzui-main-content'>

            <h1>Design System</h1>

            
            <div className='kzui-mcp-header'>
                {/* header right */}
                <div>
                    <ul>
                        <li>
                            Color
                        </li>
                        <li>
                            Typography
                        </li>
                        <li>
                            Shadow
                        </li>
                    </ul>
                </div>

                {/* header left */}
                <div className='kzui-mcp-search'>
                    <input type="search" placeholder='Search' />
                </div>
            </div>

            <div>
                <DataTable />
            </div>



        </div>
    );
};

export default MainContent;