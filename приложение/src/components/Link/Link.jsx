import React, { useCallback } from 'react'
import './Link.css'
import { Link } from 'react-router-dom'

const NavitgationLink = ({ to, children, onClick }) => {
  const handleClick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <Link className='link' to={to}><span onClick={handleClick}>{children}</span></Link>
  )
}

export default NavitgationLink