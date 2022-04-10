import { Fragment, useRef,useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    author: true,
    text: true,    
  });
  const [isEntering,setEntering]=useState(false);

  const isEnteringHandler=()=>{
    setEntering(true);
  }

  function submitFormHandler(event) {    
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    const enteredAuthorValid=enteredAuthor.trim()!=='';
    const enteredTextValid=enteredText.trim()!=='';

    // optional: Could validate here
    setFormInputsValidity({
      author: enteredAuthorValid,
      text: enteredTextValid,      
    });
    const formIsValid=enteredAuthorValid && enteredTextValid;
    if (!formIsValid) {
      setEntering(true);
      return;
    }     

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }
  const onLeavingHandler=()=>{
    setEntering(false);
  }

  return (
    <Fragment>
      <Prompt when={isEntering} message={(location)=>'Do yo want to change page, all your entered data will be lost'}/>
    <Card>
      <form className={classes.form} onSubmit={submitFormHandler} onFocus={isEnteringHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div
          className={`${classes.control} ${
            formInputsValidity.author ? "" : classes.invalid
          }`}
        >
          <label htmlFor="author">Author</label>
          <input type="text" id="author" ref={authorInputRef} />
        </div>
        <div
          className={`${classes.control} ${
            formInputsValidity.text ? "" : classes.invalid
          }`}
        >
          <label htmlFor="text">Text</label>
          <textarea id="text" rows="5" ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button className="btn" onClick={onLeavingHandler}>Add Quote</button>
        </div>
      </form>
    </Card>
    </Fragment>
  );
};

export default QuoteForm;
