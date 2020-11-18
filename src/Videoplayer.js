import React from 'react'

function Videoplayer({file, action, vid}) {
    return (
    <>
{vid.video && 
  <video style={{height: '80vh'}} controls autoPlay muted loop src={URL.createObjectURL(vid.video)}></video>}
    </>
    )
}

export default React.memo(Videoplayer)