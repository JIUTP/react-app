import styles from './Button.module.css'
function Button({active,width,height,onClick,btnClassName,children}){
    return (
        <button
            className={`${styles.btn} ${active?styles.active:""} ${btnClassName&&btnClassName}`}
            style={{width:width?width:'',height:height?height:''}}
            onClick={onClick}
        >
            {
                Array.isArray(children) ? children.map(child=>child) : children && children
            }
        </button>
    )
}
export default Button;
