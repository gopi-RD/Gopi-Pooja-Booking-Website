import { useState } from "react"
import {withRouter} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"

const Header=(props)=>{
    const [isLogout,setIsLogout]=useState(false)

    const token=Cookies.get("token")
    const onLogoutButton=()=>{
        setIsLogout(true) 
    } 

    const onCancelLogout=()=>{
        setIsLogout(false)
    }
    const onConfirmLogout=()=>{
        setIsLogout(false)
        Cookies.remove("token")
        props.history.replace("/login")
        
    }

    return (
        <div className="header-container">
        <header className="nav-responsive-container">
            <div className="website-logo-container">
                <img src="https://s3-alpha-sig.figma.com/img/6c85/cb8f/85b58141bd48f98fb066904cca579519?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T98BcLbcitKEFgswX3Uewxm1nFuQbc4iBcIrE8xT3XWMDrnkjhT-9QOtY7UcZ64d-~6oPwqo27yvO1CHIrIr0pc8sV4X-C1-gg~P~kbk1NguKUkFdzk3CTiRwEHpRQ2rMbxKqirVz3CGnbE8J6F4UmEqcJ7OLicG5li3OLET8o1bWD06g1h2G74z1yPMhyYWkAQCFiowO~rgfvuy2cFjU8JMNBvM~JFjxHpHtClgRf8ALE08E8qjp2Ji-N0vN86LyZf0z4efqaxQFr8LaJlmj~DNz0xd1CNtEDbxrizxMhttjey64XMYLmMRm2VRFKaLMcm3MB1dBpwnCwx0tns4CA__" className="website-logo" alt="Temple"/>
            </div>

            {
                    token!==undefined ? (
                        <img src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1729325316/new%20icons/cs5vjgwcikazmzraba7c.png" className="logout-button" alt="Logout" onClick={onLogoutButton} />

                    ) : (
                        <p className="create-account">Don’t have a account? </p>
                    )
                }

                {
                    isLogout && (
                        <div className="popup-container">

                            <div className="card-container">

                                <h1 className="content-heading">
                                Are you sure you want to log out?
                                </h1>
                                <div className="buttons-container">
                                    <button className="cancel-btn" onClick={onCancelLogout}>
                                        Cancel
                                    </button>
                                    <button className="confirm-btn" onClick={onConfirmLogout}>
                                        Confirm
                                    </button>
                                </div>


                            </div>

                        </div>
                    )
                }
                
                
                
               
        </header>
        </div>
    )
}

export default withRouter(Header)