import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from './../types';

import clienteAxios from './../config/axios';
import Swal from 'sweetalert2';

// ***** Crear nuevos productos ***** //
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {

        console.log('Desde Action: crearNuevoProductoAction()');
        console.log(producto);
        dispatch(agregarProducto());

        try {

            // Insertar en la API
            await clienteAxios.post('/productos', producto); 
            // Si todo sale bien actualizar el State
            dispatch(agregarProductoExito(producto));
            // Alerta
            Swal.fire(
                'Listo',
                'El producto se agregó correctamente',
                'success'
            )

        } catch(error) { 
            // Si hay un error cambiar el State
            dispatch(agregarProductoError(true));

            // Alerta de Error 
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Intenta de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

// Si el producto se guarda en la base de datos
const agregarProductoExito = (producto) => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// ***** Leer productos ***** //
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargaProductos());
    }
}

const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});