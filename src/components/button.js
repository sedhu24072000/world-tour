import style from './Button.module.css'

function Button({children,type,onclick}){
    return(
        <div>
            <button className={`${style.btn} ${style[type]}`} onClick={onclick}>{children}</button>
        </div>
    )
}

export default Button;