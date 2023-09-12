import React, { useState } from 'react';
import CrossIcon from './cross.png';
const PostPage = ({ switchToDashboard, users }) => {
    const [newPostContent, setNewPostContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [mentionedUsers, setMentionedUsers] = useState([]);
    const [suggestedMentionedUsers, setSuggestedMentionedUsers] = useState([]);


    const handlePostSubmit = () => {
        if (newPostContent.trim() === '') {
            return;
        }

        const newPost = {
            content: newPostContent,
            date_posted: new Date().toISOString(),
            author: 'User123', // Replace with actual user info
            mentioned_users: mentionedUsers.map(user => user.name)
        };

        setPosts([...posts, newPost]);
        setNewPostContent('');
        setMentionedUsers([]);
        switchToDashboard(); // Switch to Dashboard after making a post
    };

    const handleInputChange = (event) => {
        const inputText = event.target.value;
        setNewPostContent(inputText);

        if (inputText.length >= 3 && inputText.includes('@')) {
            const lastMentionStart = inputText.lastIndexOf('@');
            const mentionInput = inputText.substring(lastMentionStart + 1);

            if (mentionInput.length >= 3) {
                const suggestions = users.filter(user =>
                    user.name.toLowerCase().startsWith(mentionInput.toLowerCase())
                );

                // Remove duplicates from suggestions
                const uniqueSuggestions = suggestions.filter((user, index, self) =>
                    index === self.findIndex(u => u.name === user.name)
                );

                setSuggestedMentionedUsers(uniqueSuggestions);
            } else {
                setSuggestedMentionedUsers([]);
            }
        } else {
            setSuggestedMentionedUsers([]);
        }
    };

    const handleMentionClick = (user) => {
        const mention = `@${user.name}`;
        const updatedContent = newPostContent.replace(/@(\w+)/g, '').trim() + ' ' + mention + ' ';
        setNewPostContent(updatedContent);
        setMentionedUsers([...mentionedUsers, user]);
        setSuggestedMentionedUsers([]);
    };

    return (
        <div >
            <button onClick={switchToDashboard} style={{ position: 'absolute', top: '20px', left: '10px', background: 'none', border: 'none' }}>
                <img src={CrossIcon} alt="Close" style={{ width: '15px', height: '15px' }} />
            </button>
            <div style={{ marginTop: '110px' }}>
                <textarea
                    placeholder=" @mention
                    Write your post here..."
                    value={newPostContent}
                    onChange={handleInputChange}
                    rows={Math.min(10, newPostContent.split('\n').length + 1)}
                    style={{ border: 'none',outline: 'none', lineHeight:'1.5',width: '100%', fontSize: '20px' , fontFamily:'Helvetica'}}
                />
                <div>
                    {suggestedMentionedUsers.length > 0 && (
                        <ul>
                            {suggestedMentionedUsers.map((user, index) => (
                                <li key={index} onClick={() => handleMentionClick(user)}>
                                    <img src={user.image} alt={user.name} style={{ width: '30px', height: '30px'}} />
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button onClick={handlePostSubmit} style={{ position: 'fixed', top: '20px', right: '10px', background: '#000', color: '#fff', border: 'none', borderRadius: '11px', padding: '6px 12px', fontSize: '20px', cursor: 'pointer', fontFamily:'Helvetica' }}><b>Post</b></button>
            </div>
        </div>
    );
};

export default PostPage;