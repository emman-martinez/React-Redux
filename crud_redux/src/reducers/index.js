import { combineReducers } from 'redux';
import productosReducer from './productosReducer';
import alertasReducer from './alertasReducer';

export default combineReducers ({
    productos: productosReducer,
    alertas: alertasReducer
});
