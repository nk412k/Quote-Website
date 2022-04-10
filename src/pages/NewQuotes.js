import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import QuoteForm from "../components/quotes/QuoteForm";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from '../hooks/use-http';
import {addQuote} from '../lib/api';

const NewQuote=()=>{
    const history=useHistory();
    const {sendRequest,status}=useHttp(addQuote);
    useEffect(()=>{
        if(status==='completed')
        history.push("/quotes");
    },[status,history])
    const onAddQuote=(quoteData)=>{
        sendRequest(quoteData);               
    }
    if(status==='pending'){
        return(
            <div className="centered">
                <LoadingSpinner/>
            </div>
        )
    }    
    return(
        <QuoteForm onAddQuote={onAddQuote}/>
    );
};

export default NewQuote;