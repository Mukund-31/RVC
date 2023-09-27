import React, { useState, useEffect } from 'react';
import homeIcon from './homeicon.png';
import searchIcon from './searchicon.png';
import postIcon from './posticon.png';
import profileIcon from './profileicon.png';
import rvclogo from './rvclogo.png';
import likeicon from './likeicon.png';
import dislikeicon from './dislikeicon.png';
import commenticon from './commenticon.png';

const Dashboard = ({ user }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showStickyNote, setShowStickyNote] = useState(true);
    const [likeState, setLikeState] = useState({});
    const [isCommentDropdownOpen, setCommentDropdownOpen] = useState(false);
    const [selectedConfessionComments, setSelectedConfessionComments] = useState([]);
    const [selectedConfessionId, setSelectedConfessionId] = useState(null);
    const [commentCounts, setCommentCounts] = useState({});
    const formatTimeDifference = (confessionDate) => {
        const currentDate = new Date();
        const timeDifference = currentDate - new Date(confessionDate);

        if (timeDifference < 60000) {
            return Math.floor(timeDifference / 1000) + " s";
        } else if (timeDifference < 3600000) {
            return Math.floor(timeDifference / 60000) + " m";
        } else if (timeDifference < 86400000) {
            return Math.floor(timeDifference / 3600000) + " h";
        } else {
            return Math.floor(timeDifference / 86400000) + " d";
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        const handleScroll = () => {
            setShowStickyNote(window.scrollY <= 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getStickyNoteColor = (index) => {
        const colors = ['#FC85BDB7', '#89E7FFB7', '#FF8989B7', '#FFF189B7', '#AA89FFB7', '#88FD88B7'];
        return colors[index % colors.length];
    };

    const getStickyNoteColor1 = (index) => {
        const colors = ['#ff76b3', '#76cfff', '#FF7676FF', '#ffef76', '#9b76ff', '#76fd76'];
        return colors[index % colors.length];
    };

    const handleLikeDislike = (confessionId) => {
        const newLikeState = { ...likeState };
        newLikeState[confessionId] = !newLikeState[confessionId];
        setLikeState(newLikeState);
    };

    const toggleCommentDropdown = (confession) => {
        if (isCommentDropdownOpen) {
            setCommentDropdownOpen(false);
            setSelectedConfessionComments([]);
            setSelectedConfessionId(null);
        } else {
            const comments = user.comments.filter((comment) => comment.post_id === confession.id);
            setSelectedConfessionComments(comments);
            setSelectedConfessionId(confession.id);
            setCommentDropdownOpen(true);
        }
    };

    useEffect(() => {
        const counts = {};
        user.confessions.forEach((confession) => {
            const comments = user.comments.filter((comment) => comment.post_id === confession.id);
            counts[confession.id] = comments.length;
        });
        setCommentCounts(counts);
    }, [user.confessions, user.comments]);
    const formatCommentCount = (count) => {
        if (count < 1000) {
            return count.toString();
        } else if (count < 1000000) {
            return (count / 1000).toFixed(1) + 'K';
        } else {
            return (count / 1000000).toFixed(1) + 'M';
        }
    };

    return (
        <div style={{ marginBottom: windowWidth <= 768 ? '60px' : '0' }}>
            {/* Top Bar */}
            <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                <div>
                    {/* Logo */}
                    <img src={rvclogo} alt="RV Connected" style={{ paddingTop: '10px', height: '150px', width: '150px' }} />
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
                        border: '0px solid #000',
                        padding: '10px',
                        margin: '10px',
                        maxWidth: '100%',
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',
                        whiteSpace: 'pre-line',
                        overflow: 'hidden',
                        overflowWrap: 'break-word',
                        display: selectedConfessionId === confession.id || !isCommentDropdownOpen ? 'block' : 'none',
                    }}>
                        <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>
                            <p style={{
                                position: 'absolute',
                                top: '-15px',
                                right: '4px',
                                color: '#000',
                                fontFamily: 'Helvetica'
                            }}>{formatTimeDifference(confession.date_posted)}</p>
                            <button
                                onClick={() => handleLikeDislike(confession.id)}
                                style={{ backgroundColor: 'transparent', border: 'none' }}>
                                {likeState[confession.id] ? <img src={likeicon} style={{ height: '25px', width: '25px' }} /> : <img src={dislikeicon} style={{ height: '25px', width: '25px' }} />}
                            </button>
                            <button
                                onClick={() => toggleCommentDropdown(confession)}
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                }}>
                                <img src={commenticon} style={{ height: '25px', width: '25px' }} />
                                <span style={{ marginLeft: '4px',fontFamily: 'Helvetica', position: 'relative', top:'-7px' }}>
                            {formatCommentCount(commentCounts[confession.id] || 0)}
                                </span>
                            </button>
                            {isCommentDropdownOpen && selectedConfessionComments.length > 0 && (
                                <div style={{
                                    bottom: 50,
                                    overflowY: 'scroll',
                                    position: 'fixed',
                                    left: 0,
                                    height:'50%',
                                    width: '100%',
                                    backgroundColor: 'white',
                                    zIndex: '100',
                                    borderTopRightRadius: '20px',
                                    borderTopLeftRadius: '20px',
                                    border: '0px solid #000',
                                    boxShadow: '0px 3px 9px rgba(0, 0, 0, 1)',
                                }}>
                                    {selectedConfessionComments.map((comment) => (
                                        <div style={{
                                            padding: '0px 0',
                                            borderBottom: '1px solid #ccc',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                            <img src={comment.user_commented.profilepic} style={{
                                                minWidth: '40px',
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                marginLeft: '15px',
                                                backgroundColor: '#000',
                                                position: 'relative',
                                                top: '-50px'
                                            }} />
                                            <div key={comment.id} style={{
                                                padding: '15px',
                                                whiteSpace: 'pre-line',
                                                overflow: 'hidden',
                                                overflowWrap: 'break-word',
                                            }}>
                                                <p style={{
                                                    fontFamily: 'Helvetica',
                                                    color: '#000',
                                                    fontSize: '17px',
                                                    position: 'relative',
                                                    top: '4px',
                                                }}><b>{comment.user_commented.first_name + comment.user_commented.last_name}</b></p>
                                                <p style={{
                                                    fontFamily: 'Helvetica',
                                                    color: '#8f8f8f',
                                                    position: 'relative',
                                                    top: '-10px',
                                                    fontSize: '17px',
                                                }}>@{comment.user_commented.username}</p>
                                                <p style={{
                                                    fontFamily: 'Helvetica',
                                                    position: 'relative',
                                                    top: '-10px',
                                                    fontSize: '17px',
                                                    maxWidth: '90%',
                                                }}>{comment.comment}</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{
                                    fontFamily: 'Helvetica',
                                    position: 'relative',
                                    left: '27px',
                                    top: '-10px',
                                    maxWidth: '87%',
                                }}>
                  <span dangerouslySetInnerHTML={{
                      __html: confession.content.replace(
                          /@(\w+)/g,
                          (match, username) => `<b>@${username}</b>`
                      )
                  }} />
                                </p>
                            </div>
                        </div>
                        <div style={{
                            borderBottom: '3px solid #000',
                            borderRight: '1px solid #000',
                            borderTopRightRadius: '0px',
                            borderTopLeftRadius: '30px',
                            borderBottomRightRadius: '11px',
                            borderBottomLeftRadius: '2px',
                            position: 'absolute',
                            bottom: '-0.4px',
                            left: '30.5px',
                            width: '30px',
                            height: '31px',
                            background: getStickyNoteColor1(index),
                            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%, 0% 75%)',
                            zIndex: '0',
                            transform: 'rotate(-83.6deg)',
                            transformOrigin: 'bottom left',
                        }}
                        />
                    </div>
            ))}
            {/* Bottom Navigation */}
            {isCommentDropdownOpen ? (
                // Render the comment textbox when the dropdown is open
                <div style={{zIndex:'100', position: 'fixed', bottom: '-10px', left: '0px', right: '0px'}}>
                    {/* You can add your textbox and other components here */}
                    {/* For example, an input field for entering comments */}
                    <input type="text" placeholder="Enter your comment"
                           style={{paddingLeft:'18px', fontFamily: 'Helvetica', width:'calc(100% - 21px)', height: '70px',background:'#fff',border:'0px solid #ccc',fontSize:'20px',borderRadius: '11px',boxShadow: '0px 3px 9px rgba(0, 0, 0, 1)'}}
                    />
                </div>
            ) : (
                // Render your bottom navigation when the dropdown is closed
                <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#333' }}>
                </div>
            )}


        </div>
    );
};

export default Dashboard;
