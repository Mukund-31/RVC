import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import ConfessionPage from './ConfessionPage';
 import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import LoginPage from './LoginPage';
import homeIcon from './homeicon.png';
import postIcon from './posticon.png';
import profileIcon from './profileicon.png';
import searchIcon from './searchicon.png';





const App = ({user}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeTab, setActiveTab] = useState('confessions');
    const handleLogout = () => {
        // Implement your logout logic here, e.g., clearing user session
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const [userData, setUserData] = useState({
        name: 'Friend2',
        id:'2',
        username:'tester_2',
        profileImage: '.profileicon',
        branch: 'CSE26',
        bio: 'A passionate blogger and explorer!',


        confessions: [
            {
                "id": 1,
                "mentioned_user": null,
                "content": "@tester_2 hello mister mmmmmmmmmmmmmmm mmmmmmmmmmmmmmm mmmmmmmmmmmmmmm mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmmmm",
                "date_posted": "2023-09-18T06:13:47.016000Z",
                "author": {
                    "id": 1,
                    "username": "tester_1",
                    "email": "",
                    "first_name": "",
                    "last_name": "",
                    "password": "pbkdf2_sha256$600000$crDWiTkjmkfBnE5pDONpIx$2qKL6gKeoW8JSQtJNSMla0cyYkdq46KpN5+YdLkWuYs=",

                }
            },
            {
                "id": 2,
                "mentioned_user": null,
                "content": "@tester_2 hello mister mmmmmmmmmmmmmmm mmmmmmmmmmmmmmm mmmmmmmmmmmmmmm mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm mmmmmmmmmmmmmmm",
                "date_posted": "2023-09-18T06:13:47.016000Z",
                "author": {
                    "id": 1,
                    "username": "tester_1",
                    "email": "",
                    "first_name": "",
                    "last_name": "",
                    "password": "pbkdf2_sha256$600000$crDWiTkjmkfBnE5pDONpIx$2qKL6gKeoW8JSQtJNSMla0cyYkdq46KpN5+YdLkWuYs=",

                }
            },
            // ... other posts
        ],

        comments:[
            {
                "id": 1,
        "post_id": 2,
        "comment": "Lorem Ipsum Dolorlllllllllllll lllllllllllllllllllllll lllllllll llllllllllllllll lllllllllll lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
        "user_commented": {
        "id": 2,
            "username": "tester_2",
            "email": "",
            "profilepic": 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png',
            "first_name": "Friend",
            "last_name": "2",
            "password": "pbkdf2_sha256$600000$4ilIIV6FQNK6Ngaw1ctO3U$UnNaZDD/yMBvt+v615TSzHLyF2OCMWgnWn3Gyf/lu0U="
             },
             "upvote": false,
             "downvote":false,
             },
            {
                "id": 1,
                "post_id": 2,
                "comment": "Lorem Ipsum Dolorlllllllllllll lllllllllllllllllllllll lllllllll llllllllllllllll lllllllllll lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
                "user_commented": {
                    "id": 2,
                    "username": "tester_2",
                    "email": "",
                    "profilepic": 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png',
                    "first_name": "Friend",
                    "last_name": "2",
                    "password": "pbkdf2_sha256$600000$4ilIIV6FQNK6Ngaw1ctO3U$UnNaZDD/yMBvt+v615TSzHLyF2OCMWgnWn3Gyf/lu0U="
                },
                "upvote": false,
                "downvote":false,
            },
            {
                "id": 1,
                "post_id": 2,
                "comment": "Lorem Ipsum Dolorlllllllllllll llllllllllllllllllllll lllllllllllllllllllllllllll lllllllllllllllll lllllllllllllllllllllllll lllllllll llllllllllllllll lllllllllll lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
                "user_commented": {
                    "id": 2,
                    "username": "tester_2",
                    "email": "",
                    "profilepic": 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png',
                    "first_name": "Friend",
                    "last_name": "2",
                    "password": "pbkdf2_sha256$600000$4ilIIV6FQNK6Ngaw1ctO3U$UnNaZDD/yMBvt+v615TSzHLyF2OCMWgnWn3Gyf/lu0U="
                },
                "upvote": false,
                "downvote":false,
            },
        ],


            mentioned: [
                {mentioned_user:'', content: '@abc Hello, @rvc' + '!', date_posted: "2023-08-06T15:15:57Z",},
                {mentioned_user:'', content: '@abc Hello, @rvc' + '!', date_posted: "2023-08-06T15:15:57Z",},
                {mentioned_user:'', content: '@abc Hello, rvc' + '!', date_posted: "2023-08-06T15:15:57Z",},
                {mentioned_user:'', content: '@abc Hello, rvc' + '!', date_posted: "2023-08-06T15:15:57Z",},
                {mentioned_user:'', content: '@abc Hello, rvc' + '!', date_posted: "2023-08-06T15:15:57Z",},
                {mentioned_user:'', content: '@abc Hello, rvc' + '!', date_posted: "2023-08-06T15:15:57Z",},

            // ... other posts
        ],

        friends: [
            { name: 'Friend1', username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png'},
            { name: 'Friend2',username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png' },
            { name: 'Friend3',username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png' },
            { name: 'Friend1', username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png'},
            { name: 'Friend2',username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png' },
            { name: 'Friend3',username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png' },
            { name: 'Friend1', username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png'},
            { name: 'Friend2',username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png' },
            { name: 'Friend3',username:'abc',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png' },
            // Add more friends as needed
        ],
    });

    const [usersData, setUsersData] = useState([
        { id:'1', name: 'Friend1',username:'tester_1',image: 'C:/Users/Prakhar Jain/OneDrive/Pictures/Harshit.png' },
        { id:'2',name: 'Friend2',username:'tester_2', image: 'C:\\Users\\Prakhar Jain\\WebstormProjects\\front-end\\Front-End\\Front-End\\My.jpg' },
        { name: 'Friend3',username:'abc',image: 'C://Users//Prakhar Jain//WebstormProjects//front-end//Front-End//Front-End//My.jpg' },
        // ... other users
    ]);

    const switchToConfessionPage = () => {
        setCurrentPage('confessionPage');

    };

    const switchToDashboard = () => {
        setCurrentPage('dashboard');

    };

    const switchToProfilePage = () => {
        setCurrentPage('profilePage');

    };

    const switchToSearchPage = () => {
        setCurrentPage('searchPage');

    };



    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);



    return (
        <div>
            <nav>
                {isAuthenticated && windowWidth <= 768 && (
                    <div style={{ height:'70px',borderRadius:'11px', display: 'flex', justifyContent: 'space-around', fontSize: '33px', border: '0px solid #808080', marginBottom:'-1px', padding: '13px', position: 'fixed', bottom: '-10px', left: '0', right: '0', backgroundColor: '#ffffff', zIndex: '100', width: '100%', boxSizing: 'border-box', boxShadow: '0px 3px 9px rgba(0, 0, 0, 1)', }}>
                        <img src={homeIcon} onClick={switchToDashboard} style={{borderRadius:'50%', width: '31px', height: '31px' ,transform: currentPage === 'dashboard' ? 'scale(1.3)' : 'scale(1)', }} />
                        <img src={searchIcon} onClick={switchToSearchPage} style={{borderRadius:'50%', width: '31px', height: '31px' ,transform: currentPage === 'searchPage' ? 'scale(1.3)' : 'scale(1)', }} />
                        <img src={postIcon} onClick={switchToConfessionPage} style={{ borderRadius:'30%', width: '31px', height: '31px' ,transform: currentPage === 'confessionPage' ? 'scale(1.3)' : 'scale(1)', }} />
                        <img src={profileIcon} onClick={switchToProfilePage} style={{ borderRadius:'50%', width: '31px', height: '31px' ,transform: currentPage === 'profilePage' ? 'scale(1.3)' : 'scale(1)', }} />

                    </div>
                )}
                {/* Other navigation elements */}
            </nav>
            {isAuthenticated ? (
            <>
            {currentPage === 'dashboard' && <Dashboard user={userData}  switchToConfessionPage={switchToConfessionPage} />}
            {currentPage === 'confessionPage' && <ConfessionPage switchToDashboard={switchToDashboard} users={usersData} />}
            {currentPage === 'profilePage' &&<ProfilePage user={userData} activeTab={activeTab} handleTabClick={handleTabClick} setUserData={setUserData} />}
            {currentPage === 'searchPage' && (<SearchPage usersData={usersData} />)}

            </>
            ) : (
                // Render the login form when the user is not authenticated
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));