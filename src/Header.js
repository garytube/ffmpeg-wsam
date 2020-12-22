import React from 'react'

function Header({children}) {
  return (
    <>
    <div className="container">
      <section className="hero">
  <div className="hero-body">
    <p className="title">
      Video Drehen
    </p>
  </div>
</section>
      {children}
    </div>
      </>
  )
}


export default Header

