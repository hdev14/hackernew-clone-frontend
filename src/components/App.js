import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import LoginOrSignup from './LoginOrSignup';
import Search from './Search';

const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/new/1" />} />
        <Route path="/create" component={CreateLink} />
        <Route path="/login-or-signup" component={LoginOrSignup} />
        <Route path="/search" component={Search} />
        <Route path="/top" component={LinkList} />
        <Route path="/new/:page" component={LinkList} />
      </Switch>
    </div>
  </div>
);

export default App;
