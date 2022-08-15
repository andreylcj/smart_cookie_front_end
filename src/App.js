import { useEffect, useState } from 'react'

const WIDTH = 640
const HEIGHT = 390
const CORRECT_ANSWER = {
  "letter": 'a',
  "value": 5
}

export default function Home() {
  const [choice, setChoice] = useState({
    "letter": null,
    "value": null
  })
  const [isChoiceWrong, setIsChoiceWrong] = useState(null)
  const [showControls, setShowControls] = useState(true)

  const onAnswer = () => {
    if (!choice['letter']) {
      setIsChoiceWrong({
        "letter": '',
        "value": null
      })
      return
    }
    const isChoiceWrong = CORRECT_ANSWER['letter'] !== choice['letter']
    setIsChoiceWrong(isChoiceWrong)
    if (!isChoiceWrong) {
      setShowControls(true)      
      document.getElementById("video").play();
    }
    
  }

  useEffect(() => {
    const onTrackedVideoFrame = (event) => {
      const getInt = (num) => Math.floor(num)
      const currTime = getInt(event.target.currentTime);
      
      if (currTime === 64 && !choice['letter']){
        document.getElementById("video").pause();
        setShowControls(false)
      }
    }
    document.getElementById('video').addEventListener('timeupdate', onTrackedVideoFrame)

    return () => document.getElementById('video').removeEventListener('timeupdate', onTrackedVideoFrame)
  }, [choice])
  
  return (
    <div
      style={{'textAlign': 'center'}}
      data-vjs-player
    >
      <h1>
        Play video and wait for 1:04
      </h1>

      <div style={{
        'position': 'relative',
        'width': WIDTH, 
        'height': HEIGHT, 
        'margin': 'auto'
        }}>
        <video
            id="video"
            width={WIDTH}
            height={HEIGHT}
            controls={showControls}>
            <source src="./video.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            'width': WIDTH, 
            'height': HEIGHT, 
            'backgroundColor': 'rgba(0 0 0 / 90%)',
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'display': showControls ? 'none' : 'flex',
            'justifyContent': 'center',
            'alignItems': 'center',
            'flexDirection': 'column',
            'color': 'white'
          }}
        >
          <div>
            3 + 2 = ?
          </div>
          {
            (isChoiceWrong || choice['letter'] === '') && !showControls ? (
              <div style={{'color': 'red'}}>Wrong answer</div>
            ) : null
          }
          <div
            style={{
              'display': 'flex',
              'justifyContent': 'center',
              'alignItems': 'center',
              'flexDirection': 'column',
            }}
            onChange={(e) => setChoice({
              "letter": e.target.id.split('-')[1],
              "value": parseInt(e.target.value, 10)
            })}
          >
            <div>
              <input 
                type="radio" 
                id="choice-a"
                name="question" 
                value="5" 
                />
              <label htmlFor="choice1">5</label>
            </div>

            <div>
              <input 
                type="radio" 
                id="choice-b"
                name="question" 
                value="3" />
              <label htmlFor="choice2">3</label>
            </div>

            <div>
              <input 
                type="radio" 
                id="choice-c"
                name="question" 
                value="8" />
              <label htmlFor="choice3">8</label>
            </div>

            <div>
              <input 
                type="radio" 
                id="choice-d"
                name="question" 
                value="4" />
              <label htmlFor="choice4">4</label>
            </div>

          </div>
          <div>
            <button onClick={onAnswer}>
              answer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
