import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backgroundBlendMode: 'darken',
    },
    border: {
        border: 'solid',
    },
    fullHeightCard: {
        height: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        backgroundColor: '',
        position: 'relative'
    },
    detailContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        transition: '0.5s',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },
    overlay2: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
    },
    grid: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
        // maxHeight: '20px',
    },
    title: {
        padding: '0 16px',
        // maxHeight: '20px'
        height: 'max-content',
        fontSize: '2vw',
        fontWeight: 'bold',
        [theme.breakpoints.down('md')]: {
            fontSize: '2vw'
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '4vw'
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: '15px'
        },
    },
    cardActions: {
        position: 'relative',
        padding: '0px 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        // top: '100%'
    },
    cardImageContainer: {
        width: '100%',

    },

    cardMessage: {
        maxHeight: '260px',
        overflow: 'hidden',
    },
    cardAction: {
        textAlign: 'initial',
        transition: '0.5s',
        position: 'relative',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItem: 'center',
        // height: '100%',
        cursor: 'pointer',
        '&:hover': {
            '& $detailContainer': {
                opacity: '0.2',
            },
            '& $watchMore': {
                opacity: '1',
            },
        },
    },
    watchMore: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        // display: 'none',
        fontSize: '17px',
        transition: '0.5s',
        opacity: '0',
        fontWeight: 'bold',
        color: '#3f51b5'
    },
    containerBtnBase: {
        transition: '0.5s',
    },
}));