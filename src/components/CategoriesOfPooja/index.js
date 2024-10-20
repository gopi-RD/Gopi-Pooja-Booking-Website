import { useState,useEffect } from "react"
import Cookies from "js-cookie"
import Header from "../Header"
import PoojaContext  from "../../context/PoojaContext"
import "./index.css"
const CategoriesOfPooja=(props)=>{
    const [categoriesList,setCategoriesList]=useState([])
    const [activeCatgory,setActiveCatgory]=useState(null)

    useEffect(()=>{

        const getCategoryDetails=async()=>{
            const token=Cookies.get("token")
            const url="https://test.backend.urbanoinfotech.com/api/v1/category"
            const options={
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
            const response= await fetch(url,options)
            const data=await response.json()
            if(response.ok){
                const updatedData=data.results.data.map(item=>({
                   id:item.id,
                   name:item.name,
                   description:item.description,
                   image:item.image,
                   nameLocalLang:item.name_local_lang,
                   isSelect:false

                }))
                setCategoriesList(updatedData)
            }else{
                console.error("Error fetching categories",response.statusText)
            }

        }

        getCategoryDetails()
    },[])


    const onSelectCatgoryItem=(id)=>{ 
        setCategoriesList(categoriesList.map(item=>({...item,isSelect:item.id===id})))
        setActiveCatgory(id)
    }

    return (
        <PoojaContext.Consumer>

            {
                value=>{
                    const {updateActiveId}=value

                    const onChangeService=()=>{
                        updateActiveId(activeCatgory)
                        props.history.replace("/service")
                    }

                    return (

                    <div className="top-category-container">
                        <Header/>
                        <div className="category-pooja-container">
                            <h1 className="category-pooja-heading"> Categories of Pooja</h1>
                            <ul className="categories-list-items">
                                {
                                    categoriesList.map(category=>(
                                        <li className={`category-Card-container ${category.isSelect && "active-category"}`} key={category.id} onClick={()=>onSelectCatgoryItem(category.id)} >
                                                <img src="https://s3-alpha-sig.figma.com/img/f9d3/d97a/9ce99316ef414376f3014b3de31e162b?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RReaZUti34qOqzHmwZOzYzzA6gJ6SUdrhkujGwYYxy0xp5n3yS~dpBjSXTcDhFD38mwPjYfj6RSbwPlDdh7ZdgnkALpli3yYgZCJCzCbwgH0mpptaUG1KpygIK3Hr6dDy69tKGzjGUajRKfr0MPkB3eUaTq8eMDY5~ogbcWcVwhQBbuFauDQ3vG94~AHK8nntJ9KJ8DXWCDZ~yqtew37iJ1lzjbbMd15enB6R7By~mqLQp8dDuHT85Vsrk2yTfE7bFpBUr~8LisueReh7yw4p~vb~tRIJ1PYkA56a5RAdTBBG-ANw-W24Neyb4yaSY4zM0n3~PfPusr2WLgpUUHEBg__" className="pooja-img" alt="category Pooja" />
                                                <div className="catergory-description-container">
                                                    <h1 className="category-name">
                                                        {category.name} <sapn className="local-name">
                                                            {`( ${category.nameLocalLang} )`}
                                                        </sapn>
                                                    </h1>
                                                    <p className="category-description">
                                                        {category.description}
                                                    </p>
                                            </div>

                                        </li>
                                    ))
                                }
                            </ul>
                            <button className="next-button" onClick={onChangeService}>
                                        Next
                            </button>
            </div>
           
                    </div>

                    )

                }
            }

        </PoojaContext.Consumer>
        
    )

}

export default CategoriesOfPooja