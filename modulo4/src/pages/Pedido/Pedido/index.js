
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Container } from "reactstrap";
import { api } from "../../../config";

export const Pedido = (props) => {
    console.log(props.match.params.id);
    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + "/pedido/" + id)
                .then((response) => {
                    console.log(response.data.Servico);
                    setData(response.data.servico);
                }).catch(() => {
                    console.log("Erro: Não foi possivel conectar a API.")
                })
        }
        getPedido();
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Informações do pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/visualizarpedido" className="btn btn-outline-primary btn-sm">Pedido</Link>
                    </div>
                </div>
                <div>
                    <dl className="row">
                        <dt className="col-sm-3">ID</dt>
                        <dd className="col-sm-3">{data.nome}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Cliente</dt>
                        <dd className="col-sm-3">{data.ClienteId}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Valor</dt>
                        <dd className="col-sm-3">{data.valor}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Data</dt>
                        <dd className="col-sm-3">{data.data}</dd>
                    </dl>
                </div>
            </Container>
        </div>
    )
}