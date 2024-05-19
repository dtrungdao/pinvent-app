import React from 'react'
import "./SummaryBoard.scss"

const SummaryBoard = ({bgColor, title, count, icon}) => {
  return (
    <div className={`info-box ${bgColor}`}>
        <span className="info-icon --color-white">{icon}</span>
        <span className="info-text">
            <p>{title}</p>
            <h3>{count}</h3>
        </span>

    </div>
  )
}

export default SummaryBoard;