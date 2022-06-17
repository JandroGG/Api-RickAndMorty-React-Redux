import './App.css';
import Characters from './components/Characters';
import Header from './components/Header'

import { Provider } from 'react-redux'
import generateStore from './redux/store.js'

function App() {

  const store = generateStore();

  return (
    <Provider store={store}>
      <Header />
      <Characters />
    </Provider>
  );
}

export default App;
