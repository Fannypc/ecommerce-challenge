import React from "react";
import NavbarApp from "../../common/navbar";
import {Container} from 'react-bootstrap';
import OrderDetails from './orderDetails';
import { useParams } from 'react-router-dom';

export default function Details(props){
    const {id} = useParams();
    return(
        <div className="home-container">
            <NavbarApp/>
            <Container>
                <OrderDetails number={id}/>
            </Container>
        </div>
    );
}