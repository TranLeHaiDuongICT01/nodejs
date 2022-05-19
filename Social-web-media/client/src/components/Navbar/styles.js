import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
        fontSize: '2em',
        fontWeight: 300,
    },
    image: {
        marginLeft: '10px',
        marginTop: '5px',
    },
    [theme.breakpoints.down('xs')]: {
        heading: {
            fontSize: '10vw',
        }
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '400px',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            alignItems: 'center',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',    
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '15px',
        },
    },
    logout: {
        marginLeft: '20px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        // fontSize: '8vw',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        marginRight: '5px'
    },
    [theme.breakpoints.down('sm')]: {
        image: {
            height: '30px'
        },
        imageText: {
            height: '35px'
        }
    },
    [theme.breakpoints.down('lg')]: {
        userName: {
            fontSize: '1.6vw',
        }
    },
    [theme.breakpoints.down('md')]: {
        userName: {
            fontSize: '15px',
        }
    }


}));