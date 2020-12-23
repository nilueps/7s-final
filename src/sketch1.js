const sketch = container =>
  // eslint-disable-next-line no-undef
  new p5(s => {
    //global configs
    p5.disableFriendlyErrors = true;
    //background
    const imgfile = "img/sketch1-bg.jpeg"
    const submatx = 0.5
    // const matxeasing = 0.1;

    //vars
    // let loopState
    // let initState
    let ii = 0
    let initBezzes
    let bezzes = []
    let growShrinkOn
    let initMaxBezzes
    let maxBezzes
    // let gXPos, gYPos, mouseDownX, mouseDownY, ellipseX, ellipseY
    let bez1
    let timecode, startTime, mills
    let subw, subh

    let writeSpeed
    let rotateAmt
    let linesPerWrite
    let scaleX
    let scaleY
    // let clickCount = 0

    let growShrinkAmt
    let bgColor

    let subx = 0
    let suby = 0

    //JSON data
    let songData
    let data1
    // let data2

    let img
    let song

    // main bezier curve object
    class Bez {
      constructor(obj) {
        this.x1 = obj.vert.x1
        this.y1 = obj.vert.y1
        this.cpx1 = obj.vert.cpx1
        this.cpy1 = obj.vert.cpy1
        this.cpx2 = obj.vert.cpx2
        this.cpy2 = obj.vert.cpy2
        this.x2 = obj.vert.x2
        this.y2 = obj.vert.y2
        this.stR = obj.stroke.red
        this.stG = obj.stroke.green
        this.stB = obj.stroke.blue
        this.stA = obj.stroke.alpha
        this.fR = obj.fill.red
        this.fG = obj.fill.green
        this.fB = obj.fill.blue
        this.fA = obj.fill.alpha
      }

      show(strkOr = 0, fillOr = 0) {
        if (!strkOr) {
          s.stroke(this.stR, this.stB, this.stG, this.stA)
        }
        if (!fillOr) {
          s.fill(this.fR, this.fG, this.fB, this.fA)
        }
        s.bezier(
          this.x1,
          this.y1,
          this.cpx1,
          this.cpy1,
          this.cpx2,
          this.cpy2,
          this.x2,
          this.y2
        )
      }
    }

    //SETUP
    s.preload = () => {
      songData = s.loadJSON("./data/bergintro_means.json")
      img = s.loadImage(imgfile)

      // s.soundFormats("mp3")
      // song = s.loadSound("./audio/1 berg intro MIX 1.0")
      //stem = loadSound('audio/berg_intro_1_razor',startPlay);
    }

    s.setup = () => {
      s.createCanvas(document.getElementById(container).clientWidth, document.getElementById(container).clientHeight)

      //datasources
      data1 = new DataStream(songData.razor.LoudnessMean)
      // data2 = new DataStream(songData.udu.LoudnessMean)

      //config
      writeSpeed = 10 //framerate

      // gXPos = s.width * 0.25
      // gYPos = s.height * 0.5
      rotateAmt = -20
      linesPerWrite = 1 // how many lines to write per frame
      growShrinkAmt = 1
      growShrinkOn = true //use growing and shrinking form?
      initBezzes = 1 //how many lines to start with
      initMaxBezzes = 200 // how many lines to grow to

      //background initial
      bgColor = {
        red: 183,
        green: 168,
        blue: 118,
        alpha: 150,
      }

      //bezier initial values
      scaleX = 1.2
      scaleY = 1.0
      bez1 = {
        vert: {
          x1: s.width * 0.25,
          y1: s.height * 0.5,
          cpx1: s.width * 0.05,
          cpy1: -s.height * 0.1,
          cpx2: s.width * 0.45,
          cpy2: -s.height * 0.1,
          x2: s.width * 0.75,
          y2: s.height * 0.5,
        },
        stroke: {
          red: 255,
          green: 255,
          blue: 255,
          alpha: 127,
        },
        fill: {
          red: 150,
          green: 150,
          blue: 150,
          alpha: 100,
        },
      }

      //intitializations
      // loopState = false
      // initState = true
      maxBezzes = initMaxBezzes
      s.frameRate(writeSpeed)
      s.angleMode("degrees")
      // mouseDownX = 0
      // mouseDownY = 0
      // s.mouseX = s.width / 2
      // s.mouseY = s.height / 2
      // ellipseX = s.mouseX
      // ellipseY = s.mouseY

      showimage()
      s.background(bgColor.red, bgColor.green, bgColor.blue, bgColor.alpha)
      s.loop()
      startPlay()
    }

    //DRAW
    s.draw = () => {
      // if (!initState) {
      ii = (s.millis() * writeSpeed) / 60 //
      mills = Date.now() - startTime
      timecode = Math.ceil(mills / 16) //sync song to visual
      let easing = 0.03

      //modulations
      //shape
      //bez1.vert.x1 += 0.85 * sin_(ii,10);

      bez1.vert.x1 = followPointer("x", bez1.vert.x1, easing)
      bez1.vert.y1 = followPointer("y", bez1.vert.y1, easing)

      bez1.vert.cpx1 += 11 * vect_(ii, 105).y
      bez1.vert.cpy1 += 1.3 * sin_(ii, 45)
      bez1.vert.cpy2 += 1.3 * sin_(ii, 52)
      bez1.vert.cpy1 += 7.6 * vect_(ii, 300).y
      bez1.vert.cpx2 += 10 * vect_(ii, 400).y
      bez1.vert.cpy1 += 4.2 * vect_(ii, 500).x
      bez1.vert.x2 += -0.5 * sin_(ii, 1000)

      //line color

      //fill color
      bez1.fill.alpha = 10 * sin_(ii, 1000)
      // bez1.fill.red = bez1.fill.red + map(mouseY,height,0,0,100);
      // bez1.fill.green = bez1.fill.green + map(mouseY,height,0,0,10);

      //position
      //gXPos =
      //gYPos =
      //rotateAmt = /*lerp(rotateAmt, Math.round(10 * Math.random()), 0.05)*/ + data2.modulator(timecode,0.8,0,0,10);

      //trail
      //maxBezzes = round(map(mouseX,0,width,1,500));

      //background
      // bgColor.red = lerp(bgColor.red,bgColor.red + data1.modulator(timecode,0.8,0,0,30),0.5);
      bgColor.red = 183 + data1.modulator(timecode, 0.8, 0, 0, 20)

      //ellipse
      // ellipseX = followPointer('x',ellipseX,easing*5);
      // ellipseY = followPointer('y',ellipseY,easing*5);

      //create bez objects
      bezzes.push(new Bez(bez1))
      if (bezzes.length > 1001) {
        let d = bezzes.length - 1001
        for (let i = 0; i < d; i++) {
          bezzes.shift()
        }
      }

      //drawing
      if (s.frameCount % linesPerWrite == 0) {
        //c.clear(); //transparent background
        showimage()
        s.background(bgColor.red, bgColor.green, bgColor.blue, bgColor.alpha) //
        //s.background(0)
        //pointer circle
        // push();
        // 	noStroke();
        // 	fill(150);
        // 	ellipse(ellipseX, ellipseY, 10, 10);
        // pop();
        s.push()
        //translate((x2-x1)/2,0)
        s.shearX(rotateAmt) // does this work?

        s.scale(scaleX, scaleY)

        //more modulations
        // stroke(bez1.stroke.red,bez1.stroke.green,bez1.stroke.blue,bez1.stroke.alpha + Math.round(data2.modulator(timecode,0.75,0,0,105)));
        // fill(bez1.fill.red,bez1.fill.green,bez1.fill.blue,map(mouseX,0,width,0,1));

        writeLines(s.frameCount - 2, maxBezzes, 0, 0)
        s.pop()

        // grow/shrink
        if (growShrinkOn) {
          growShrink(initMaxBezzes)
        }
      }

      if (timecode >= data1.stream.length - 10 * (1000 / writeSpeed)) {
        // console.log(timecode)
        startPlay(song)
      }

      // console.log(
      //   millisToTime(mills) +
      //     " | " +
      //     timecode +
      //     " | " +
      //     Math.floor((100 * timecode) / data1.stream.length) +
      //     "%"
      // )
      // }
    }
    //follow the pointer with easing
    function followPointer(axis, val, easing) {
      if (axis == "x") {
        if (val != s.mouseX) {
          return val + (s.mouseX - val) * easing
        } else {
          return val
        }
      } else if (axis == "y") {
        if (val != s.mouseY) {
          return val + (s.mouseY - val) * easing
        } else {
          return val
        }
      } else {
        throw new SyntaxError("first argument must be x or y (string)")
      }
    }

    function writeLines(framecount, maxbezzes, strkOr = 0, fillOr = 0) {
      let startLine
      let numLines

      if (framecount < maxbezzes) {
        numLines = framecount
        startLine = bezzes.length - framecount
      } else if (bezzes.length < maxbezzes) {
        numLines = bezzes.length
        startLine = 0
      } else {
        numLines = maxbezzes
        startLine = bezzes.length - maxbezzes
      }

      for (let i = startLine; i < startLine + numLines; i++) {
        bezzes[i].show(strkOr, fillOr)
      }
    }

    //START THINGS
    function startPlay() {
      timecode = 0
      startTime = Date.now()
      // song.play()
    }

    //IMAGE + BG
    function imgsub() {
      img.resize(s.width, 0)
      subw = submatx * img.width
      subh = submatx * img.height

      //sin / noise
      subx = s.map(sin_(ii, 768), -1, 1, 0, img.width * submatx)
      suby = s.map(sin_(ii, 890), -1, 1, 0, img.height * submatx)
      // suby = sin_(ii,8432,0,img.height*submatx);
      // // subx = bfg(timecode, 0.0006, 3, 0.2, 0, img.width * submatx);
      // // suby = bfg(timecode+3892, 0.0006, 4, 0.5, 0, img.width * submatx);

      // //mouse
      // let tx = map(mouseX,0,width,0,img.width * submatx) - subx;
      // let ty = map(mouseY,0,height,0,img.height * submatx) - suby;
      // subx += tx * matxeasing;
      // suby += ty * matxeasing;
    }

    function showimage() {
      imgsub()
      s.image(img, 0, 0, s.width, s.height, subx, suby, subw, subh)
    }

    //DRAWING

    function growShrink(max) {
      maxBezzes += growShrinkAmt
      if (maxBezzes > max || maxBezzes < initBezzes) {
        growShrinkAmt = -growShrinkAmt
      }
    }

    //MODULATORS
    function sin_(i, speed = 100) {
      return s.sin(i / speed + Math.PI / 2)
    }

    function vect_(i, speed = 1000) {
      // eslint-disable-next-line no-undef
      return p5.Vector.fromAngle(i / speed, 1)
    }

    //JSON MANIPULATION
    class DataStream {
      constructor(path) {
        this.stream_ = path.slice(2, path.length) // first two items in the array are weird
        this.min = this.calcMax()
        this.max = this.calcMax()
      }

      get stream() {
        return this.stream_
      }

      calcMin() {
        let bottom = 100000
        for (let i = 0; i < this.stream.length; i++) {
          if (this.stream[i] < bottom) {
            bottom = this.stream[i]
          }
        }
        return bottom
      }

      calcMax() {
        let top = -100000
        for (let i = 0; i < this.stream.length; i++) {
          if (this.stream[i] > top) {
            top = this.stream[i]
          }
        }
        return top
      }

      modulator(index, scalemin, scalemax, outputmin, outputmax) {
        let inputmin = this.min + scalemin * (this.max - this.min)
        let inputmax = this.max - scalemax * (this.max - this.min)
        let value = s.map(
          this.stream_[index],
          inputmin,
          inputmax,
          outputmin,
          outputmax
        )
        return this.clamp(value, outputmin, outputmax) // (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
      }

      gate(index, threshold) {
        let value = s.map(this.stream[index], this.min, this.max, 0, 1)
        return threshold < value
      }

      clamp(num, low, high) {
        return Math.max(Math.min(num, Math.max(low, high)), Math.min(low, high))
      }
    }

    // s.mouseWheel = () => {
    //   if (song.isLoaded() && !song.isPlaying()) song.play()
    // }
    //UTILITY
    // function millisToTime(mills) {
    //   let minutes = "0" + Math.floor(mills / 60000).toString()
    //   let seconds = "0" + Math.floor((mills % 60000) / 1000).toString()
    //   return minutes.slice(-2) + ":" + seconds.slice(-2)
    // }
  }, container)

export default sketch
