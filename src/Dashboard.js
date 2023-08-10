import React, { useState, useEffect } from 'react';
import homeIcon from './homeicon.png';
import searchIcon from './searchicon.png';
import postIcon from './posticon.png';
import profileIcon from './profileicon.png';

const Dashboard = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const jsonData = [
        {
            "content": "Lorem Ipsum...",
            "date_posted": "2023-08-06T15:15:31Z",
            "author": 3,
            "mentioned_user": 2
        },
        {
            "content": "Lorem Ipsum...",
            "date_posted": "2023-08-06T15:15:57Z",
            "author": 2,
            "mentioned_user": 3
        },
        {
            "content": "Khada hun aaj bhi wahi...",
            "date_posted": "2023-08-09T13:12:27Z",
            "author": 2,
            "mentioned_user": null
        }
    ];

    const formatTimeDifference = (postDate) => {
        const currentDate = new Date();
        const timeDifference = currentDate - new Date(postDate);

        if (timeDifference < 60000) { // Less than 1 minute
            return Math.floor(timeDifference / 1000) + " s";
        } else if (timeDifference < 3600000) { // Less than 1 hour
            return Math.floor(timeDifference / 60000) + " m";
        } else if (timeDifference < 86400000) { // Less than 1 day
            return Math.floor(timeDifference / 3600000) + " h";
        } else { // More than 1 day
            return Math.floor(timeDifference / 86400000) + " d";
        }
    };

    useEffect(() => {
        // Update window width on resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);



    return (
        <div>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', padding: '13px', borderBottom: '1px solid #808080' }}>
                <div>
                    {/* Logo */}
                    <img src="path_to_your_logo.png" alt="RV Connected" style={{ height: '50px'}} />
                </div>

            </div>
            {jsonData.map((post, index) => (
                <div key={index} style={{ borderBottom: '1px solid #808080', padding: '10px', margin: '10px' ,position: 'relative', maxWidth:'100%'}}>
                    {post.mentioned_user !== null && <p style={{  fontFamily:'Helvetica',color: '#1da1f2',fontSize:'15px' }}>@{post.mentioned_user}</p>}
                    <p style={{ position: 'absolute', top: '0', right: '4px' , color: '#808080', fontFamily:'Helvetica' }}>{formatTimeDifference(post.date_posted)}</p>
                    <p style={{fontFamily:'Helvetica'}}>{post.content}</p>
                </div>
            ))}
            {/* Mobile Task Bar */}
            {windowWidth <= 768 && (
                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '24px', borderTop: '1px solid #808080', padding: '10px', position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#ffffff', zIndex: '100' }}>
                    <img src={homeIcon} style={{ width: '31px', height: '31px' }} />
                    <img src={searchIcon} style={{ width: '30px', height: '30px' }} />
                    <img src={postIcon} style={{ width: '31px', height: '31px' }} />
                    <img src={profileIcon} style={{ width: '31px', height: '31px' }} />
                </div>
            )}

        </div>
    );
};

export default Dashboard;
