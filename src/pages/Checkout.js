import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {

    const [items, setItems] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0)

    const getItems = async () =>{   
            const response = await axios.get('http://localhost:8081/items');
            setItems(response.data);
   }


    const createOrder = async () => {
        const ItemIds = orderItems.map(obj => obj.id);
        const data = {
            items: ItemIds
        }

        const response = await axios.post("http://localhost:8081/orders", data);
        if(response.status === 201) {
            setOrderItems([]);
            setTotal(0);
           
        } else {
            //show error message
        }
    }
    



    useEffect(() => {
        getItems();
    },[]);


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
       
            <div className="container-fluid">
                <h1>Checking Out</h1>
                <div className="row-left">
                        <h2>Items</h2>

                        {items && items.map(item => (
                            <div className="item-box px-2 py-2">
                                {item.name} - {item.price} 

                                <button className= "btn btn-outline-secondary btn-sm" onClick={() => {
                                    setOrderItems([...orderItems, item]);

                                    let currentTotal = total;
                                    currentTotal = currentTotal + item.price;
                                    setTotal(currentTotal);

                                }}>Add to Order</button>

                            </div>
                        ))}
                    </div>
                <div className="row-left">
                        <h2>Order</h2>

                        <table className="table-stripped">
                            <thead>
                                <tr>
                                    <th>Item ID</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderItems && orderItems.map(item => (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                ))}

                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        Total
                                    </th>
                                    <th>
                                        {total}
                                    </th>
                                </tr>
                                
                            </thead>
                        </table>

                        <button className="btn btn-outline-secondary btn-sm" onClick={createOrder}>Complete Order</button>
                    </div>
                </div>
        </>
    )
}

export default Checkout;
