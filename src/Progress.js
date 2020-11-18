import React from 'react'

const Progress = React.memo(({ffmpeg}) => {
  const [state, setState] = React.useState(0)
  ffmpeg.setProgress(({ratio}) => setState((ratio * 100).toFixed(1)))
  return (
    <div className="box">
      <h3>Progress</h3>
    <progress style={{transition:'all .2s ease'}} class="progress" value={state} max="100">{state}%</progress>
    </div>
  )
})


export default Progress