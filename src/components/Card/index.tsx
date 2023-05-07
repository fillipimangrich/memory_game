import './styles.css'


export interface CardProps{
    id: string;
    flipped?: boolean;
    back: string;
    handleclick?: (id:string) => void;
}

export function Card({id,flipped = false, back, handleclick}: CardProps){
    
    const card_contentClassName = ['card_content'];

    if (flipped){card_contentClassName.push('card_content--flipped')}

    const handleclickFn = (id:string) =>{
        if (handleclick){
            handleclick(id);}}

    return(
        <div className="card" onClick={()=> handleclickFn(id)}>
            <div className={card_contentClassName.join(' ')}>
                <div className="card_face card_face--front"></div>
                <img className="card_face card_face--back" src = {back} alt=''></img>
            </div>
        </div>
    )    
}

