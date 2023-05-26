import styled from "styled-components"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function SessionsPage() {
    let [sessoes, setSessoes] = useState([[], []]);
    let filmeid = useParams().idFilme;
    useEffect(() => {
		const request = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies/" + filmeid + "/showtimes");
		request.then(resposta =>
            setSessoes([resposta.data, resposta.data.days])
		);
    }, []);
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessoes[1].map((data)=>
                    <SessionContainer>
                        {data.weekday + ' - ' + data.date}
                        <ButtonsContainer>
                        {data.showtimes.map((hora)=>
                            <Link to={'/assentos/' + hora.id}><button>{hora.name}</button></Link>
                        )}
                        </ButtonsContainer>
                    </SessionContainer>
                )}
            </div>

            <FooterContainer>
                <div>
                    <img src={sessoes[0].posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessoes[0].title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`