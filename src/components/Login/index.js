import { useState } from "react"
import Cookies from "js-cookie"
import Header from "../Header"
import "./index.css"
const Login=(props)=>{
    const [mobileNo,setMobileNo]=useState("")
    const [otp,setOtp]=useState("")
    const [isError,setError]=useState(false)
    const [otpStatus,setOtpStatus]=useState(false)
    const [errorMsg,setErrorMsg]=useState("")

    const onChangeMobileText=(event)=>{
        setMobileNo(event.target.value)

    }



    const onSubmitMobile=async(e)=>{
        e.preventDefault()
        if (!mobileNo){
            setError(true)
            setErrorMsg("Please enter a valid mobile number")
            return
        }
        if (mobileNo.length<10 || mobileNo.length>10) {
            const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string) 
            if(isNumeric(mobileNo)){
                setError(true)
                setErrorMsg("Please enter a valid 10-digit mobile number")
                return
            }
        }
        else{
            setError(false)
        }

        // Simulate API call for sending OTP 
        const number={
            contact_number: mobileNo 
        }
        const url="https://test.backend.urbanoinfotech.com/api/v1/send-otp"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(number)
        }
        

        const response = await fetch(url, options)
        const data = await response.json() 
        if(response.ok){
            console.log(data)
        }
        else{
            setError(true)
            setErrorMsg(data.errors.message)
            return 
        }
        setError(false)
        setOtpStatus(true)
    }
       
    const onSendOtpToServer=(event)=>{
        setOtp(event.target.value)
    }

    const onSubmitSuccess=(token)=>{
        Cookies.set("token", token)
        const {history}=props 
        history.push("/profile-details")
        



    }

   
    
    const onSubmitOTP=async(e)=>{
        e.preventDefault()
        // Simulate API call for validating OTP
        const number={
            contact_number: mobileNo,
            otp: otp
        }
        const url="https://test.backend.urbanoinfotech.com/api/v1/pandit-login"
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(number)
        }

        const response = await fetch(url, options)
        const data = await response.json() 
        console.log(data)
        if(response.ok){
            // Redirect to dashboard page
            onSubmitSuccess(data.results.access)
            console.log(data.results.access)
            

        } else {
            setError(true)
            setErrorMsg(data.message)
        }
    }


    return (
        <div>
        <div className="bg-container"> 
            <div className="bg-left-container">
                <div className="bg-login-container">
                    {
                        otpStatus? (
                        <form className="form-container" onSubmit={onSubmitOTP}>
                       <h1 className="login-title">Log In</h1>
                        <label className="labelName">
                        Enter OTP
                        </label>
                        <input type="text" value={otp} className="custom-input" placeholder="value" onChange={onSendOtpToServer} />
                        {isError && <p className="error-msg">{errorMsg}</p>}
                        <button  type="submit" className="custom-button">
                            Submit
                        </button>
                       </form>

                        ) : (
                            <form className="form-container" onSubmit={onSubmitMobile}>
                       <h1 className="login-title">Log In</h1>
                        <label className="labelName">
                        Enter Mobile no.
                        </label>
                        <input type="text" value={mobileNo} className="custom-input" placeholder="value" onChange={onChangeMobileText} />
                        {isError && <p className="error-msg">{errorMsg}</p>}
                        <button  type="submit" className="custom-button">
                            Submit
                        </button>
                       </form>
                        )
                    }
                       
                    
                </div>
            </div>
            <div className="bg-right-container">
                <div className="text-container">
                    <p className="content">पूजा पाठ हो या अनुष्ठान,<br/>
                    <span className="content-span">पंडित</span> मिलना हुआ आसान।  </p>
                </div>
                <div className="bg-bottom-container">
                <img src="https://s3-alpha-sig.figma.com/img/3728/a488/6b91537a04814f17c6a4ef090f299bdf?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JLiCJlWRaBW1RlPULusgAsp~XFYsNNnB-82bLA79XX~Hk23aiHmkXEQo9CaY8j8XxXeJim6EBHJxyZ35GFM8SvQNHXG3m2Q1qk2oNsczPXFOiPv7CACt6pLs9Cwy614SKBS5cdHjFgCjvFyrn6IP3tIwP2-SQffqUJyWQm2nzmWKTS2DNp~TWbtHGYyVt2rGnUUrmXtcf7iIHdQcoKzcBBO5WvGPbIc1htrc5w-xpepKmk1TWL-A~vzmp5Byj7L~nkmkMyoHlYglJURg4VcAL6lu32NHP~liWaw7GmabufgP-FZ6w6wHLnZ9siaxM05TmBs38QT5BmG3~Lih0q0q-Q__" className="pandit-img" alt="pandit" />
                </div>
             </div>
             
        </div>  
        <div className="header-component">
        <Header />
        </div>
       
        </div>  
    )
}


export default Login;