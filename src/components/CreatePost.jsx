import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const CreatePost = ({ handleChange, handleSubmit, handleReset, titleField, contentField }) => (
<<<<<<< HEAD
    <form onSubmit={e => { e.preventDefault() }}>
=======
    <form onSubmit={handleSubmit}>
>>>>>>> 53627a9bf12a2e5597e2e79b86f0711597839ae4
        <div className='db'>
            <TextField
                id="title"
                label="Enter a Title"
                onChange={handleChange}
                type="title"
                name="titleField"
<<<<<<< HEAD
=======
                defaultValue=""
>>>>>>> 53627a9bf12a2e5597e2e79b86f0711597839ae4
                value={titleField}
                style={{
                    margin: 10,
                    minWidth: '50%'
                }}
                margin="dense"
                variant="outlined"
            />
        </div>
        <div className='db'>
            <TextField
                id="content"
                label="What's on your mind?"
                onChange={handleChange}
                type="content"
                name="contentField"
<<<<<<< HEAD
=======
                defaultValue=""
>>>>>>> 53627a9bf12a2e5597e2e79b86f0711597839ae4
                value={contentField}
                style={{
                    margin: 10,
                    minWidth: '50%'
                }}
                margin="normal"
                variant="outlined"
                multiline
            />
        </div>

        <div className='pa3 dib'>
            <Button variant='contained' type='reset' onClick={handleReset} color='secondary'>
                Clear
            </Button>
        </div>
        <div className='pa3 dib'>
<<<<<<< HEAD
            <Button variant='contained' type='submit' onClick={handleSubmit} color='primary'>
=======
            <Button variant='contained' type='submit' color='primary'>
>>>>>>> 53627a9bf12a2e5597e2e79b86f0711597839ae4
                Post
            </Button>
        </div>
    </form>
);

export default CreatePost;