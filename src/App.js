import { Route, Switch, Redirect} from "react-router-dom";
import Layout from "./components/layout/Layout";
import NoQuotesFound from "./components/quotes/NoQuotesFound";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuotes";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path='*'>
          <NoQuotesFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
