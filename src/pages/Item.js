
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Item = () => {
    

    const [items, setItems] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getItems();
    },[])

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
 
            
        <h1>Item</h1>
        <div>
        <ol>
                {items && items.map((item) => ( 
                    <li>
                        <Link to={`/items/${item.id}`}>{item.name}</Link>
                    </li>
                ))}
            </ol>
        </div>
    </>
)
}

export default Item; 