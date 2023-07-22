import { useState } from "react"
import Peice from "./Piece"
import data from "../data/board.json"

export default function ChessBoard() {
    let boardData =[]

    for(let x=0; x <4; x++ ) {
        for(let y =0; y <4; y++) {
            boardData.push(
                { dark : false, x : (y*2),   y : (x*2) },
                { dark : true,  x : (y*2)+1, y : (x*2) }
            )
        }
        for(let z=0; z <4; z++) {
            boardData.push(
                { dark : true,  x : (z*2),   y : (x*2)+1 },
                { dark : false, x : (z*2)+1, y : (x*2)+1 }
            )
        }
    }

    for (let x in boardData) {
        let item = boardData[x]

        if(item.y == 6) { item.value =  1 } //positioning white pawns
        if(item.y == 1) { item.value = -1 } //positioning black pawns

        if(item.y == 7 || item.y == 0 ) {
            let color
            if(item.y == 7) {  color = 1} else { color = -1} //1 means white & -1 means black
            
            if(item.x == 0 || item.x == 7) { item.value = color *5 }  //rooks
            if(item.x == 1 || item.x == 6) { item.value = color *3 }  //knights
            if(item.x == 2 || item.x == 5) { item.value = color *2 }  //bishops     
            if(item.x == 3 ) { item.value = color *9 }  //queens
            if(item.x == 4 ) { item.value = color *100 }//kings
        }
    } 
 
    const [Board,setBoard] = useState(boardData)
    const [selected,setSelected] = useState(null)
    
    function handleClick(props) {
        let value = props.value
        let moves = []

        if (value ==  1) { moves = data[0].moves } //white pawn moves
        if (value == -1) { moves = data[1].moves } //black pawn moves        
        if (value == 5 || value == -5) { moves = data[2].moves } //rook moves
        if (value == 3 || value == -3) { moves = data[3].moves } //knight moves
        if (value == 2 || value == -2) { moves = data[4].moves } //bishop moves
        if (value == 9 || value == -9) { moves = data[5].moves } //queen moves
        if (value == 100||value == -100) { moves = data[6].moves } //king moves

        if(props.canMove && !(selected.value > 0 == props.value >0)) { //if the piece can move to
            changeLocation(props)  //the new location and there isn't a same color character
        } else {
            selectLocation(props)
            showMoves(props,moves)
        }
    }

    function selectLocation(props) {
        if(props.value == 0) return
        setBoard( prev => { //indicate selected character
            return prev.map( checkPrev => {
                return checkPrev.x == props.x  
                    ?  checkPrev.y == props.y 
                        ? {...checkPrev, selected : true }
                        : {...checkPrev, selected : false}
                    : {...checkPrev, selected : false}
            })
        })
        setSelected(props)
    }

    function showMoves(props,moves) { //when a character clicked the places it can move will shown by this
        setBoard( prev => {
            return prev.map( checkPrev => {
                return {...checkPrev, canMove : false}
            })
        })

        for(let x in moves) {
            for(let z in moves[x]) {
                let move = {
                    x : props.x + moves[x][z].x,
                    y : props.y + moves[x][z].y
                }
                // var item = Board
                
                // for(let i in Board) {
                //     if(!(Board[i].value >0) == (props.value >0) || !(Board[i].value <0 == props.value <0)) {
                //         if(Board[i].x == move.x && Board[i].y == move.y) {
                            
                //             // console.log(item[i])
                //             item[i] = ({...Board[i], canMove : true})
                //         }
                        
                //         // else {
                //         //     item[i] = ({...Board[i], canMove : false})
                //         //     console.log(item[i])
                //         //     break
                //         // }
                //         else {
                //             item[i] = (Board[i])
                //         }
                //     }
                //     else break
                // }

                // console.log(item)
                // setBoard(item)

                
                setBoard( prev => {
                    return prev.map( checkPrev => {
                            return checkPrev.x == move.x && checkPrev.y == move.y
                            ? !(checkPrev.value >0) == (props.value >0) || !(checkPrev.value <0 == props.value <0) //will mark as a legal move
                                ?{...checkPrev, canMove : true }    //only if the selected character and the character
                                : checkPrev                        // in the location it can be changed are not same
                            : checkPrev                           
                    })
                })
            }
        }
    }
    
    function changeLocation(props) { //change character location
        setBoard( prev => { 
            return prev.map( checkPrev => {
                return checkPrev.x == props.x && checkPrev.y == props.y
                    ? {...checkPrev, value : selected.value, canMove : false }
                    : checkPrev.x == selected.x && checkPrev.y == selected.y
                        ? {...checkPrev, value : 0, canMove : false, selected : false}
                        : {...checkPrev, canMove : false, selected : false}
            })
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="shadow-lg"
                 style={{  display : "grid", 
                           gridTemplateColumns : "auto auto auto auto auto auto auto auto",
                           marginTop : 80 }}>

                {Board.map( item => (
                    <Peice item={item} handleClick={handleClick} setBoard={setBoard} />
                ))}
            </div>
        </div>
    )
}