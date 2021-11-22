import React, {useState, useEffect} from 'react';
import styles from "./Paginator.module.css";
import cn from 'classnames'

type Props = {
    totalItemsCount: number,
    pageSize: number,
    currentPage:number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number//? - необязательно должно быть в props
}



const Paginator:React.FC<Props> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
// кол-во страниц
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
// массив страниц
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize); // кол-во порций
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // первый элемент порции
    const rightPortionPageNumber = portionNumber * portionSize; // последний элемент порции

useEffect(() => {
    console.log(1)
}, [])
    return (
        <div className={styles.paginator}>
            {leftPortionPageNumber !== 1 &&
            <button onClick={() => {
                onPageChanged(1)
                setPortionNumber(1)
            }}>1</button>
            }
            {portionNumber > 1 &&
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={cn({
                        [styles.selectedPage]: currentPage === p
                    }, styles.pageNumber)}
                                   key={p}
                                   onClick={() => {
                                       onPageChanged(p);
                                   }}>{p}</span>
                })}
            {portionCount > portionNumber &&
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
            {currentPage !== pagesCount &&
            <button onClick={() => {
                onPageChanged(pagesCount)
                setPortionNumber(portionCount)
            }}>{pagesCount}</button>}
        </div>
    )
}

export default Paginator;
