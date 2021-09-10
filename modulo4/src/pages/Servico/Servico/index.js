
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { api } from "../../../config";

export const Servico = (props) => {
    console.log(props.match.params.id);
    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    useEffect(() => {
        const getServicos = async () => {
            await axios.get(api + "/servicos/" + id)
                .then((response) => {
                    console.log(response.data.servicos);
                    setData(response.data.servicos);
                }).catch(() => {
                    console.log("Erro: Não foi possivel conectar a API.")
                })
        }
        getServicos();
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Informações do serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/visualizarservico" className="btn btn-outline-primary btn-sm">Serviços</Link>
                        <Link to={"/editarservico/" + data.id} className="btn btn-outline-warning btn-sm">Editar</Link>
                    </div>
                </div>
                <div>
                    <dl className="row">
                        <dt className="col-sm-3">Nome</dt>
                        <dd className="col-sm-3">{data.nome}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Descrição</dt>
                        <dd className="col-sm-3">{data.descricao}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Valor total</dt>
                        <dd className="col-sm-3">{data}</dd>
                    </dl>
                </div>
            </Container>
        </div>
    )
}