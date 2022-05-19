import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'stretch',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  noPost: {
    width: '80%',
    height: '100px',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  container: {
    // backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center'
  }
}));