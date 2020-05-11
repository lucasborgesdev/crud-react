import React, { Component } from 'react';
import './insert.css';
import api from '../../services/services';
import {Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


class CriarUsuario extends Component{
    constructor(){
        super();

        this.state ={
            usuario:{
                nome: "",
                matricula: 0,
                ativo: "true",
                endereco: {
                    cidade: "",
                    estado: ""
                }
            },
            redirect: false,
        }
        
    }
    render () {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to ="/" />
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                    <legend>Criar Usuário</legend>
                    <div className="usuario-insert">
                        <label htmlFor="nome">Nome</label>
                        <br/>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Insira aqui seu nome"
                            minLength="3"
                            maxLength="100"
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
                            required
                            value={this.state.usuario.matricula}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="usuario-insert">
                        <label htmlFor="cidade">Cidade</label>
                        <br/>
                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            placeholder="Insira a cidade"
                            minLength="3"
                            maxLength="100"
                            required
                            value={this.state.usuario.endereco.cidade}
                            onChange={this.handleInputChangeEndereco}
                        />
                    </div>
                    <div className="usuario-insert">
                        <label htmlFor="estado">Estado</label>
                        <br/>
                        <input
                        type="text"
                            id="estado"
                            name="estado"
                            placeholder="Insira a estado"
                            minLength="2"
                            maxLength="2"
                            required
                            value={this.state.usuario.endereco.estado}
                            onChange={this.handleInputChangeEndereco}
                        />
                    </div>
                    <div className="usuario-insert">
                        <label>
                            <input
                            type="radio"
                            name="ativo"
                            value="true"
                            checked={this.state.usuario.ativo === "true"}
                            onChange={this.handleInputChange}
                            />
                            Ativo
                        </label>

                        <label>
                            <input
                            type="radio"
                            name="ativo"
                            value="false"
                            checked={this.state.usuario.ativo === "false"}
                            onChange={this.handleInputChange}
                            />
                            Inativo
                        </label>
                    </div>
                   
                    <Button variant="success" type="submit" >Cadastrar</Button>
                    <Button className="botao-voltar" variant="primary"><Link to={`/`}>Voltar</Link></Button>
                    </fieldset>
                </form>
            )
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            usuario: {...prevState.usuario, [name]: value}
        }));

    };

    handleInputChangeEndereco = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => {
            const usuario = {...prevState.usuario};
            usuario.endereco[name] =value;
            return {usuario}
        })
    }

    handleSubmit = event => {
        fetch("http://localhost:3001/sistema/usuarios/", {
            method:"post",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(data => {
            if(data.ok) {
                this.setState({redirect: true})
            }
        })

        event.preventDefault();
    }
}

export default CriarUsuario;