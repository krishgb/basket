import { useContext } from 'react'
import { ThemeContext } from '../../App'
import classes from './Orders.module.scss'

function Orders({ orders }) {

    const total = orders.map(order => order.price).reduce((prev, next) => prev + next, 0)
    const { removeAllItem, removeItem } = useContext(ThemeContext)

    return (
        <>
            <hr />
            <div>
                <h1>Your Orders</h1>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>
                                <i
                                    className={`fa fa-trash ${classes.trash}`}
                                    onClick={removeAllItem}
                                ></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {orders.map((order, index) =>
                            !order.price ? null :
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{order.name}</td>
                                    <td>{order.quantity} {order.quantityType === 'kg' ? 'kg' : `${order.quantityType}(s)`}</td>
                                    <td>{order.price.toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                        style: 'currency',
                                        currency: 'INR'
                                    })}</td>
                                    <td>
                                        <i
                                            className={`fa fa-trash ${classes.trash}`}
                                            onClick={() => removeItem(order.name)}
                                        ></i></td>
                                </tr>
                        )}


                        {/* Total */}
                        <tr style={{ background: 'lightgreen', fontWeight: 'bold', color: 'black' }}>
                            <td colSpan="3">Total</td>
                            <td>{total.toLocaleString('en-IN', {
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'INR'
                            })}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default Orders
