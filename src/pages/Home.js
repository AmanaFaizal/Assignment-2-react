import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

    const [items, setItems, setCreateItem] = useState(null);
    const [categories, setCategories] = useState(null);

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(0);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        getItems();
        getCategories();
    },[])

    const navigate = useNavigate();

    const getItems = async () => {

        try {
            const response = await axios.get("http://localhost:8081/items");
            setItems(response.data);
         } catch (error) {
            if(error.response.status === 401) {
                navigate("/login");
            }
        } 
        
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8081/categories");
            setCategories(response.data);
         }catch (error) {
            if(error.response.status === 401) {
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

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

  
    const createItem = async () => {
        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        }

        const response = await axios.post("http://localhost:8081/items", data);
        if(response.status === 201) {
            setCreateItem();
           
        } else {
            //show error message
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
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

      <div >
            <ul >
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>logout</button>
            </ul>
       </div>

            <div className="create-box">
            <h2>Home</h2>
            <form>
                <div>
                    <label>Item Name</label>
                    <input type="text" required className="form-control" onChange={handleName} value={name} />
                </div>
                <div>
                    <label>Item  Price</label>
                    <input type="text" required className="form-control" onChange={handlePrice} value={price} />
                </div>
                <div>
                    <label>Item  Qty</label>
                    <input type="text" required className="form-control" onChange={handleQty} value={qty} />
                </div>
                <div>
                <label>Category</label>
                    <select required onChange={handleCategory}>
                        <option>Please Select</option>

                        {categories && categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}

                    </select>
                </div>
                <button className="btn btn-outline-dark btn-sm" type="submit" onClick={createItem}>Save Product</button>
            </form>
            </div>
            </>
        )
 }

export default Home;