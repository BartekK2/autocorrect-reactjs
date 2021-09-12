import {React, useEffect, useState} from 'react'
import { TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Autocomplete from '@material-ui/lab/Autocomplete';

const WikiLinks = (props) => {
    const {info, language} = props;
    if(typeof info != "undefined")
      return (<>{props.children} <a style={{
          'cursor':'pointer',
          'textDecoration':'none',
          'color':'rgb(13, 60, 97)',
          'font-weight': 'bold'}} 
        href={`https://${language}.wikipedia.org/wiki/`+info} rel="noreferrer noopener" target='_blank'> {info} </a></>);
   return null;
}

const UseEffectExample = () => {
    const [searchvalue, setSearch] = useState("");
    const [guesses, setGuess] = useState([])
    const [language, setLanguage] = useState("en")

    useEffect(() => {
        console.log(language)
        fetch(`https://${language}.wikipedia.org/w/api.php?&origin=*&action=opensearch&profile=strict&search=` + searchvalue + "&limit=10").then(function(resp) {
            return resp.json()
        }).then(function(data) {
            let filtrated = data[1].filter((e)=>{return e.split(' ').length===1 && e.length > 1})
            setGuess([filtrated[0], filtrated[1]]);
        })
      },[searchvalue, language]);

    const countryCodes = [['English','en'],['Polish','pl'],['German','de'],['French','fr'],['Dutch','nl'],['Russian','ru'],['Italian','it'],['Spanish','es'],['Japanese','ja']]
      return (
        <>
            <div style={{'margin':'0 30%'}}>
                <Autocomplete
                        id="grouped-demo"
                        options={countryCodes.sort((a, b) => -b[0].localeCompare(a[0]))}
                        groupBy={(option) => option[0][0]}
                        getOptionLabel={(option) => `${option[0]} - ${option[1]}`}
                        onChange={(event, newValue) => {
                            setLanguage(newValue ? newValue[1] : "pl")
                        }}
                        disablePortal
                        style={{'marginBottom':'20px','width':'100%'}}
                        renderInput={(params) => <TextField {...params} label="Pick your language" variant="outlined" />}
                    />

                    <TextField
                                id="login"
                                onChange={(event) => {setSearch(event.target.value);}}
                                label="Enter anything"
                                variant="outlined"
                                inputProps={{
                                    autocomplete: 'off',
                                    form: {
                                    autocomplete: 'off',
                                }}}
                                style={{'marginBottom':'20px','width':'100%'}}
                        />
            </div>
            {typeof guesses[0]!="undefined" ?
            <Alert icon={<HelpOutlineIcon fontSize="inherit" />} severity="info">
                <WikiLinks language={language} info={guesses[0]}>Did you mean </WikiLinks>
                <WikiLinks language={language} info={guesses[1]}>or </WikiLinks>?
            </Alert> :
            <Alert severity="error">No matching words were found.</Alert>
            }
            
        </>
    );
}

export default UseEffectExample;
