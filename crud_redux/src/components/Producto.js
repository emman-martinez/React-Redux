import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux'; // Redux
import { borrarProductoAction, obtenerProductoEditar } from './../actions/productosAction';

const Producto = (props) => {

    const { producto } = props;
    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const history = useHistory(); // Habilitar histpry para redirección

    // Confirmar si desea eliminar el producto
    const confirmarEliminarProducto = (id) => {
        
        // Preguntar al usuario
        Swal.fire({
            title: '¿Estás Seguro?',
            text: "No se podrá revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                // Pasar al Action
                dispatch(borrarProductoAction(id));
                
            }
        })

    };

    // Función que redirige de forma programada
    const redireccionarEdicion = (producto) => {
        dispatch(obtenerProductoEditar(producto));
        history.push(`/productos/editar/${producto.id}`);
    };

    return (
        <tr>
            <td>{nombre}</td>
            <td><span className="font-weight-bold">$ {precio}.00</span></td>
            <td className="acciones">
                <button 
                    type="button"
                    onClick={ () => redireccionarEdicion(producto) }
                    className="btn btn-primary mr-2"
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(id)}
                >
                    Eliminar 
                </button>
            </td>
        </tr>
    );
}

export default Producto;