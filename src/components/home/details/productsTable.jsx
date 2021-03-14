import React from "react";
import {Table} from 'react-bootstrap';

export default function ProductsTable(props){
    return(
        <>
            <Table responsive striped bordered hover className="bg-white">
            <thead>
                <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                props.products && props.products.map((item, index)=>
                    <tr key={item.id}>
                        <td>{item.sku}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                    </tr>
                
                )}
            </tbody>
            </Table>
        </>
    );
}