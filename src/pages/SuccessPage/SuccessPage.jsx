import styled from "styled-components"
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function SuccessPage() {
    let movie_name = 'Tudo em todo lugar ao mesmo tempo';
    let data = '03/03/2023 - 14:00';
    let assentos = [1, 2, 3];
    let nome_comprador = useParams().user;
    let cpf_comprador = useParams().cpf;
    let navigate = useNavigate();
    console.log(useParams().select)
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{movie_name}</p>
                <p>{data}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {assentos.map((assento)=>
                    <p>Assento {assento}</p>
                )}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {nome_comprador}</p>
                <p>CPF: {cpf_comprador}</p>
            </TextContainer>

            <button onClick={() => navigate('/')}>Voltar para Home</button>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`