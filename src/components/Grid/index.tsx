import './styles.css'
import {Card, CardProps} from '../Card'
import { useRef, useState } from 'react';
import { genAarray} from '../Card/card-utils';

export interface GridProps{
    cards: CardProps[]; 
}

export function Grid({cards}: GridProps){
    const [stateCards, setStateCards] = useState(() =>{
        return genAarray(cards);
    })

    const first_clicked = useRef<CardProps | null>(null);
    const second_clicked = useRef<CardProps | null>(null);
    const unflip = useRef(false);
    const [matches, setMatches] = useState(0);
    const [moves,setMoves] = useState(0);
    const [memoryString, setMemoryString] = useState('')

    const handleReset = () => {
        setStateCards(genAarray(cards));
        first_clicked.current =null;
        second_clicked.current =null;   
        unflip.current =false;
        setMatches(0);
        setMoves(0);
        setMemoryString('')
    }


    const handleclick = (id:string) => {

        const newStateCards = stateCards.map((card) => {
            if (card.id != id || card.flipped){
                return card 
            }

            if (unflip.current && first_clicked.current &&second_clicked.current){
                first_clicked.current.flipped=false;
                second_clicked.current.flipped=false;
                first_clicked.current=null;
                second_clicked.current=null;
                unflip.current =false;
            }

            card.flipped=true;

            if (first_clicked.current ===null){
                first_clicked.current = card;
            } else if(second_clicked.current ===null){
                second_clicked.current =card;
                setMoves(moves+1);
            }

            if (first_clicked.current.back === second_clicked.current?.back){
                first_clicked.current = null;
                second_clicked.current = null;
                setMatches(matches+1)
                if (matches === 5){
                    if (matches/moves >= 0.75){
                        setMemoryString('75% - 100%: Excelente')
                    }else if(matches/moves >= 0.5){
                        setMemoryString('50% - 75%: Bom')
                    }else if(matches/moves >= 0.25){
                        setMemoryString('25% - 50%: Esquecido')
                    }else{
                        setMemoryString('0% - 25%: Amnésia')
                    }
                }
                
            }else{
                unflip.current =true
            }
            return card 
        })
        setStateCards(newStateCards)
    }

    return(
        <>
            <div className='text'>
                <h1>Linux Memory Game</h1>
                <p>Tentativas: {moves} | Acertos: {matches}</p>
            </div>
            <div className="grid">

                    {stateCards.map((card) => {
                    return <Card {...card} key={card.id} handleclick={handleclick}/>;
                    })}
            </div>
            <div className='text'>
                <p>Nível de memória: {memoryString}</p>
                <button className ='button-17' onClick={handleReset}>Reiniciar</button>
            </div>
        </>
    )
}