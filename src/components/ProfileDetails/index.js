import { useState } from "react"
import Header from "../Header"
import Cookies from "js-cookie"
import "./index.css"
const ProfileDetails=(props)=>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [isFirstNameErr,   setIsFirstNameErr] = useState(false)
    const [isLastNameErr, setIsLastNameErr] = useState(false)
    const [isMobileNoErr, setIsMobileNoErr] = useState(false) 





    const onAddFirstName=(event)=>{
        setFirstName(event.target.value)
    }
    
    const onAddLastName=(event)=>{
        setLastName(event.target.value)
    }
    
    const onAddContactNumber=(event)=>{
        setMobileNo(event.target.value)
    }

    const onAddProfileDetails=async (event)=>{
        event.preventDefault()
        if (firstName===""){
            setIsFirstNameErr(true)

            return
        }
        if (lastName===""){
            setIsFirstNameErr(false)
            setIsLastNameErr(true)
            return
        }
        if (mobileNo===""){
            setIsFirstNameErr(false)
            setIsLastNameErr(false)
            setIsMobileNoErr(true)
            return
        }
        if (!/^[0-9]{10}$/.test(mobileNo)){
            setIsFirstNameErr(false)
            setIsLastNameErr(false)
            setIsMobileNoErr(true)
            return
        }
        else{
            setIsFirstNameErr(false)
            setIsLastNameErr(false)
            setIsMobileNoErr(false)
        }


        const token=Cookies.get("token")
        const user={
            pandit_id:1,
            first_name: firstName,
            last_name: lastName,
            contact_number: mobileNo,
            profile_image:"https://res.cloudinary.com/dzcpsxjuv/image/upload/v1729253527/new%20icons/yscxtltjlbhg7gtjr5n2.png"
        }

        const url=`https://test.backend.urbanoinfotech.com/api/v1/pandit/${user.pandit_id}`
        const options={
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(user)
        }

        const response= await fetch(url, options)
        const data=await response.json()
        console.log(data)
        props.history.replace("/categories")
        }

    

    return (

        <>
        <div className="profile-top-container">
        <Header/>
            <img src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1729253527/new%20icons/f9okm8er7kt6tdwzzeum.png"  className="arrow-back" alt="arrow" />
            <div className="profile-details-container">
                <div className="profile-card-container">
                    <h1 className="profile-details-title">Profile Details</h1>
                    <img src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1729253527/new%20icons/yscxtltjlbhg7gtjr5n2.png" className="pandit-logo" alt="pandit" />
                    <form className="profile-form-container" onSubmit={onAddProfileDetails} >
                        <div className="user-data-filed">
                            <label className="p-label" htmlFor="firstName">First Name:</label>
                            <input className="p-input" value={firstName} type="text" id="firstName" placeholder="Enter First Name" onChange={onAddFirstName} /> 
                            {isFirstNameErr && <span className="p-error-msg">*Required</span>}
                        </div>
                        <div className="user-data-filed">
                            <label className="p-label" htmlFor="lastName">Last Name:</label>
                            <input className="p-input" type="text" value={lastName} id="lastName" placeholder="Enter Last Name" onChange={onAddLastName} />
                            {isLastNameErr && <span className="p-error-msg">*Required</span>}
                        </div>
                        <div className="user-data-filed">
                            <label className="p-label" htmlFor="phone">Contact Number:</label>
                            <input className="p-input" type="tel" value={mobileNo} id="phone" placeholder="Enter a Contact Number" onChange={onAddContactNumber}  />
                            {isMobileNoErr && <span className="p-error-msg">*Required, 10 digits only</span>}
                        </div>
                        <div className="user-data-filed">
                            <button className="p-save-button" type="submit">
                                Save
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        
        
        </>

    )
}

export default ProfileDetails;