import styled from "styled-components"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function SeatsPage() {
    let name;
    let cpf;
    let [assentos, setAssentos] = useState(null);
    let [select, setSelect] = useState([]);
    let [user, setUser] = useState("");
    let filmeid = useParams().idFilme;
    let selected_color = '#1AAE9E';
    let dispon_color = '#C3CFD9';
    let indisp_color = '#FBE192';
    let colors = [[selected_color, 'Selecionado'], [dispon_color, 'Disponível'], [indisp_color, 'Indisponível']]
    useEffect(() => {
		const request = axios.get('https://mock-api.driven.com.br/api/v8/cineflex/showtimes/' + filmeid + '/seats');
		request.then(resposta =>
            setAssentos(resposta.data)
		);
    }, []);
    function Assento(atr){
        let backcolor;
        let bord;
        if (atr.back == false){
            backcolor = indisp_color;
            bord = '#F7C52B';
        }
        else if (atr.back == 'sel'){
            backcolor = selected_color;
            bord = '#0E7D71';
        }
        else{
            backcolor = dispon_color;
            bord = '#808F9D';
        }
        const SeatItem = styled.div`
            border: 1px solid ${bord};
            background-color: ${backcolor};
            height: 25px;
            width: 25px;
            border-radius: 25px;
            font-family: 'Roboto';
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 5px 3px;`
        return(
            <SeatItem id={atr.id} selected={backcolor} onClick={(e) => clic(e)} data-test="seat">{atr.value}</SeatItem>
        )
    }
    function Legenda(atr){
        let bord;
        if (atr.back == selected_color){
            bord = '#0E7D71';
        }
        else if (atr.back == dispon_color){
            bord = '#808F9D';
        }
        else if (atr.back == indisp_color){
            bord = '#F7C52B';
        }
        const CaptionCircle = styled.div`
            border: 1px solid ${bord};
            background-color: ${atr.back};
            height: 25px;
            width: 25px;
            border-radius: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 5px 3px;`
        const CaptionItem = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
        `
        return(
            <CaptionItem>
                <CaptionCircle/>
                {atr.name}
            </CaptionItem>
        )

    }
    function clic(e){
        if (e.target.selected == dispon_color){
            let new_assentos = assentos;
            new_assentos.seats[1].isAvailable = false;
            if (new_assentos == assentos){
                console.log('diguais');
            }
            else{
                console.log('diferenes');
            }
            setAssentos(new_assentos);
        }
    };
    if(assentos == null) {
		return null;
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)
            <SeatsContainer>
                {assentos.seats.map((assento)=>
                    <Assento id={assento.id} back={assento.isAvailable} value={assento.name}/>
                )}
            </SeatsContainer>
            <CaptionContainer>
                {colors.map((color)=>
                    <Legenda back={color[0]} name={color[1]}/>
                )}
            </CaptionContainer>
            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." data-test="client-name" onChange={e => setUser(e.target.value)}/>

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." data-test="client-cpf" value={cpf}/>

                <button to={'/success/' + filmeid + '/' + name + '/' + cpf} data-test="book-seat-btn">Reservar Assento(s)</button>
            </FormContainer>
            <FooterContainer data-test="footer">
                <div>
                    <img src={assentos.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{assentos.movie.title}</p>
                    <p>{assentos.day.weekday + ' - ' + assentos.day.date}</p>
                </div>
            </FooterContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
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