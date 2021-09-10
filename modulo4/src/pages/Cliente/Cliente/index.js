
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { api } from "../../../config";

export const Cliente = (props) => {
    console.log(props.match.params.id);
    const [data, setData] = useState([]);
    const [id] = useState(props.match.params.id);
    useEffect(() => {
        const getCliente = async () => {
            await axios.get(api + "/clientes/" + id)
                .then((response) => {
                    console.log(response.data.cliente);
                    setData(response.data.cliente);
                }).catch(() => {
                    console.log("Erro: Não foi possivel conectar a API.")
                })
        }
        getCliente();
    }, [id]);
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h1>Informações dos clientes</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/visualizarcliente" className="btn btn-outline-primary btn-sm">Clientes</Link>
                    </div>
                </div>
                <div>
                    <dl className="row">
                        <dt className="col-sm-3">Nome</dt>
                        <dd className="col-sm-3">{data.nome}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Endereço</dt>
                        <dd className="col-sm-3">{data.endereco}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Cidade</dt>
                        <dd className="col-sm-3">{data.cidade}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">UF</dt>
                        <dd className="col-sm-3">{data.uf}</dd>
                    </dl>
                    <dl className="row">
                        <dt className="col-sm-3">Data de Nasc.</dt>
                        <dd className="col-sm-3">{data.nascimento}</dd>
                    </dl>
                </div>
            </Container>
        </div>
    )
}