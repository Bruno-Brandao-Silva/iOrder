import './App.css'
import logo from './images/logo.png';
import Orders from './components/Orders/index';

function App() {

  return (
    <>
      <div className='Container'>
        <div className='Content'>
          <img src={logo} alt="IOrders" />
          <Orders />
        </div>
      </div>
    </>
  )
}

export default App
