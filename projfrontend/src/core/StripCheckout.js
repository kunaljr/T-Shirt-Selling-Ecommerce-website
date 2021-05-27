import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';




const StripCheckout=({products, setReload= f => f , reload = undefined})=> {

    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })

    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;

    const getFinalAmount = () => {
        let amount = 0;
        products.map(p=>{
            amount = amount + p.price;
        });
        return amount;
    }

    const makePayment=(token)=>{
        const body={
            token,
            products
        }

        const headers={
            "Content-Type":"application/json"
        };

        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(response =>{
            console.log(response);
            //call further methods here
            const {status} = response;
            console.log("STATUS",status)
            
        }).catch(err => console.log(err))
    }

    const showStripButton = () =>{
        return isAutheticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51IuOhpSF18hgw1x3b7n2LSdyby7T3OHexg0z1wAdsNZQgYeapFPxXF0V6WDmHjyhKpBot4ULgGyWcDf51xn6Im7x001WfQxkCG"
            token={makePayment}
            amount={getFinalAmount() * 100}
            name="Buy Tshirts"
            shippingAddress
            billingAddress>
            <button className="btn btn-success">Pay with Strip</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        );
    }


    return (
        <div>
            <h3 className="text-white">Strip Checkout : {getFinalAmount()} $</h3>
            {showStripButton()}
        </div>
    )
}


export default  StripCheckout;
