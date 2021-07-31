import classes from './Header.module.scss'

const Header = (props) => {

    return (
        <>
            <header className={classes.header}>
                <div className={classes.logo}>
                    <i className="fa fa-shopping-basket"></i>
                    <h1>Basket</h1>
                </div>

                <div>
                    <input type="text" placeholder="Search grocery" onChange={props.searchHandler} />
                </div>

            </header>
        </>
    )
}

export default Header
