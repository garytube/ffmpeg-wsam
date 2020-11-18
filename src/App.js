import React, { useState, useEffect } from 'react';
import './App.css';
import Progress from './Progress'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import Videoplayer from './Videoplayer';
const ffmpeg = createFFmpeg({ log: true});

function App() {
  const [ready, setReady] = useState(false);
  const [progress, setProgresss] = useState(false)
  const [output, setOutput] = useState()
  const [video, setVideo] = useState()

  


  useEffect(() => {
    const load = async () => {
      await ffmpeg.load();
      setReady(true);
    }
    load();
  }, [])



  const rotateVideo = async () => {
    // Write the file to memory 
    setProgresss(true)
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video));

    // Run the FFMpeg command
    await ffmpeg.run('-i', 'test.mp4', '-vf', 'transpose=1', '-preset', 'fast', 'out.mp4');
    // Read the result
    const data = ffmpeg.FS('readFile', 'out.mp4');

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    setOutput(url)
    setProgresss(false)
  }

  return ready ? (
   <> 
        <div className="columns">
          <div className="column">
              <Videoplayer action={rotateVideo} vid={{video, setVideo}} />
                {!video && 
                <div className="box"  style={{textAlign: 'center'}}>
                  <div className="file"  style={{textAlign: 'center'}}>
  <label className="file-label">
  <input type="file" className="file-input" name="video" onChange={(e) => setVideo(e.target.files[0]) }/>
    <span className="file-cta">
      <span className="file-icon">
        <span role="img" aria-label="upload">🌈</span>
      </span>
      <span className="file-label">
        Video wählen 
      </span>
    </span>
  </label>
</div>
</div>
                 }
          </div>
          <div className="column">
            {progress}
            {!output && 
            <>
  {video &&
   <div className="box"  style={{textAlign: 'center'}}>
   <button disabled={progress} className="button is-medium" onClick={rotateVideo}>Drehen</button>
    <br/> <small>{video?.name}</small>
    </div>
   }
  { progress && <Progress data={progress} ffmpeg={ffmpeg}></Progress>}
            </>
            }
                         {output && 
             <div className="box" style={{textAlign: 'center'}}>
             <video  controls  muted  src={output}></video>
             </div>
             
             }
          </div>
        </div>

   </>
  ) :  <p>Loading...</p>
}

export default React.memo(App);