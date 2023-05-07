import { CardProps } from ".";


export const duplicateArray = <T>(array: T[]): T[] =>{
    return[...array,...array];
}

export const randomizeArray = <T>(array: T[]): T[]=>{
    return array.sort(() => Math.random() -0.5)
}

const keygen =(): string => {
    return Math.random().toString().substring(2,10)
}

export const resetCard = (cards:CardProps[]): CardProps[] =>{
    return cards.map((card) => ({...card, id: keygen()}))
}

export const genAarray = (cards : CardProps[]): CardProps[] =>{
    return resetCard(randomizeArray(duplicateArray(cards)))
}

