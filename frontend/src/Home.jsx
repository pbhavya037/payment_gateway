import React from 'react'
import { Box, Stack } from "@chakra-ui/react"
import Card from './Card'
import axios from "axios";

const Home = () => {


    const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

        const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
            amount
        })

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "TEDxIITGuwahati",
            description: "Tutorial of RazorPay",
            image: "https://iitg.ac.in/sa/tedxiitg/Images/TEDxlogo2.svg",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    return (
        <>
            <Card amount={100} img={"https://iitg.ac.in/sa/tedxiitg/Images/blogs/Lessons.png"} checkoutHandler={checkoutHandler} />
            {/* <button onClick={() => checkoutHandler(100)}>Buy Now</button> */}
        </>
    )
}

export default Home