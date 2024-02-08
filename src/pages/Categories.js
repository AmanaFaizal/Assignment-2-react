import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Categories = () => {

    const [categories, setCategories, setCreateCategory] = useState(null);
    const [newCategory, setNewCategory] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    },[]);

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
    const handleInput = (event) => {
        setNewCategory(event.target.value);
    }

    const createCategory = async (event) => {

        const data = {
            "name": newCategory
        }

        const response = await axios.post("http://localhost:8081/categories", data);
        if(response.status === 201) {
            setCreateCategory();
           
        } else {
            //show error message
        }
    }
       
    return (
        
        <div>
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
            <h1>Categories</h1>

            
            {categories &&
                <ul>
                    {categories.map((category) => (
                        <li>
                            <Link to={`/categories/${category.id}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            }

            <h3>Create Category</h3>
            <form >
                <label>Category Name</label>
                <input type="text" required onChange={handleInput} />

                <button type="submit" onClick={createCategory}>Save Category</button>
            </form>

            
        </div>
    )
}

export default Categories;