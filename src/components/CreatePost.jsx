import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';


const CreatePost = ({ handleChange, handleSubmit, handleReset, titleField, contentField, currentUser }) => (
    <div>
        <h1>Create a New Post</h1>
        <form onSubmit={e => { e.preventDefault() }}>
            <div className='db mt4'>
                <TextField
                    id="title"
                    label="Enter a Title"
                    onChange={handleChange}
                    type="title"
                    name="titleField"
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
                <Link to={`${process.env.PUBLIC_URL}/`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' type='reset' onClick={handleReset}>
                        Cancel
                    </Button>
                </Link>
            </div>
            <div className='pa3 dib'>
                <Button variant='contained' type='reset' onClick={handleReset} color='secondary'>
                    Clear
                </Button>
            </div>
            <div className='pa3 dib'>
                {
                    currentUser ?
                        <Link to={`${process.env.PUBLIC_URL}/${titleField.trim() && contentField.trim() ? '' : 'newpost'}`} style={{ textDecoration: 'none' }}>
                            <Button variant='contained' type='submit' onClick={handleSubmit} color='primary'>
                                Post
                            </Button>
                        </Link>
                    :   <Button variant='contained' type='submit' onClick={handleSubmit} color='primary' disabled>
                        Post
                        </Button>
                }
            </div>
        </form>
    </div>
);

export default CreatePost;