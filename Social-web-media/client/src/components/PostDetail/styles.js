import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '450px',

    },
    card: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column-reverse',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap',
            flexDirection: 'colum-reverse',
        },
    },
    section: {
        borderRadius: '20px',
        marginTop: '60px',
        flex: 1,
    },
    recommendedPosts: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    loadingPaper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '15px',
        height: '100vw',
        width: '100%'
    },
    commentsOuterContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        // flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }
    },
    commentsInnerContainer: {
        height: '200px',
        overflowY: 'auto',
        marginRight: '30px',
    },
    title: {
        fontSize:' 30px',

    },
    imageRecommend:{
        height: '100px',
        borderRadius: '20px',
        objectFit: 'cover',
    },
}));