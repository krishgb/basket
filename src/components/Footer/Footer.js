import classes from './Footer.module.scss'

function Footer() {
    return (
        <div className={classes.footer}>

            <h1><i className="fa fa-shopping-basket"></i>Basket</h1>

            <strong>Copyright &copy; {new Date().getFullYear()}</strong>
        </div>
    )
}

export default Footer

