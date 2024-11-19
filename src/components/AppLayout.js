import styles from './AppLayout.module.css'
import SideBar from './sideBar'
import Map from './map'
import User from './User'

function AppLayout(){
    return(
        <div className={styles.app}>
            <SideBar></SideBar>
            <Map></Map>
            <User></User>
        </div>
    )
}

export default AppLayout