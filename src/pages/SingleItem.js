import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SingleItem = () => {

    const  params = useParams();

    const [item, setItem, setUpdateItem ] = useState(null);
    
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [cid, setCategoryId] = useState(null);
    const [cname, setCategoryName] = useState(null);


    useEffect(() => {
        getItemById();
    },[])
    
    const navigate = useNavigate();
   
    const getItemById = async () => {
    try {
            const response = await axios.get(`http://localhost:8081/items/${params.id}`);
            setItem(response.data);
    } catch (error) {
        if(error.response.status===401){
            navigate("/login");
        }
    } 
    }
    
    
       
    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) => {
        setQty(event.target.value);
    }

    const handleCategoryId = (event) => {
        setCategoryId(event.target.value);
    }
    const handleCategoryName = (event) => {
        setCategoryName(event.target.value);
    }

  
    const handleSubmit = async () => {
        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "category": {
                "id": cid,
                "name": cname
            }
        }

        const response = await axios.put(`http://localhost:8081/items/${params.id}`, data);
        if(response.status === 201) {
            setUpdateItem();
        } else {
            //show error message
        }
       
    }

   
    return (
        <>
         <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">  
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
        <Link to={`/login`} class="nav-link" className="navbar-link">Login</Link>
        </li>
        <li class="nav-item">
        <Link to={`/`} class="nav-link" className="navbar-link">Home</Link>
        </li>
        <li class="nav-item">
        <Link to={`/categories`} class="nav-link" className="navbar-link">Categories</Link>
        </li>
        <li class="nav-item">
        <Link to={`/items`} class="nav-link"className="navbar-link">Items</Link>
        </li>
        <li class="nav-item">
        <Link to={`/checkout`} class="nav-link"className="navbar-link">Orders</Link>
        </li>
      </ul>
    </div>
  </div>
    </nav> 
        <div> 

            <div className="create-box">
        <div>
            <h3>Update Item</h3>
        </div>
        {item &&
           <form>
                <div>
                    <label>Item Name</label>
                    <input type="text" required className="form-control" onChange={handleName} value={name} placeholder={item.name}/>
                </div>
                <div>
                    <label>Item  Price</label>
                    <input type="text" required className="form-control" onChange={handlePrice} value={price} placeholder={item.price}/>
                </div>
                <div>
                    <label>Item  Qty</label>
                    <input type="text" required className="form-control" onChange={handleQty} value={qty} placeholder={item.qty}/>
                </div>
                <div>
                <label>Category</label>
                <input type="text" required className="form-control" onChange={handleCategoryId} value={cid} placeholder={item.category.id}/>
                <input type="text" required className="form-control" onChange={handleCategoryName} value={cname} placeholder={item.category.name}/>

                </div> 
        <button className="btn btn-outline-dark btn-sm" type="submit" onClick={handleSubmit}>Update Product</button>
        </form>
}
        </div>
        </div>
        </>
    )
}


export default SingleItem;