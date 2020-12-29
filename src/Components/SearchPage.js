import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Searchpage = () => {
  const classes = useStyles();
  const [term, SetTheTerm] = useState('');
  const [results, setResults] = useState([]);


  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php',{
        params: {
          action : 'query',
          list : 'search',
          origin : '*',
          format : 'json',
          srsearch : term
               }
              });
        setResults(data.query.search);
    };
    
    if(term){
      search();
    }
  },[term]);

  
  const renderedResults = results.map((result) => {
    return (
      <div className = "item" key = {result.pageid}>
      <div className = "right floated content">
      <a href = {'http://en.wikipedia.org?cruid=${result.pageid}'} className = "ui button">Go</a>
      </div>
        <div className = "content">
        <div className = "header">{result.title}</div>
        <span dangerouslySetInnerHTML = {{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
    <center>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Search" variant="outlined" 
        value = {term}
        onChange = {(e) => SetTheTerm(e.target.value)}
      />
    </form>
    </center>
    <div className = "ui celled list">{renderedResults}</div>
    </div>
  );
}

export default Searchpage;