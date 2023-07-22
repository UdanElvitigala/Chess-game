
export default function Peice(props) {
    let item = props.item
    let id = Number(item.id)
    let handleClick =props.handleClick
    
    return (
        <div key={id}
             className={`${item.dark && "bg-secondary text-white"} ${item.canMove && "bg-warning"} ${item.selected && "bg-success border-primary"} d-flex justify-content-center align-items-center border border-2 fs-1`} 
            //  className={`${item.dark && "bg-secondary text-white border-secondary"} ${item.selected && "bg-success"} d-flex justify-content-center align-items-center border border-2 fs-1`} 
             onClick={() => handleClick({ x: item.x, y: item.y, value: Number(item.value), canMove: item.canMove })}
             style={{ 
             width : 100, 
             height : 100
        }}>
            
            {/* <div className="text-dark fs-6 relative">{``}</div> */}
            {/* white characters image selection */}
                {item.value == 1 && <img style={{ maxWidth : 75  }} src="./public/assets/white-pawn.png" />}
                {item.value == 5 && <img style={{ maxWidth : 90  }} src="./public/assets/white-rook.png" />}
                {item.value == 3 && <img style={{ maxWidth : 55  }} src="./public/assets/white-knight.png" />}
                {item.value == 2 && <img style={{ maxWidth : 105  }} src="./public/assets/white-bishop.png" />}
                {item.value == 9 && <img style={{ maxWidth : 100  }} src="./public/assets/white-queen.png" />}
                {item.value == 100 && <img style={{ maxWidth : 110  }} src="./public/assets/white-king.png" />}
                
            {/* dark characters image selection */}
                {item.value == -1 && <img style={{ maxWidth : 75  }} src="./public/assets/black-pawn.png" />}
                {item.value == -5 && <img style={{ maxWidth : 90  }} src="./public/assets/black-rook.png" />}
                {item.value == -3 && <img style={{ maxWidth : 55  }} src="./public/assets/black-knight.png" />}
                {item.value == -2 && <img style={{ maxWidth : 105  }} src="./public/assets/black-bishop.png" />}
                {item.value == -9 && <img style={{ maxWidth : 100  }} src="./public/assets/black-queen.png" />}
                {item.value == -100 && <img style={{ maxWidth : 110  }} src="./public/assets/black-king.png" />}
                
        </div>

    )

}