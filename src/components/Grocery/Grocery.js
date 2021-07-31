import { useContext } from 'react'
import { ThemeContext } from '../../App'
import classes from './Grocery.module.scss'

function Grocery({ grocery }) {

    const ar = {
        ADD: 'add',
        REMOVE: 'remove'
    }
    const { addOne, removeOne, ordered } = useContext(ThemeContext)


    const toggleClass = (event, grocery, addOrRemove) => {
        addOrRemove === ar.ADD && addOne(grocery)
        addOrRemove === ar.REMOVE && removeOne(grocery)
        event.target.parentElement.classList.remove(classes.toggle)
        setTimeout(() => {
            event.target.parentElement.classList.add(classes.toggle)
        }, 0);
    }

    return (

        <div className={classes.item}>
            <div className={classes.img}>
                <img
                    src={require(`./images/${grocery.name.split(' ').join('').toLowerCase()}.${grocery.name.toLowerCase() !== 'pork' ? 'svg' : 'png'}`).default}
                    alt={grocery.name}
                />
            </div>

            <div className={classes.flex}>
                <span className={classes.itemName}>{grocery.name}</span>
                <span>{grocery.price.toLocaleString('en-IN', {
                    maximumFractionDigits: 2,
                    style: 'currency',
                    currency: 'INR'
                })
                }/{grocery.quantityType}
                </span>
            </div>

            <div className={classes.flex}>
                <i className="fa fa-minus" onClick={(event) => toggleClass(event, grocery, ar.REMOVE)}></i>
                <span>{ordered[grocery.name] || 0}{grocery.quantityType !== 'kg' ? `${grocery.quantityType}(s)` : 'kg'}</span>
                <i className="fa fa-plus" onClick={(event) => toggleClass(event, grocery, ar.ADD)}></i>
            </div>
        </div>


    )
}

export default Grocery
