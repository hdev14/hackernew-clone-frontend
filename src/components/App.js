import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import LinkList from './LinkList';
import CreateLink from './CreateLink';
import LoginOrSignup from './LoginOrSignup';

const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route path="/create" component={CreateLink} />
        <Route path="/login-or-signup" component={LoginOrSignup} />
      </Switch>
    </div>
  </div>
);

export default App;
