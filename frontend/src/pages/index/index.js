import React, { Component } from 'react';
import api from '../../services/services';
import { Link } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default class Usuarios extends Component {
    //nao armazeno a variavel de forma local
    //uso uma variavel estado para isso
    //cria um objeto e facilita a forma de manipular ele e atualizar
    state = {
        usuarios: [],
        usuariosInfo: {},
        page: 1,
    };

    //mostrar info automaticamente qdo iniciar a app, usa esse metodo
    componentDidMount(){
        this.loadUsuarios();   
    }
    
    loadUsuarios = async (page = 1) => {
        //const response = await api.get('/usuarios');

        const response = await api.get(`/usuarios?page=${page}`);

        const { docs, ...usuariosInfo } = response.data;

        //console.log(response.data.docs);
        //this.setState ({ usuarios: response.data.docs})

        this.setState ({ usuarios: docs, usuariosInfo, page});
    };

    prevPage = () => {
        const { page } = this.state;
        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadUsuarios(pageNumber);
    }

    nextPage = () => {
        const { page, usuariosInfo } = this.state;
        if(page === usuariosInfo.pages) return;

        const pageNumber = page + 1;
        this.loadUsuarios(pageNumber);
    }

    render() {
        
        const { usuarios, usuariosInfo, page } = this.state;
        return (
            
            <div className="usuario-list">
               
                <p className="usuario-cad"><Link to={`/CriarUsuarios/`}>Cadastrar Usuário</Link></p>
                {this.state.usuarios.map(usuario => (
                    <article key={usuario._id}>
                        <strong> {usuario.nome} </strong> 
                        <p> {usuario.matricula} </p>
                        <p> <Link to={`/usuarios/${usuario._id}`}> Acessar </Link> </p>
                        <br/>
                    </article>
                ))}

                <div className="actions"> 
                    <Button variant="outline-primary" disabled={page===1} onClick={this.prevPage}>Voltar</Button>
                    <Button variant="outline-primary" disabled={page===usuariosInfo.pages} onClick={this.nextPage}>Próxima</Button>
                    {/* COMENTÁRIO JSX 
                    <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page===usuariosInfo.pages} onClick={this.nextPage}>Próxima</button>
                    */}      
                </div>
            </div>
        )
    }
}