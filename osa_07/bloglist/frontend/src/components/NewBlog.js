import React, { useState } from 'react';
import { TextField, Box, Button } from '@material-ui/core';

const NewBlog = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = (event) => {
    event.preventDefault();

    props.createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <Box display="flex" flexDirection="column" width="20%">
          <TextField label="Author" variant="outlined" id="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
          <TextField label="Title" variant="outlined" id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
          <TextField label="URL" variant="outlined" id="url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </Box>
        <Button variant="contained" id="create">create</Button>
      </form>
    </div>
  );
};

export default NewBlog;
