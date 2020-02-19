import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import uuidv1 from 'uuid/v1';
import { firestore } from '../services/Firebase';
import { Link } from 'react-router-dom';
import './PostPreview.css';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

const DialogTitle = withStyles(styles)(props => {
    const { classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant='h6'>Likes</Typography>
            {onClose ? (
            <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

class LikeDialog extends Component {
    unsubscribeFromSnapshot = null;

    constructor(props) {
        super(props);
        this.state = { open: false, likes: [] };
    }

    componentDidMount() {
        const { postID } = this.props;
        const postRef = firestore.doc(`posts/${postID}`);
        this.unsubscribeFromSnapshot = postRef.onSnapshot(snapshot => {
            if (snapshot.exists) {
                const postLikes = Object.values(snapshot.data().likes);
                this.setState({ likes: postLikes });
            } else {
                this.setState({ likes: [] });
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { open, likes } = this.state;

        return (
            <div>
                <Dialog fullWidth maxWidth={'sm'} onClose={this.handleClose} aria-labelledby='customized-dialog-title' open={open}>
                    <DialogTitle id='customized-dialog-title' onClose={this.handleClose} />
                    <DialogContent dividers>
                        {
                            likes.map(like => (
                                <div key={uuidv1()}>
                                    <img src={like ? like.photoURL : ''} className='br-100 h2 w2 dib v-mid mr2 mv2' alt='profile pic' />
                                    <Link onClick={this.handleClose} to={`${process.env.PUBLIC_URL}/profile/${like ? like.id : ''}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <span className='fw7 pointer profile-link v-mid'>{like ? like.displayName : ''}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default LikeDialog;
