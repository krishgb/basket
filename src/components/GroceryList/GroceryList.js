import { useEffect, useState } from 'react'
import Grocery from "../Grocery/Grocery"
import classes from './GroceryList.module.scss'

const GroceryList = ({ items }) => {

    const { item, categories } = items

    const [selected, setSelected] = useState({ name: 'fruit', id: 1 })

    const [groceries, setGroceries] = useState([])

    useEffect(() => {
        setGroceries(item.filter(i => i.categoryId === selected.id))
    }, [item, selected.id])


    const showSelected = (name, id) => {
        setSelected({
            name: name.toLowerCase(),
            id
        })
    }
    return (
        <>
            <div className={classes.groceries}>

                {categories.map(
                    category =>
                        <h1
                            key={category.id}
                            onClick={() => showSelected(category.name, category.id)}
                            className={selected.name === category.name.toLowerCase() ? classes.selected : ''}
                        >{category.name === 'Dairy' ? 'Dairy Products' : (category.name === 'Meat' ? 'Meat' : `${category.name}s`)}</h1>


                )}
            </div>

            <div className={classes.items}>
                {groceries.map(grocery =>
                    <Grocery
                        key={grocery.id}
                        grocery={grocery}
                    />)}
            </div>



        </>
    )
}

export default GroceryList
