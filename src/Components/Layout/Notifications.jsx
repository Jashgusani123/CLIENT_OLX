import React from 'react';

const Notifications = ({ message, type, onClose }) => {
    const styles = {
        container: {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            borderRadius: '5px',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            opacity: message ? 1 : 0,
        },
        success: {
            backgroundColor: '#4CAF50',
            color: 'white',
        },
        error: {
            backgroundColor: '#f44336',
            color: 'white',
        },
    };

    return (
        <div
            style={{
                ...styles.container,
                ...(type === 'success' ? styles.success : styles.error),
            }}
            onClick={onClose}
        >
            {message}
        </div>
    );
};

export default Notifications;
