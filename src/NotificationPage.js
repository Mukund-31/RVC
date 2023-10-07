import React from 'react';

const NotificationPage = ({ notifications, openMentionedConfession }) => {
    const getStickyNoteColor = (index) => {
        const colors = ['#FC85BDB7', '#89E7FFB7', '#FF8989B7', '#FFF189B7', '#AA89FFB7', '#88FD88B7'];
        return colors[index % colors.length];
    };
    const getStickyNoteColor1 = (index) => {
        const colors = ['#ff76b3', '#76cfff', '#FF7676FF', '#ffef76', '#9b76ff', '#76fd76'];
        return colors[index % colors.length];
    };
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
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>                        <p
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
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>                        <p
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
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>                        <p
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
                            }}
                        >
                            <div style={{ zIndex: '1', fontFamily: 'Helvetica', position: 'relative' }}>                        <p
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
                </div>
            )}
        </div>
    );
};

export default NotificationPage;
