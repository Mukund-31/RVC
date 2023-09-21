import React, { useState, useEffect } from 'react';
import homeIcon from './homeicon.png';
import searchIcon from './searchicon.png';
import postIcon from './posticon.png';
import profileIcon from './profileicon.png';

const Dashboard = ({ user }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showStickyNote, setShowStickyNote] = useState(true);


    const formatTimeDifference = (confessionDate) => {
        const currentDate = new Date();
        const timeDifference = currentDate - new Date(confessionDate);

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



            const handleScroll = () => {
                setShowStickyNote(window.scrollY <= 0); // Show sticky note when scrolling up
            };

            window.addEventListener('scroll', handleScroll);

            // Clean up event listener on unmount
            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleScroll);
        };
    }, []);
        const getStickyNoteColor = (index) => {
            // Replace this logic with your color generation or predefined colors
            const colors = ['#FC85BDB7', '#89E7FFB7','#FF8989B7', '#FFF189B7','#AA89FFB7',  '#88FD88B7',];
            return colors[index % colors.length];
        };
    const getStickyNoteColor1 = (index) => {
        // Replace this logic with your color generation or predefined colors
        const colors = ['#ff76b3', '#76cfff','#FF7676FF','#ffef76','#9b76ff','#76fd76', ];
        return colors[index % colors.length];
    };

    return (
        <div style={{ marginBottom: windowWidth <= 768 ? '60px' : '0' }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', padding: '13px', borderBottom: '1px solid #808080' }}>
                <div>
                    {/* Logo */}
                    <img src="path_to_your_logo.png" alt="RV Connected" style={{ height: '50px'}} />
                </div>

            </div>
            {user.confessions.map((confession, index) => (

                <div key={index} style={{
                    borderRadius: '11px',
                    borderBottomLeftRadius: '30px',
                    background: getStickyNoteColor(index),
                    position: 'relative',
                    top: '0',
                    zIndex: 'auto',
                    border: '1px solid #000',
                    padding: '10px',
                    margin: '10px',
                    maxWidth: '100%',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>

                        <p style={{
                            position: 'absolute',
                            top: '-30px',
                            right: '4px',
                            color: '#000',
                            fontFamily: 'Helvetica'
                        }}>{formatTimeDifference(confession.date_posted)}</p>

                        <p style={{
                            fontFamily: 'Helvetica',
                            position: 'relative',
                            left: '27px',
                            top: '-10px'
                        }}>
                            {confession.content.replace (/@(\w+)/g, (match,mentioned_user) => `@${mentioned_user}`)}
                        </p>
                    </div>
                    <div style={{
                        borderBottom: '2px solid #000',
                        borderRight: '1px solid #000',
                        borderTopRightRadius: '0px',
                        borderTopLeftRadius: '30px',
                        borderBottomRightRadius: '11px',
                        borderBottomLeftRadius: '0px',
                        position: 'absolute',
                        bottom: '-0px',
                        left: '27px',
                        width: '30px',
                        height: '30px',
                        background: getStickyNoteColor1(index),
                        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%, 0% 75%)',
                        zIndex: '0',
                        transform: 'rotate(-81deg)',
                        transformOrigin: 'bottom left',
                    }}
                    />
                </div>
            ))}
        </div>
    );
};
export default Dashboard;
