import React, {useEffect, useState} from 'react';
import menuIcon from './menuicon.png';
import likeicon from "./likeicon.png";
import dislikeicon from "./dislikeicon.png";
import commenticon from "./commenticon.png";

    const ProfilePage = ({user ,activeTab='confessions', handleTabClick,setUserData,usersData}) => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);
        const [showStickyNote, setShowStickyNote] = useState(true);
        const [searchQuery, setSearchQuery] = useState('');
        const [filteredFriends, setFilteredFriends] = useState(user.friends);
        const [showDropdown, setShowDropdown] = useState(false);
        const [likeState, setLikeState] = useState({});
        const [isCommentDropdownOpen, setCommentDropdownOpen] = useState(false);
        const [selectedConfessionComments, setSelectedConfessionComments] = useState([]);
        const [selectedConfessionId, setSelectedConfessionId] = useState(null);
        const [commentCounts, setCommentCounts] = useState({});
        const [showAboutOptions, setShowAboutOptions] = useState(false);

        const formatTimeDifference = (confessionDate,mentionDate) => {
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
            const colors = ['rgba(252,133,189,0.72)', 'rgba(137,231,255,0.72)', 'rgba(255,137,137,0.72)', 'rgba(255,241,137,0.72)', 'rgba(170,137,255,0.72)', 'rgba(136,253,136,0.72)',];
            return colors[index % colors.length];
        };
        const getStickyNoteColor1 = (index) => {
            // Replace this logic with your color generation or predefined colors
            const colors = ['#ff76b3', '#76cfff', '#FF7676FF', '#ffef76', '#9b76ff', '#76fd76',];
            return colors[index % colors.length];
        };
        const handleUnfriend = (friendName) => {
            // Create a copy of the user data
            const updatedUserData = { ...user };

            // Find the index of the friend to unfriend in the user's friends array
            const friendIndex = updatedUserData.friends.findIndex((friend) => friend.name === friendName);

            // Find the index of the friend to unfriend in the filteredFriends array
            const filteredFriendIndex = filteredFriends.findIndex((friend) => friend.name === friendName);

            // Remove the friend from the user's friends array if found
            if (friendIndex !== -1) {
                updatedUserData.friends.splice(friendIndex, 1);
            }

            // Remove the friend from the filteredFriends array if found
            if (filteredFriendIndex !== -1) {
                const updatedFilteredFriends = [...filteredFriends];
                updatedFilteredFriends.splice(filteredFriendIndex, 1);
                setFilteredFriends(updatedFilteredFriends);
            }

            // Update the user data with the modified friends list
            setUserData(updatedUserData);
        };
        const handleInputChange = (e) => {
            const query = e.target.value;
            setSearchQuery(query);
            filterFriends(query);
        };

        const filterFriends = (query) => {
            const filtered = user.friends.filter((friend) =>
                friend.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredFriends(filtered);
        };
        const handleSettingsClick = () => {
            // Toggle the dropdown menu
            setShowDropdown(!showDropdown);
        };

        const handleAboutClick = () => {
            // Toggle the About options
            setShowAboutOptions(!showAboutOptions);
        };

        const handleLogout = () => {
            // Implement your logout logic here
            // For example, clear user session, redirect, etc.
            console.log('Logout clicked');
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
                <img src={menuIcon} alt="Settings" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer',width: '30px', height: '30px' }} onClick={handleSettingsClick} /><br/>
                <p style={{fontFamily: 'Helvetica', fontSize: '30px'}}><b>{user.name}</b> </p>
                <div style={{ position: 'relative' }}>
                    <img src={user.profileImage} style={{width: '70px', height: '70px', borderRadius: '50%', position:'absolute', top: '-60px', right: '14px'}}/>
                   <br/>
                    <p style={{fontFamily: 'Helvetica',position:'absolute', top: '-35px'}}>{user.branch}</p>
                    <p style={{fontFamily: 'Helvetica',position:'absolute', top: '-10px'}}>{user.bio}</p>
                </div>
                {showDropdown && (
                    <div style={{overflowY:'scroll',position: 'fixed', bottom: -1, left: 0, height:'50%',width: '100%', backgroundColor: 'white',  zIndex: '100',borderTopRightRadius:'20px',borderTopLeftRadius:'20px', border:'0px solid #000',boxShadow: '0px 3px 9px rgba(0, 0, 0, 1)'}}>
                        <ul style={{ listStyle: 'none', padding: '0' }}>
                            <li style={{ padding: '15px', cursor: 'pointer',fontFamily: 'Helvetica', fontSize: '18px', color:'black' }} onClick={handleLogout}>Edit profile</li>
                            <li style={{ padding: '15px', cursor: 'pointer', fontFamily: 'Helvetica', fontSize: '18px', color: 'black' }} onClick={handleAboutClick}>About</li>
                            {showAboutOptions && (
                            <div style={{position: 'relative', top: '0px', left: 0, height:'150px',width: '100%', backgroundColor: 'white',  zIndex: '100',borderRadius:'11px', border:'0px solid #000',boxShadow: '0px 3px 9px rgba(0, 0, 0, 1)'}}>
                            <ul style={{ listStyle: 'none', padding: '0' }}>
                                <li style={{ padding: '15px', cursor: 'pointer',fontFamily: 'Helvetica', fontSize: '18px', color:'black' }} onClick={handleLogout}>About RVConnect</li>
                                <li style={{ padding: '15px', cursor: 'pointer',fontFamily: 'Helvetica', fontSize: '18px', color:'black' }} onClick={handleLogout}>Terms of Use</li>
                                <li style={{ padding: '15px', cursor: 'pointer',fontFamily: 'Helvetica', fontSize: '18px', color:'black' }} onClick={handleLogout}>Privacy Policy</li>
                            </ul>
                            </div>
                                )}
                            <li style={{ padding: '15px', cursor: 'pointer',fontFamily: 'Helvetica', fontSize: '18px', color:'red' }} onClick={handleLogout}>Log out</li>
                            {/* Add other options here */}
                        </ul>
                            </div>
                            )}


                <div style={{ display: 'flex', marginTop: '20px' , justifyContent: 'space-between',width: '100%', }}>

                    <div
                        className={`tab ${activeTab === 'confessions' ? 'active' : ''}`}
                        onClick={() => handleTabClick('confessions')}
                        style={{
                            flex: 1,
                            fontFamily: 'Helvetica', fontSize: '20px',
                            textAlign: 'center',
                            color: activeTab === 'confessions' ? '#000' : '#c0c0c0',
                        }}

                    >
                        <b>Confessions</b>
                    </div>

                    <div
                        className={`tab ${activeTab === 'mentioned' ? 'active' : ''}`}
                        onClick={() => handleTabClick('mentioned')}
                        style={{
                            flex: 1,
                            fontFamily: 'Helvetica', fontSize: '20px',
                            textAlign: 'center',
                            color: activeTab === 'mentioned' ? '#000' : '#c0c0c0',
                        }}

                    >
                        <b>Mentions</b>
                    </div>

                    <div
                        className={`tab ${activeTab === 'friends' ? 'active' : ''}`}
                        onClick={() => handleTabClick('friends')}
                        style={{
                                flex: 1,
                                fontFamily: 'Helvetica', fontSize: '20px',
                                textAlign: 'center',
                                color: activeTab === 'friends' ? '#000' : '#c0c0c0',}}
                    >
                        <b>Friends</b>
                    </div>

                </div>
                <hr />

                {activeTab === 'confessions' && (
                    <>
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
                                whiteSpace: 'pre-line', /* Allow text to wrap to the next line */
                                overflow: 'hidden', /* Hide overflowing text */
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
                                        style={{ backgroundColor:'transparent',border:'none',}}
                                    >
                                        {likeState[confession.id] ? <img src={likeicon} style={{height:'25px',width:'25px'}}/>  : <img src={dislikeicon} style={{height:'25px',width:'25px'}}/> }
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
                                        <div
                                            style={{
                                                bottom: 60,
                                                overflowY: 'scroll',
                                                position: 'fixed',
                                                left: 0,
                                                height:'43%',
                                                width: '100%',
                                                backgroundColor: 'white',
                                                zIndex: '100',
                                                borderTopRightRadius: '20px',
                                                borderTopLeftRadius: '20px',
                                                border: '0px solid #000',
                                                boxShadow: '0px 3px 9px rgba(0, 0, 0, 1)',
                                            }}>
                                            {selectedConfessionComments.map((comment) => (
                                                <div  style={{
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

                    </>
                )}
                {/* Bottom Navigation */}
                {isCommentDropdownOpen ? (

                    <div style={{zIndex:'100', position: 'fixed', bottom: '10px', left: '0px', right: '0px',}}>
                        <div style={{background:'#fff', boxShadow: '0px 3px 9px rgba(0, 0, 0, 1)',borderRadius:'11px', height:'155px',zIndex:'100' ,width:'100%',position:'relative',top:'70px' }}>

                            {/* You can add your textbox and other components here */}
                            {/* For example, an input field for entering comments */}
                            <textarea type="text" placeholder="Enter your comment"
                                      style={{ resize: 'none',whiteSpace: 'pre-wrap', overflowWrap: 'break-word',  paddingBottom:'0px',paddingLeft:'18.5px', fontFamily: 'Helvetica', width:'calc(100% - 21px)', height: '40px',background:'transparent',border:'0px solid #ccc',fontSize:'20px',borderRadius: '0px', position:'relative', top:'10px'}}
                            />
                            <button  style={{ float: 'right',right:'10px',position: 'relative', bottom: '-12px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '11px', padding: '6px 12px', fontSize: '15px', cursor: 'pointer', fontFamily:'Helvetica' }}><b>Comment</b></button>
                        </div>
                    </div>

                ) : (
                    // Render your bottom navigation when the dropdown is closed
                    <div style={{ position: 'fixed', bottom: '0', left: '0', right: '0', backgroundColor: '#333' }}>
                    </div>
                )}


                {activeTab === 'mentioned' && (
                    <>
                        {user.mentioned.map((mention, index) => (

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
                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)'
                            }}>
                                <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>

                                    <p style={{
                                        position: 'absolute',
                                        top: '-30px',
                                        right: '4px',
                                        color: '#000',
                                        fontFamily: 'Helvetica'
                                    }}>{formatTimeDifference(mention.date_posted)}</p>

                                    <p style={{
                                        fontFamily: 'Helvetica',
                                        position: 'relative',
                                        left: '27px',
                                        top: '-10px'
                                    }}>
                            <span dangerouslySetInnerHTML={{ __html: mention.content.replace(
                                    /@(\w+)/g, // Regular expression to find mentioned users
                                    (match, username) => `<b>@${username}</b>`
                                ) }} />
                                    </p>
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
                    </>
                )}



                {activeTab === 'friends' && (
                    <>
                    <div >

                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={handleInputChange}
                            style={{paddingLeft:'18px', fontFamily: 'Helvetica', width:'calc(100% - 22px)', height: '40px',background:'#efefef',border:'1px solid #ccc',fontSize:'20px',borderRadius: '11px',}}

                        />
                        {filteredFriends.map((friend, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '0px 0' }}>
                                <img src={friend.image} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                                <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ fontFamily: 'Helvetica', color: '#000', fontSize: '17px', position: 'relative', top: '4px', margin: '10px' }}><b>{friend.name}</b></p>
                                        <p style={{ fontFamily: 'Helvetica', color: '#8f8f8f', position: 'relative', top: '-2px', fontSize: '17px', margin: '10px' }}>@{friend.username}</p>
                                    </div>
                                    <button style={{ fontFamily: 'Helvetica', backgroundColor: 'white', padding: '6px 10px', border: '1.2px solid #ccc', borderRadius: '10px', fontSize: '17px' }} onClick={() => handleUnfriend(friend.name)}><b>Unfriend</b></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    </>
                )}
                {/*{activeTab === 'clubs' && (*/}
                {/*    <>*/}
                {/*        /!* Render clubs content here *!/*/}
                {/*    </>*/}
                {/*)}*/}




            </div>
        );
    };

export default ProfilePage;