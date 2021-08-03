import classes from './Header.module.scss'

const Header = (props) => {


    return (
        <>
            <header className={classes.header}>
                <div className={classes.logo} onClick={props.changeLocation}>
                    <i className="fa fa-shopping-basket"></i>
                    <h1>Basket</h1>
                </div>

                <div>
                    <input type="text" placeholder="Search grocery" onKeyUp={(event) => props.searchHandler(event.target.value.trim())} />
                </div>

            </header>
        </>
    )
}

export default Header
