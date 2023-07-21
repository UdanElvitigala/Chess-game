import { useState } from "react"
import Peice from "./Piece"

export default function ChessBoard() {
    let boardData =[]

    for(let x=0; x <4; x++ ) {
        for(let y =0; y <4; y++) {
            boardData.push(
                { dark : false },
                { dark : true }
                )
        }
        for(let z=0; z <4; z++) {
            boardData.push(
                { dark : true },
                { dark : false},
            )
        }
    }

    for (let x in boardData) {
        let item = boardData[x]
        item.id = x

        item.value = 0  //setting all board values to 0
        if(item.id > 47 && item.id < 56) { item.value = 1 } //positioning white pawns
        if(item.id == 56 || item.id == 63) { item.value = 5 } //white rooks
        if(item.id == 57 || item.id == 62) { item.value = 3 } //white knights
        if(item.id == 58 || item.id == 61) { item.value = 2 } //white bishops     
        if(item.id == 59) { item.value = 9 } //white queens
        if(item.id == 60) { item.value = 100 } //white kings
        
        if(item.id > 7 && item.id < 16) {item.value = -1 }//black pawns
        if(item.id == 0 || item.id == 7 ) {item.value = -5 }//black rooks
        if(item.id == 1 || item.id == 6 ) {item.value = -3 }//black knights
        if(item.id == 2 || item.id == 5 ) {item.value = -2  }//black bishops
        if(item.id == 3) {item.value = -9    }//black queens    
        if(item.id == 4) {item.value = -100   }//black kings
    } 
 
    const [Board,setBoard] = useState(boardData)
    const [selected,setSelected] = useState(null)
    
    function handleClick(props) {
        let value = props.value
        let checkMove = []
        if( value == 0) { checkMove = [] } //clear all moves
        if( value == 1) { checkMove = [ -8 ] } //white pawn moves
        if( value == -1) { checkMove = [ 8 ] } //black pawn moves
        // if( value == 5 || value == -5) { checkMove = [ 15,-15,17,-17 ] } //rook moves
        if( value == 3 || value == -3) { checkMove = [ 15,-15,17,-17 ] } //knight moves
        // if( value == 2 || value == -2) { checkMove = [ 15,-15,17,-17 ] } //bishop moves
        // if( value == 9 || value == -9) { checkMove = [ 15,-15,17,-17 ] } //queen moves
        if( value == 100 || value == -100) { checkMove = [ 1,8,9,7,-1,-8,-7,-9 ] } //king moves
        if( value == 100 || value == -100) { checkMove = [ -1,1,-8,8,-7,7,-9,9 ] } //king moves
        
        let clickedItem = Board[props.id]
        if(clickedItem.canMove) {
            changeLocation(clickedItem.id,props.id)
        }
        else {
            selectLocation(props.id, checkMove)
        }
    }
    
    function selectLocation(id,checkMove) {
        setBoard( prev => { //indicate selected character
            return prev.map( checkPrev => {
                return checkPrev.id == id 
                    ? {...checkPrev , selected : true }
                    : {...checkPrev, selected : false}
            })
        })
        setSelected(Board[id])
        showMoves(checkMove,id)
    }

    function showMoves(checkMove,id) { //when a character clicked the places it can move will shown by this
        setBoard( prev => {
            return prev.map( checkPrev => {
                return {...checkPrev, canMove : false}
            })
        })
        for(let x=0; x < checkMove.length; x++) {
            setBoard( prev => {
                return prev.map( checkPrev => {
                    return checkPrev.id == checkMove[x] + id 
                        ? {...checkPrev, canMove : true}
                        : {...checkPrev }
                })
            })
        }
    }
    
    function changeLocation(location) { //change character location
        setBoard( prev => { 
            return prev.map( checkPrev => {
                return checkPrev.id == location 
                    ? {...checkPrev , value : selected.value, canMove : false, selected : false }
                    : checkPrev.id == selected.id ? {...checkPrev, value : 0, canMove : false, selected : false }  
                    : {...checkPrev, canMove : false, selected : false }
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