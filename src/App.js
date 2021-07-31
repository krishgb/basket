import { useState, createContext, useEffect } from 'react';
import './App.css';
import { items } from './items'
import Header from './components/Header/Header'
import GroceryList from './components/GroceryList/GroceryList'
import Orders from './components/Orders/Orders';
import Footer from './components/Footer/Footer';
import Grocery from './components/Grocery/Grocery';



export const ThemeContext = createContext()

function App() {
  const [searchItem, setSeaarchItem] = useState([])
  const [ordered, setOrdered] = useState({})
  const [prices, setPrices] = useState([])

  const removeItem = itemName => {
    const newState = ordered
    delete newState[itemName]

    setOrdered({ ...newState })
  }

  const removeAllItem = () => {
    setOrdered({})
  }

  const addOne = item => {
    setOrdered({
      ...ordered,
      [item.name]: !ordered[item.name] ? 1 : ++ordered[item.name]
    })
  }

  const removeOne = item => {
    const state = {
      ...ordered,
      [item.name]: !ordered[item.name] ? 0 : --ordered[item.name]
    }
    if (state[item.name] === 0) removeItem(item.name)
    else setOrdered({ ...state })
  }



  useEffect(() => {
    const orders = Object.keys(ordered).map(order => (
      {
        name: order,
        quantity: ordered[order],
        price: ordered[order] * items.item.filter(i => i.name === order)[0].price,
        quantityType: items.item.filter(i => i.name === order)[0].quantityType
      }))
    setPrices(orders)
  }, [ordered])


  const searchHandler = (event) => {
    if (!event.target.value.trim().length) {
      setSeaarchItem([])
      return
    }
    setSeaarchItem(items.item.filter(i => i.name.toLowerCase().trim().includes(event.target.value)))

  }


  return (
    <div className="App">
      <Header searchHandler={searchHandler} />

      <ThemeContext.Provider value={{ ordered, addOne, removeOne, removeItem, removeAllItem }}>
        {
          !searchItem.length ?
            <GroceryList items={items} />
            :
            <div className="itemFlex">
              {searchItem.map(item =>
                <Grocery key={item.id} grocery={item} />
              )}
            </div>
        }
        <Orders orders={prices} />
      </ThemeContext.Provider>



      <Footer />

    </div>
  );
}

export default App;
