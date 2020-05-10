import React, { Component } from 'react';
import './insert.css';
import api from '../../services/services';
import {Link, Redirect} from 'react-router-dom';


class CriarUsuario extends Component{
    constructor(){
        super();

        this.state ={
            usuario:{
                nome: "",
                matricula: 0,
                ativo: "true",
                ndereco: {
                    cidade: "",
                    estado: ""
                }
            },
            Redirect: false,
        }
        
    }
    render () {
        const {Redirect} = this.state;
        if (Redirect) {
            return <Redirect to ="/" />
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <legend>Criar Usuário</legend>
                    <div className="usuario-insert">
                        <label htmlFor="nome">Nome</label>
                        <br/>
                        <input
                        type="text"
                        id="nome"
                        name="name"
                        placeholder="Insira aqui seu nome"
                        minLength="3"
                        maxLength1="100"
                        required
                        value={this.state.usuario.nome}
                        onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="usuario-insert">
                        <label htmlFor="matricula">Matricula</label>
                        <br/>
                        <input
                        type="number"
                        id="matricula"
                        name="matricula"
                        placeholder="Insira a sua matricula"
                        min="1"
                        max="9999"
                        />
                    </div>
                </form>
            )
        }
    }
}
