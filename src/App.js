import React, { useState, useEffect } from 'react';
import {ReactComponent as Helmet} from './assets/helmet.svg'

import { Avatar, Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import './App.css'

import usersData from './usersData';

const useStyles = {
  root: {
    margin: 'auto',
    maxWidth: 1920,
    '@media (minWidth: 320px)': {
      minWidth: 320,
    },
  },
  listItem: {
    cursor: 'pointer',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [loadMoreTriggered, setLoadMoreTriggered] = useState(false); // New state variable

  useEffect(() => {
    setTimeout(() => {
      setUsers(usersData.slice(0, 50));
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.body.offsetHeight - 100; 

      if (scrollPosition >= scrollThreshold && !isLoading && hasMore) {
        setLoadMoreTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (loadMoreTriggered) {
      setIsLoading(true);
      setTimeout(() => {
        loadMoreUsers();
      }, 2000);
    }
  }, [loadMoreTriggered]);

  const loadMoreUsers = () => {
    const currentLength = users.length;
    const nextUsers = usersData.slice(currentLength, currentLength + 50);

    setUsers((prevUsers) => [...prevUsers, ...nextUsers]);
    setHasMore(currentLength + 50 < usersData.length);
    setIsLoading(false);
    setLoadMoreTriggered(false);
  };

  const showSkeletons = () => {
    const skeletonCount = 50;

    const skeletons = Array.from({ length: skeletonCount }, (_, index) => (
      <ListItem key={index}>
        <Skeleton variant="rounded" height={15} width={12} sx={{ marginRight: '16px', marginLeft: '3px' }} />
        <Skeleton variant="circular" height={49} width={49} sx={{ marginRight: '12px' }} />
        <Box>
          <Skeleton variant="rounded" width={180} height={15} sx={{ marginBottom: '10px' }} />
          <Skeleton variant="rounded" width={180} height={15} />
        </Box>
      </ListItem>
    ));

    return skeletons;
  };
 
  const renderUserItem = (user, index) => (
    <ListItem
      key={index}
      onClick={() => setSelectedItem(index)}
      sx={{ paddingLeft: '10px' }}
    > 
      <Box 
        width={30} 
        height={30} 
        sx={{ display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              fontWeight: 'bold',
              color: (selectedItem === index) ? '#9590E4' : 'none'
            }}
      >
        {index+1}
      </Box>
      
      <ListItemAvatar sx={ {marginRight: '8px', marginLeft: '5px'} }>
        <Avatar 
          alt={user.name} 
          sx={{ border: (selectedItem === index) ? '2px solid #9590E4' : 'none', 
                padding: (selectedItem === index) ? '5px' : '7px', 
                bgcolor: 'white'
              }}>
          <Helmet fill='black' className={`helmetAvatar ${user.color}`}/>
        </Avatar>
      </ListItemAvatar>

      <ListItemText 
        primary={
          <div style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '180px' // Adjust the maximum width as needed
            }}
          >
            {user.name}
          </div>} 
        secondary={
          <>
            <span style={{ color: '#9590E4' }}>{user.time}</span>
            <span style={{ color: '#558ADA' }}>{`  | ${user.speed} км/ч`}</span>
          </>
        }/>
    </ListItem>
  );

  return (
    <div style={useStyles.root}>
      <List>
        {users.map((user, index) => renderUserItem(user, index))}
        {isLoading && showSkeletons()}
      </List>
    </div>
  );
};


export default App;
