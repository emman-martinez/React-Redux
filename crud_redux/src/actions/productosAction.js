import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from './../types';

import clienteAxios from './../config/axios';
import Swal from 'sweetalert2';

// ***** Crear Nuevos Productos ***** //
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
});

// Si hubo un error
const agregarProductoError = (estado) => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

// ***** Leer Productos ***** //
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargaProductos());
        
        try {
            const respuesta = await clienteAxios.get('/productos');
            // console.log(respuesta.data);
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error);
            dispatch(descargaProductosError());
        }

    }
}

const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = (productos) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

// ***** Eliminar Productos ***** //
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        console.log(id);
        try {
            const resultado = await clienteAxios.delete(`/productos/${id}`);
            console.log(resultado);
            dispatch(eliminarProductoExito());
            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'Tu producto ha sido eliminado.',
                'success'
            )
        } catch(error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = (id) => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});

// ***** Actualizar Productos ***** //
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoAction(producto));
    }
}

const obtenerProductoAction = (producto) => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto 
})