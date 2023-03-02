import React from 'react'
import head from "./general.module.css"
import HeaderNavBoxes from './HeaderNavBoxes';

const Header = (props) => {
  return (
    <div className={head.overallnavigation}>
    <div className={head.navigation}>
    <div className={head.textcontainer}>
      <p className={head.titlenavigation}>
        {props.name}
      </p>
    </div>
    <div className={head.flexlinkcontainer}>
    <HeaderNavBoxes title = "Table" imagelink = "/icons/header/table.svg"/>
    <HeaderNavBoxes title = "Board" imagelink = "/icons/header/board.svg"/>
    <HeaderNavBoxes title = "Grid" imagelink = "/icons/header/grid.svg"/>
    </div>
    </div>
   </div>
  )
}

export default Header