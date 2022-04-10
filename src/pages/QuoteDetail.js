import { Fragment, useEffect } from "react";

import { useParams, useRouteMatch, Route, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";


const QuoteDetail = () => {
  const params = useParams();
  const {quoteId}=params;
  const match=useRouteMatch();
  const {sendRequest,data:loadedQuote,error,status}=useHttp(getSingleQuote);
  useEffect(()=>{
    sendRequest(quoteId)
  },[sendRequest,quoteId]);

  if(status==='pending'){
     return (
       <div className="centered">
         <LoadingSpinner />
       </div>
     );
  }
  if (error) {
    return <p className="centered">{error}</p>;
  }  

  if (!loadedQuote) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path}>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
