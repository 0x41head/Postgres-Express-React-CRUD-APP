import './App.css';

import InputTODO from './components/InputTODO';
import TODOlist from './components/TODOlist';


function App() {
  return (
    <>
      <div className='container'>
        <InputTODO />
        <TODOlist />
      </div>
    </>
  );
}

export default App;
