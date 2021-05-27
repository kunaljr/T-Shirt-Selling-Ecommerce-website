import React,{useState,useEffect} from 'react';
import { API } from '../backend';
import "../styles.css";
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import { getProducts } from './helper/coreapicalls';
import Paymentb from './Paymentb';
import StripCheckout from './StripCheckout';



const Cart= () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
    }, [reload]);

    const loadAllProducts = products => {
        return (
            <div>
                <h1>
                    This section is to load products
                </h1>
                {products.map((product,index)=>(
                    <Card
                    key={index}
                    product={product} 
                    removeFromCart={true}
                    addtoCart={false}
                    setReload={setReload}
                    reload={reload}
                    
                    />
                ))}
            </div>
        )
    }

    const loadCheckout = () => {
        return(
            <div>
                <h2>This section is for Checkout</h2>
            </div>
        )
    }
    
    return (
        <Base title="Cart Page" description="Ready to Checkout">
            <div className="row text-center">
                <div className="col-6">{products.length > 0 ? (
                    loadAllProducts(products)
                ) : (
                <h3>No products in cart</h3>) }</div>
                <div className="col-6">
                    <StripCheckout products={products} setReload={setReload} />
                    {/* <Paymentb products={products} setReload={setReload}/> */}
                </div>
        
            </div>
        </Base>
    )
}


export default Cart;
