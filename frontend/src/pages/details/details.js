import React, { Component } from 'react';
import api from '../../services/services';
import {Link} from 'react-router-dom';
import './details.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Usuario extends Component {
    state = {
        usuario: {
            nome: "",
            matricula: 0,
            ativo: "",
            endereco: {
                cidade: "",
                estado: ""
            }
        }
    }
    async componentDidMount() {
        const {id} = this.props.match.params;
        const response = await api.get(`/usuarios/${id}`);
        this.setState({ usuario: response.data });
    }
    render() {
        const { usuario } = this.state;

        if(usuario.ativo) {
            usuario.ativo = "Usuário Ativo";
        }else{
            usuario.ativo = "Usuário Inativo"; 
        }

        return (
            <div className="usuario-info">
                <h1>Nome:{usuario.nome}</h1>
                <h1>Matricula:{usuario.matricula}</h1>
                <h1>Status: {usuario.ativo}</h1>
                <h1>Endereço: {usuario.endereco.cidade}</h1>
                <h1>Estado: {usuario.endereco.estado}</h1>
                <br/>

                
                <Button className="botao-voltar" variant="primary"><Link to={`/`}>Voltar</Link></Button>
                <Button variant="warning"><Link to={`/EditarUsuario/${usuario._id}`}>Editar</Link></Button>
                <Button variant="danger"><Link to={`/DeletarUsuario/${usuario._id}`}>Deletar</Link></Button> 
                
            </div>
        )
    }

}