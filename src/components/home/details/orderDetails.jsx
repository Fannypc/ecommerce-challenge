import React, {useState} from "react";
import {Card, Modal, Button, Form} from 'react-bootstrap';
import ProductsTable from "./productsTable";
import classnames from 'classnames';
import '../layout/style.css';
import '../../common/style.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Se obtiene la informacion de la orden desde local storage para
//poder agregar elementos sin el uso de la API, ya que falta endpoint para agregar producto
function getOrder(orderNumber){
    let arrayOrders = JSON.parse(localStorage.getItem('orders'));
    if(arrayOrders){
        let index = arrayOrders.findIndex(x => x.number === orderNumber);
        return arrayOrders[index];
    }
}

toast.configure();
export default function OrderDetails(props){
    // Estados de bootstrap para manejar el modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        let errors = {};
        setErrors(errors);
        setShow(false)
    };
    const handleShow = () => setShow(true);
    
    const [productData, setProductData] = useState({
        sku: '',
        name: '',
        quantity: '',
        price: ''
    });
    const [order, setOrder] = useState(getOrder(props.number));
    const [errors, setErrors] = useState({});
  
    // Antes de guardar producto nuevo se valida que los campos hayan sido informados
    // Se utiliza la libreria classnames para los estilos de error
    const saveProduct = ()=>{
        let errors = {};
        if (productData.sku === '') errors.sku = "This field is required"
        if (productData.name === '') errors.name = "This field is required"
        if (productData.quantity === '') errors.quantity = "This field is required"
        if (productData.price === '') errors.price = "This field is required"
        setErrors(errors);
        const isValid = Object.keys(errors).length === 0;

        if(isValid){
            //Se agrega el nuevo producto y se guarda el nuevo estado en local storage
            let arrayOrders = JSON.parse(localStorage.getItem('orders'));
            if(arrayOrders){
                let index = arrayOrders.findIndex(x => x.number === props.number);
                arrayOrders[index].items.push(productData);
                localStorage.setItem('orders', JSON.stringify(arrayOrders));
                setOrder(arrayOrders[index]);
                handleClose();
            }
        }
    }

    const setInputvalue = (event)=>{
        if(!!errors[event.target.name]){
            let errorsForm = Object.assign({}, errors);
            delete errorsForm[event.target.name];
            setErrors({errors: errorsForm});
            setProductData({...productData, [event.target.name]: event.target.value});
        }else{
            setProductData({...productData, [event.target.name]: event.target.value});
        }

    }

    const makePayment = ()=>{
        toast.success('Successful payment!');
    }

    return(
        <>
            <Card>
            <Card.Header as="h5">
                Order: {order && order.number}
                <Button variant="primary" onClick={makePayment} className="order-btn">
                    Pay
                </Button>
                <Button variant="primary" onClick={handleShow} className="order-btn">
                    Add Product
                </Button>
            </Card.Header>
            <Card.Body>
                <ProductsTable products={order && order.items}/>
            </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add new product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onInput={setInputvalue}>
                        <Form.Group controlId="formSKU" className={classnames({error: !!errors.sku})}>
                            <Form.Label>SKU</Form.Label>
                            <Form.Control type="text" name="sku" placeholder="Enter SKU" />
                            <span>{errors.sku}</span>
                        </Form.Group>
                        <Form.Group controlId="formName" className={classnames({error: !!errors.name})}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter name" />
                            <span>{errors.name}</span>
                        </Form.Group>
                        <Form.Group controlId="formQuantity" className={classnames({error: !!errors.quantity})}>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="text" name="quantity" placeholder="Enter quantity" />
                            <span>{errors.quantity}</span>
                        </Form.Group>
                        <Form.Group controlId="formPrice" className={classnames({error: !!errors.price})}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="price" placeholder="Enter price" />
                            <span>{errors.price}</span>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={saveProduct}>
                    Add
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}