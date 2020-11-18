import React from 'react'

function Header({children}) {
  return (
    <>
    <div className="container">
      <section class="hero">
  <div class="hero-body">
    <p class="title">
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

