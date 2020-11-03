import { Switch, Route, Redirect } from 'react-router-dom';

import CreateLink from './components/CreateLink';
import LinkList from './components/LinkList';
import LoginOrSignup from './components/LoginOrSignup';
import Search from './components/Search';

const Routes = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/new/1" />} />
    <Route path="/create" component={CreateLink} />
    <Route path="/login-or-signup" component={LoginOrSignup} />
    <Route path="/search" component={Search} />
    <Route path="/top" component={LinkList} />
    <Route path="/new/:page" component={LinkList} />
  </Switch>
);

export default Routes;
