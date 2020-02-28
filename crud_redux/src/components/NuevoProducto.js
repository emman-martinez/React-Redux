import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// ***** Actions de Redux ***** //
import { crearNuevoProductoAction } from './../actions/productosAction';

import SpinCube from './../spinkit/SpinCube';

const NuevoProducto = () => {

    // State del componente
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState(0);

    // Utilizar useDispatch que crea una función 
    const dispach = useDispatch();

    // Acceder al State del Store
    const cargando = useSelector( (state) => state.productos.loading );
    console.log(cargando);
    const error = useSelector( (state) => state.productos.error );

    // Manda a llamar el action "crearNuevoProductoAction" de productosAction
    const agregarProducto = (producto) => {
        return (
            dispach(crearNuevoProductoAction(producto))
        );
    };

    // Cuando el usuario haga submit
    const submitNuevoProducto = (e) => {
        e.preventDefault();

        // Validar formulario
        if(nombre.trim() === '' || precio <= 0) {
            return;
        }

        // Si no hay errores

        // Crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });
        
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Agregar Nuevo Producto</h2>
                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto..."
                                    name="nombre" 
                                    value={nombre}
                                    onChange={ (e) => guardarNombre(e.target.value) }
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto..."
                                    name="precio" 
                                    value={precio}
                                    onChange={ (e) => guardarPrecio(Number(e.target.value)) }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>

                        { cargando ? <SpinCube/> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un Error</p> : null }
                    
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoProducto;