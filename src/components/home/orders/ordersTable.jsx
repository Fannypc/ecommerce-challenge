import React from "react";
import {Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function OrdersTable(props){
    return(
        <>
            <Table striped bordered hover className="bg-white" size="sm">
            <thead>
                <tr>
                <th>Number</th>
                <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {props.orders.map((item)=>
                    <tr key={item.number}>
                    <td>{item.number}</td>
                    <td><Link to={ 'details/'+ item.number }>See more</Link></td>
                    </tr>
                )}
            </tbody>
            </Table>
        </>
    );
}