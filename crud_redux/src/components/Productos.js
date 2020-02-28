import React, { Fragment, useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { obtenerProductosAction } from './../actions/productosAction';

import Producto from './Producto';
import SpinCube from './../spinkit/SpinCube';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        // Consultar la API
        const cargarProductos = () => {
            return(
                dispatch(obtenerProductosAction())
            );
        };
        cargarProductos();
        
    }, []);

    // Obtener el State
    const productos = useSelector( state => state.productos.productos);
   // console.log(productos);
   const error = useSelector( state => state.productos.error );
   // console.log(error);
   const cargando = useSelector( state => state.productos.loading );
   console.log(cargando);

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>

            { error ? <p className="font-weight-bold alert alert-danger text-center">Hubo un error</p>  : null }
            { cargando ? <SpinCube/> : null }

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { productos.length === 0 ? 'No hay productos' : (
                            productos.map(producto => {
                                    return(
                                        <Producto
                                            key={producto.id}
                                            producto={producto}
                                        />
                                    );
                                }
                            )
                        )
                    }
                </tbody>
            </table>
        </Fragment>
    );
}

export default Productos;