import { useState, createContext, useEffect } from 'react';
import classes from './App.module.scss';
import { items } from './items'
import Header from './components/Header/Header'
import GroceryList from './components/GroceryList/GroceryList'
import Orders from './components/Orders/Orders';
import Footer from './components/Footer/Footer';
import Grocery from './components/Grocery/Grocery';



export const ThemeContext = createContext()

function App() {
  const [searchText, setSearchText] = useState('')
  const [searchItem, setSearchItem] = useState([])
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


  useEffect(() => {
    const { item } = items
    setSearchItem(item.filter(i => i.name.trim().toLowerCase().includes(searchText)))
  }, [searchText])


  const searchHandler = (value) => {
    setSearchText(value.toLowerCase())
  }

  // eslint-disable-next-line no-restricted-globals
  const changeLocation = () => setSearchText('')

  return (
    <div className="App">
      <Header searchHandler={searchHandler} changeLocation={changeLocation} />


      <ThemeContext.Provider value={{ ordered, addOne, removeOne, removeItem, removeAllItem }}>

        {!searchText && <GroceryList items={items} />}

        {searchText && <>
          <div className={classes.home}>
            <button onClick={changeLocation}>Home</button>
          </div>
          <div className={classes.itemFlex}>

            {searchItem.map(item =>

              <Grocery key={item.id} grocery={item} />

            )}
          </div>
        </>
        }

        <Orders orders={prices} />

      </ThemeContext.Provider>



      <Footer />

    </div>
  );
}

export default App;
