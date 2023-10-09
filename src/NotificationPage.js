import React from 'react';

const NotificationPage = ({ notifications, openMentionedConfession }) => {
    const formatTimeDifference = (notificationTime) => {
        const currentTime = new Date();
        const timeDifference = currentTime - new Date(notificationTime);

        if (timeDifference < 60000) {
            return Math.floor(timeDifference / 1000) + ' s';
        } else if (timeDifference < 3600000) {
            return Math.floor(timeDifference / 60000) + ' m';
        } else if (timeDifference < 86400000) {
            return Math.floor(timeDifference / 3600000) + ' h';
        } else {
            return Math.floor(timeDifference / 86400000) + ' d';
        }
    };

    const categorizeNotifications = (notifications) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);

        const todayNotifications = [];
        const yesterdayNotifications = [];
        const last7DaysNotifications = [];
        const last30DaysNotifications = [];

        notifications.forEach((notification) => {
            const notificationTime = new Date(notification.time);
            if (notificationTime >= today) {
                todayNotifications.push(notification);
            } else if (notificationTime >= yesterday) {
                yesterdayNotifications.push(notification);
            } else if (notificationTime >= last7Days) {
                last7DaysNotifications.push(notification);
            } else if (notificationTime >= last30Days) {
                last30DaysNotifications.push(notification);
            }
        });

        return {
            today: todayNotifications,
            yesterday: yesterdayNotifications,
            last7Days: last7DaysNotifications,
            last30Days: last30DaysNotifications,
        };
    };

    const categorizedNotifications = categorizeNotifications(notifications);

    const friendRequestNotifications = [
        {
            text: 'username has sent you a friend request',
            userId: 'user123', // Replace with the actual user ID
            time: new Date().toISOString(), // Add the timestamp
        },
        // Add more friend request notifications as needed
    ];

    // Define the handleAcceptFriendRequest and handleDeleteFriendRequest functions
    const handleAcceptFriendRequest = (userId) => {
        // Implement the logic to accept the friend request
    };

    const handleDeleteFriendRequest = (userId) => {
        // Implement the logic to delete the friend request
    };

    return (
        <div>
            <h2 style={{ fontFamily: 'Helvetica', fontSize: '28px' }}>Notifications</h2>

            {categorizedNotifications.today.length > 0 && (
                <div>
                    <h2 style={{ fontFamily: 'Helvetica', fontSize: '20px' }}>Today</h2>
                    {categorizedNotifications.today.map((notification, index) => (
                        <div
                            key={index}
                            onClick={() => openMentionedConfession(notification.mentionedConfessionId)}
                            style={{
                                borderRadius: '11px',
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
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>
                                <p
                                    style={{
                                        position: 'absolute',
                                        top: '-13px',
                                        right: '4px',
                                        color: '#000',
                                        fontFamily: 'Helvetica',
                                    }}
                                >
                                    {formatTimeDifference(notification.time)}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        style={{
                                            fontFamily: 'Helvetica',
                                            position: 'relative',
                                            left: '27px',
                                            top: '-10px',
                                            maxWidth: '87%',
                                        }}
                                    >
                                        {notification.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {categorizedNotifications.yesterday.length > 0 && (
                <div>
                    <h2 style={{ fontFamily: 'Helvetica', fontSize: '20px' }}>Yesterday</h2>
                    {categorizedNotifications.yesterday.map((notification, index) => (
                        <div
                            key={index}
                            onClick={() => openMentionedConfession(notification.mentionedConfessionId)}
                            style={{
                                borderRadius: '11px',
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
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>
                                <p
                                    style={{
                                        position: 'absolute',
                                        top: '-13px',
                                        right: '4px',
                                        color: '#000',
                                        fontFamily: 'Helvetica',
                                    }}
                                >
                                    {formatTimeDifference(notification.time)}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        style={{
                                            fontFamily: 'Helvetica',
                                            position: 'relative',
                                            left: '27px',
                                            top: '-10px',
                                            maxWidth: '87%',
                                        }}
                                    >
                                        {notification.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {categorizedNotifications.last7Days.length > 0 && (
                <div>
                    <h2 style={{ fontFamily: 'Helvetica', fontSize: '20px' }}>Last 7 Days</h2>
                    {categorizedNotifications.last7Days.map((notification, index) => (
                        <div
                            key={index}
                            onClick={() => openMentionedConfession(notification.mentionedConfessionId)}
                            style={{
                                borderRadius: '11px',
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
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>
                                <p
                                    style={{
                                        position: 'absolute',
                                        top: '-13px',
                                        right: '4px',
                                        color: '#000',
                                        fontFamily: 'Helvetica',
                                    }}
                                >
                                    {formatTimeDifference(notification.time)}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        style={{
                                            fontFamily: 'Helvetica',
                                            position: 'relative',
                                            left: '27px',
                                            top: '-10px',
                                            maxWidth: '87%',
                                        }}
                                    >
                                        {notification.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {categorizedNotifications.last30Days.length > 0 && (
                <div>
                    <h2 style={{ fontFamily: 'Helvetica', fontSize: '20px' }}>Last 30 Days</h2>
                    {categorizedNotifications.last30Days.map((notification, index) => (
                        <div
                            key={index}
                            onClick={() => openMentionedConfession(notification.mentionedConfessionId)}
                            style={{
                                borderRadius: '50px',
                                background: '#ffffff',
                                border: '1px solid #e8e8e8',
                                boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff',
                                position: 'relative',
                                top: '0',
                                zIndex: 'auto',
                                padding: '10px',
                                margin: '10px',
                                maxWidth: '100%',
                                whiteSpace: 'pre-line',
                                overflow: 'hidden',
                                overflowWrap: 'break-word',
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>
                                <p
                                    style={{
                                        position: 'absolute',
                                        top: '-13px',
                                        right: '4px',
                                        color: '#000',
                                        fontFamily: 'Helvetica',
                                    }}
                                >
                                    {formatTimeDifference(notification.time)}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        style={{
                                            fontFamily: 'Helvetica',
                                            position: 'relative',
                                            left: '27px',
                                            top: '0px',
                                            maxWidth: '87%',
                                        }}
                                    >
                                        {notification.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {friendRequestNotifications.length > 0 && (
                <div>
                    {friendRequestNotifications.map((notification, index) => (
                        <div
                            key={index}
                            // Handle the accept and delete actions when the buttons are clicked
                            style={{
                                borderRadius: '50px',
                                background: '#ffffff',
                                border: '1px solid #e8e8e8',
                                boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff',
                                position: 'relative',
                                top: '0',
                                zIndex: 'auto',
                                padding: '10px',
                                margin: '10px',
                                maxWidth: '100%',
                                whiteSpace: 'pre-line',
                                overflow: 'hidden',
                                overflowWrap: 'break-word',
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>
                                <p
                                    style={{
                                        position: 'absolute',
                                        top: '-13px',
                                        right: '4px',
                                        color: '#000',
                                        fontFamily: 'Helvetica',
                                    }}
                                >
                                    {formatTimeDifference(notification.time)}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p
                                        style={{
                                            fontFamily: 'Helvetica',
                                            position: 'relative',
                                            left: '27px',
                                            top: '0px',
                                            maxWidth: '80%',
                                        }}
                                    >
                                        {notification.text}

                                    <div style={{ display: 'flex', }}>
                                        <button onClick={() => handleAcceptFriendRequest(notification.userId)}
                                                style={{
                                                    fontFamily: 'Helvetica',
                                        position: 'relative',
                                                    left: '0px',
                                                    top: '20px',
                                        maxWidth: '87%',
                                        display: 'inline-block',
                                        width: '70px',
                                        height: '25px',
                                        background: '#000',
                                        border: '1px solid #ccc',
                                        color: '#fff',
                                        fontSize: '11px',
                                        borderRadius: '11px',
                                        marginRight: '5px',
                                        cursor: 'pointer',
                                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',}}>Accept</button>

                                        <button onClick={() => handleDeleteFriendRequest(notification.userId)}
                                                style={{
                                            fontFamily: 'Helvetica',
                                            position: 'relative',
                                                    left: '0px',
                                                    top: '20px',
                                            maxWidth: '87%',
                                            display: 'inline-block',
                                            width: '70px',
                                            height: '25px',
                                            background: '#000',
                                            border: '1px solid #ccc',
                                            color: '#fff',
                                            fontSize: '11px',
                                            borderRadius: '11px',
                                            marginRight: '5px',
                                            cursor: 'pointer',
                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.9)',}}>Delete</button>
                                    </div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationPage;
