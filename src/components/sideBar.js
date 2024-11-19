import { Outlet } from 'react-router-dom'
import Logo from '../pages/Logo'
import AppNav from './appNav'
import styles from './Sidebar.module.css'

function SideBar(){
    return(
        <div className={styles.sidebar}>
            <Logo></Logo>
            <AppNav></AppNav>
            <Outlet></Outlet>
            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by Worldwise.</p>
            </footer>
        </div>
    )
}

export default SideBar