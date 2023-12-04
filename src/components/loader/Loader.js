import spinner from "../../assets/spinner.gif";
import ReactDOM from "react-dom";
import "./Loader.scss"

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="wrapper">
            <div className="loader">
                <img src={spinner} alt="Loading..." />
            </div>
        </div>,
        document.getElementById("loader")
    )
}

export const SpinnerImg = () => {
    return (
        <div className="--center-all">
            <img src={spinner} alt="Loading..." />
        </div>
    )
}

export default Loader
