import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([])
    const [category,setCategory] = useState("all")


    const fetchProducts = async () => {
        let url = "https://fakestoreapi.com/products"
        if(category == 'all'){
            const response = await fetch(url)
            const data = await response.json();

            setProducts(data)
        }
        else{
            console.log('else');
            
            const filterurl = `https://fakestoreapi.com/products/category/${category}`
            const response = await fetch(filterurl)
            const data = await response.json();

            setProducts(data)
        }

    }

    
console.log(products,'set');


    useEffect(
        () => {
            fetchProducts();
        },[category]
    )
    // [ ] represents dependency



    console.log(products, 'pr');

    return (
        
            <div className="m-4 bg-primary p-2 text-dark bg-opacity-25">
                <h1 className="d-flex justify-content-center text-info bg-dark">
                    Products Page
                </h1>
                <div className="container">
    
                    <button onClick={() => setCategory('all')} className="btn btn-secondary m-2">All</button>
                    <button onClick={() => setCategory("men's%20clothing")} className="btn btn-secondary m-2">Mens Clothing</button>
                    <button onClick={() => setCategory("women's%20clothing")} className="btn btn-secondary m-2">Women Clothing</button>
                    <button onClick={() => setCategory('jewelery')} className="btn btn-secondary m-2">Jewelwery</button>
                    <button onClick={() => setCategory('electronics')} className="btn btn-secondary m-2" >Electronics</button>
    
                    <div className="col ">
                        {
                            products.map((item,index) => (
                                <div className="col-9" key={index}>
    
                                    <div className="border  border-dark d-flex flex-row align-items-center py-5 mx-2 my-3">
                                        <div className="mb-2 mx-5"><img src={item.image} alt=""  width='100px' height='100px'  /></div>
                                        <div>
                                            <Link to = {`/products/${item.id}`}><h5>{item.title}</h5></Link>
    
    
                                            <div className="fv-bold fs-3"><sup>$</sup>{item.price}</div>
                                            <button className="btn btn-warning border rounded-pill">Add to cart</button>
                                        </div>
    
                                    </div>
                                </div>
    
    
                            ))
                        }
                    </div>
                </div>
    
    
            </div>
        

    )
}

export default Products