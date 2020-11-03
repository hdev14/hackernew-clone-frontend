import Routes from './Routes';

import Header from './components/Header';

const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Routes />
    </div>
  </div>
);

export default App;
