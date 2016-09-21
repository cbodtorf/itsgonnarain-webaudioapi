/***************************
* Lets instantiate our audio context
***************************/
let audioCtx = new AudioContext()
let play = document.getElementById('play')
let stop = document.getElementById('stop')


/***************************
* @param buffer array that has been decoded to audioBuffer
* @param pan value (-1 [left] to 1 [right]), the default is set to 0.
* @param rate value (2 would be double), the default is set to 1.
***************************/

function startLoop(audioBuffer, pan = 0, rate = 1) {
  /***************************
  * create nodes and chain them to destination
  * set loop start/end. Then play loop
  * --- *
  * this is the basic Web Audio API flow
  * 2 node audio-processing graph
  ***************************/
  let srcNode = audioCtx.createBufferSource()
  let panNode = audioCtx.createStereoPanner()
  srcNode.buffer = audioBuffer
  srcNode.loop = true
  srcNode.loopStart = 14.98
  srcNode.loopEnd = 15.80
  srcNode.playbackRate.value = rate
  panNode.pan.value = pan

  srcNode.connect(panNode)
  panNode.connect(audioCtx.destination)
  /***************************
  * @param when to start playing. 0 means immediately.
  * @param offset at which to start. Set to beginning of loop.
  ***************************/

  srcNode.start(0, srcNode.loopStart)
  stop.addEventListener("click", function(){
    srcNode.stop()
  })
}


/***************************
* fetch is sending a request to, in this case, our local webserver.
* arrayBuffer() is being called on our response letting it know we want,
* the data as a binary Array Buffer Object
***************************/

fetch('jackals.wav')
  .then(resp => resp.arrayBuffer())
  .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    /***************************
    * The Phasing effect will a form of the moiré pattern:
    * Two simple identical geometrical patterns are superimposed to give rise
    * to something much more complex than the original.
    * --- *
    * Here we are using two audio loops.
    ***************************/
    play.addEventListener("click", function(){
      startLoop(audioBuffer, -1)
      startLoop(audioBuffer, 1, 1.002)
    })
  })
  .catch(err => console.log(err))








  /***************************
  * credit to:  Tero Parviainen
  * http://teropa.info/blog/2016/07/28/javascript-systems-music.html#is-this-for-me
  ***************************/
