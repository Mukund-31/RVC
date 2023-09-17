import React, { useState } from 'react';
import searchIcon from './searchicon.png';

const SearchPage = ({ usersData }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (query) => {
        // Perform the search logic here
        const filteredUsers = usersData.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredUsers);
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    return (
        <div >

            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange}
                style={{paddingLeft:'18px', fontFamily: 'Helvetica', width:'calc(100% - 22px)', height: '40px',background:'#efefef',border:'1px solid #ccc',fontSize:'20px',borderRadius: '11px',}}

            />

            <ul>
                {searchResults.map((user) => (
                    <li key={user.name} style={{ display: 'flex', alignItems: 'center',borderBottom: '1px solid #ccc', padding: '0px 0',position: 'relative',left: '-20px' }} >
                        <img src={user.image} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                        <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontFamily: 'Helvetica', color: '#000', fontSize: '17px' ,position: 'relative',top:'4px', margin: '10px'}}><b>@{user.username}</b></p>
                                <p style={{ fontFamily: 'Helvetica',color: '#8f8f8f',position: 'relative',top:'-2px', fontSize: '17px', margin: '10px' }}>{user.name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchPage;
