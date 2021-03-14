import React, {useEffect, useState} from "react";
import NavbarApp from "../../common/navbar";
import OrdersTable from "./ordersTable";
import "../layout/style.css";
import {Container, Row, Col} from 'react-bootstrap';


export default function Home(){

    const [orders, setOrders]= useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //En caso de existir se toman las ordenes de local storage
    //para persistir la informacion en caso de que se haya agregado
    //un nuevo producto
    useEffect(()=>{
        if(localStorage.getItem('orders')){
            setOrders(JSON.parse(localStorage.getItem('orders')));
            setIsLoading(false);
        }else{
            getOrders();
        }
    },[]);


    //En caso de no existir las ordenes en local storage se hace llamada a la API
    const getOrders = ()=>{
        let url = "https://eshop-deve.herokuapp.com/api/v2/orders";
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYwNTY0NDA0NzA1OH0.skfIY_7CAANkxmhoq37OI4jYRE8flx1ENq1v1VaRevJiroYNFQYz7Oy6hL1YZ1OJkevXSQFuLMHTqY0w6d5nPQ"
            }
        }
        fetch(url, options)
        .then(response=>response.json())
        .then(data=>{
            setOrders(data.orders); 
            setIsLoading(false);
            localStorage.setItem('orders', JSON.stringify(data.orders));
        })
        .catch(error=>console.log(error))
    }


    return(
        <div className="home-container">
            <NavbarApp/>
            <Container>
            <Row className="justify-content-center">
                <Col lg="9">
                    <h3>Orders</h3>
                    {isLoading && <p>Wait a moment. Loading orders...</p>}
                    {orders && <OrdersTable orders={orders}/>}
                </Col>
            </Row>
            </Container>
        </div>
    );
}