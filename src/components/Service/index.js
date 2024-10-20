
import { useState ,useEffect } from "react"
import Cookies from "js-cookie"
import Header from "../Header"
import "./index.css"
const Service=(props)=>{
    const [serviceList, setServiceList] = useState([])
    const [selectedServices, setSelectedServices] = useState([])
    const [isSearch, setIsSearch] = useState("")
    useEffect(()=>{

        const onGetData=async()=>{
            const token=Cookies.get("token")
            const url="https://test.backend.urbanoinfotech.com/api/v1/pandit"
            const options={
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

            const response= await fetch(url,options)
            const data=await response.json()
            console.log(data)
            if (response.ok){
                const updateData = data.results.data.map(eachItem=>({
                    panditService:eachItem.pandit_service,
                    profileImage:eachItem.profile_image,
                    isSelect:false,
                    id:eachItem.id
                }))
               
           

                setServiceList(updateData)
            }
            
        }

        onGetData()
    },[isSearch])


    const onSelectManyItems=(id)=>{
        const updatedList=serviceList.map(item=>({...item,isSelect:item.id===id?!item.isSelect:item.isSelect}))
        setServiceList(updatedList)
        setSelectedServices(updatedList.filter(item=>item.isSelect))

    }
    const onChangeSearch=(event)=>{
        setIsSearch(event.target.value)
    }
    

   
    const onAddMySerivces=()=>{
        props.history.replace("/service-update")
    }

    return (
        <div className="top-service-container">
            <Header/>
            <div className="service-select-container">
            <h1>Service Select</h1>

            <div className="search-and-filter-container">
                <div className="search-container">
                    <input type="search" placeholder="Search" className="search-input" onChange={onChangeSearch}/>
                    <img src="https://res.cloudinary.com/dzcpsxjuv/image/upload/v1729326192/new%20icons/wgpua0psjpf3gwitvdi2.png" className="search-icon" alt="search" />
                </div>
            </div>
            <ul className="service-list-container">

                {
                   serviceList.map(item=>(

                        item.panditService.map(service=>(
                            service.category===1 && (
                                <li className={`service-item-container ${ item.isSelect && "active-serivce"}`} onClick={()=>onSelectManyItems(item.id)}>
                                <img src="https://s3-alpha-sig.figma.com/img/f9d3/d97a/9ce99316ef414376f3014b3de31e162b?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RReaZUti34qOqzHmwZOzYzzA6gJ6SUdrhkujGwYYxy0xp5n3yS~dpBjSXTcDhFD38mwPjYfj6RSbwPlDdh7ZdgnkALpli3yYgZCJCzCbwgH0mpptaUG1KpygIK3Hr6dDy69tKGzjGUajRKfr0MPkB3eUaTq8eMDY5~ogbcWcVwhQBbuFauDQ3vG94~AHK8nntJ9KJ8DXWCDZ~yqtew37iJ1lzjbbMd15enB6R7By~mqLQp8dDuHT85Vsrk2yTfE7bFpBUr~8LisueReh7yw4p~vb~tRIJ1PYkA56a5RAdTBBG-ANw-W24Neyb4yaSY4zM0n3~PfPusr2WLgpUUHEBg__" className="service-img" alt="service" />
                                <div className="service-description">
                                    <h1 className="service-heading">
                                    Graph Pravesh <br/> ( गृह प्रवेश)
                                    </h1>
                                    <p className="service-duration">
                                        {service.duration} hours
                                    </p>
                                    <p className="service-duration">
                                       INR {service.dakshina}
                                    </p>
                                </div>
    
                            </li>
    
    
                            )
                        ))
                       
                        
                        
                    ))
                }


            </ul>
            <div className="add-serivce-container">
                <button className="add-my-serivce-btn" onClick={onAddMySerivces}>Add to my serivces</button>
            </div>
            </div>
            
        </div>
    )
}

export default Service