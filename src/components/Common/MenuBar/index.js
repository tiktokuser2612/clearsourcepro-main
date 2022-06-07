import React, { useEffect, useState } from 'react';
import {
    Link,
} from 'react-router-dom';

const MenuBar = ({
    location,userMenu,navItems
  }) => {    
    return (
        <div className="recruiter_tab">
                <ul>
                {
                    navItems.filter(tab => userMenu.includes(tab.title)).map(function(tab, i){
                        {location.pathname.includes(tab.url.substring(0, tab.url.length))}
                        return <li key={i} ><Link to={tab.url} className={location.pathname.includes(tab.url.substring(0, tab.url.length))  ? "active" : ""}>{tab.title}</Link></li>;
                    })
                }
                </ul>
        </div>
    );
}

export default MenuBar;