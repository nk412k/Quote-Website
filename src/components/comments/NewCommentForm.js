import { useRef,useState,useEffect } from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import {addComment} from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner'

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const [isValidComment,setValidComment]=useState(true);
  const {sendRequest,status,error}=useHttp(addComment);
  const {onAddHandler}=props;

  useEffect(()=>{
    if(status==='completed' &&!error)
    onAddHandler();
  },[status,onAddHandler,error])

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredComment=commentTextRef.current.value;
    const commentIsValid=enteredComment.trim()!=='';
    setValidComment(commentIsValid);
    if(!commentIsValid){
      return;
    }
    commentTextRef.current.value='';   
    sendRequest({ commentData: { text: enteredComment }, quoteId: props.quoteId }); 
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div
        className={`${classes.control} ${
          isValidComment ? "" : classes.invalid
        }`}
        onSubmit={submitFormHandler}
      >
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
