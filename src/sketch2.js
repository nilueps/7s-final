import p5 from 'p5'

p5.disableFriendlyErrors = true;
const sketch = (container) => {
  if (container == null) return;
  new p5((s) => {

    //TUBE PARAMS

    // basic form
    const vertices = 3; // number of vertices
    const magbase = 20; // base vertex vector magnitude
    const magrange = 60; // range of vertex vector magnitude modulation

    // variation within form
    const vertOct = 10; // perlin octaves
    const vertFall = 0.5; // perlin falloff
    const vertInc = 0.4; // perlin increment
    const ctrlMagCoeff = 0.7; // magnitude multiplier for control points

    // variation among forms
    const formInc = 0.065; // perlin noise

    //start position of tube
    const posOct = 10;
    const posFall = 0.5;
    const posInc = 0.007; //0.004
    const posRange = 0; //<----

    //direction of tube
    const transOct = 10; // perl oct
    const transFall = 0.5; // perl inc
    const transInc = 0.008; // perl increment
    const transAmt = 10;

    //tube wiggle
    const wiggleAmt = 4;

    //length of tube
    const maxlines = 5; // number of forms to draw per frame

    //shadow form
    const numShadows = 800;
    const shadvert = 3;
    const shadowfill = [10, 10, 10, 9];
    const rotinc = 0.03;
    const shadmb = 0.3;
    const shadmr = 0.2;
    const shadoct = 4;
    const shadflf = 0.1;
    const shadscl = 0.8;
    const shadinc = 1.9;

    //background
    const imgfile = "img/sketch2-bg.jpeg";
    // const imgfile = "img/test-452.png"
    const submatx = 0.5;
    const matxeasing = 0.1;

    /***********************************************************************/

    //sketch config

    const writeSpeed = 50;
    const songLength = 11374;

    /***********************************************************************/

    //initial
    let tube;
    let shadow;
    let formOff = Math.floor(Math.random() * 10000); // modulation of the form shape
    let transOff = formOff + 639; // modulation of form position
    let posOff = transOff + 892;
    let rotamt = 0;
    let mills = 0;
    let ii = 0;
    let timecode = 0;
    let rotdisp;
    let img;
    let subx;
    let suby;

    //JSON data
    let songData;
    let otTone;
    let radiodrone;

    let outAC1, subw, subh, startTime;

    s.preload = () => {
      songData = s.loadJSON("data/covid_means.json");
      img = s.loadImage(imgfile);
    };

    s.setup = () => {
      s.frameRate(writeSpeed);
      s.createCanvas(
        document.getElementById(container).clientWidth,
        document.getElementById(container).clientHeight
      );

      //prep json data for querying
      otTone = new DataStream(songData.otTone.EnergyMean, 1);
      outAC1 = new DataStream(songData.outside.AC1Mean, 1);
      radiodrone = new DataStream(songData.radiodrone.FrequencyMean, 1);

      tube = new Tube(maxlines);
      shadow = new Tube(1);

      let shadowform = new ShadowForm(
        shadvert,
        s.height * shadmb,
        s.height * shadmr,
        shadoct,
        shadflf,
        shadinc,
        shadscl
      );
      shadowform.create(0);
      shadow.addForm(shadowform);
      timecode = 0;
      startTime = Date.now();
    };

    s.draw = () => {
      s.background(150);
      showimage();

      // if (loopState) {
      gettime();
      /* shadow */
      s.push();
      s.noStroke();
      s.fill(shadowfill);
      s.translate(s.width / 2, s.height / 2);
      s.rotate(rotamt);
      rotdisp =
        outAC1.modulator(timecode, 0, 0, 0, 0.8, 40) +
        otTone.modulator(timecode, 0, 0, 0, 6, 40);

      let howmany = Math.round(
        s.constrain(s.pow(timecode / 5000, 4), 0, 1) * numShadows
      );
      shadow.drawMany(howmany, 1, rotdisp);
      s.pop();
      rotamt += (rotinc * 10) / writeSpeed;

      /* tube create */
      let tubeform = new ShadowForm(
        vertices,
        magbase,
        magrange,
        vertOct,
        vertFall,
        vertInc,
        ctrlMagCoeff
      );
      tubeform.create(formOff);
      tube.addForm(tubeform);

      /* tube draw */
      s.strokeWeight(1);
      s.noStroke(); //stroke(255,255,255,radiodrone.modulator(timecode,0,0,0,10,10));
      s.fill(15, 15, 15, radiodrone.modulator(timecode, 0, 0, 0, 100, 30));
      s.push();
      s.translate(s.width / 2, s.height / 2);
      tube.centerP(posOct, posFall, posOff, posRange, s.frameCount / 1000);
      tube.drawP(transOff, transAmt, wiggleAmt, transOct, transFall, transInc);
      s.pop();

      /* perl inc */
      formOff += (formInc * 10) / writeSpeed;
      transOff += (transInc * 10) / writeSpeed;
      posOff += (posInc * 10) / writeSpeed;

      /* song end check */
      if (timecode >= songLength - 10) {
        console.log(timecode);
        startPlay();
      }
      // }
    };

    function imgsub() {
      img.resize(s.width, 0);
      subw = submatx * img.width;
      subh = submatx * img.height;

      //sin / noise
      subx = sin_(ii, 7010, 0, img.width * submatx);
      suby = sin_(ii, 8432, 0, img.height * submatx);
      //mouse
      let tx = s.map(s.mouseX, 0, s.width, 0, img.width * submatx) - subx;
      let ty = s.map(s.mouseY, 0, s.height, 0, img.height * submatx) - suby;
      subx += tx * matxeasing;
      suby += ty * matxeasing;
    }

    function showimage() {
      imgsub();
      s.image(img, 0, 0, s.width, s.height, subx, suby, subw, subh);
    }

    //TIMING
    function startPlay() {
      timecode = 0;
      startTime = Date.now();
      // song.play()
      // initState = false
    }

    function gettime() {
      mills = Date.now() - startTime;
      timecode = Math.ceil(mills / 16); //sync song to visual
      ii = (mills * writeSpeed) / 60;
    }

    //MODULATORS
    function sin_(i, speed = 100, low = -1, high = 1) {
      return s.map(s.sin(i / speed + s.PI / 2), -1, 1, low, high);
    }

    class DataStream {
      constructor(path, startpoint = 0) {
        this.stream_ = path.slice(startpoint, path.length);
      }

      get stream() {
        return this.stream_;
      }

      get min() {
        let bottom = 100000;
        for (let i = 0; i < this.stream.length; i++) {
          if (this.stream[i] < bottom) {
            bottom = this.stream[i];
          }
        }
        return bottom;
      }

      get max() {
        let top = -100000;
        for (let i = 0; i < this.stream.length; i++) {
          if (this.stream[i] > top) {
            top = this.stream[i];
          }
        }
        return top;
      }

      modulator(
        index,
        scalemin,
        scalemax,
        outputmin,
        outputmax,
        smoothing = 1
      ) {
        let inputmin = this.min + scalemin * (this.max - this.min);
        let inputmax = this.max - scalemax * (this.max - this.min);
        if (smoothing < 1) smoothing = 1;
        let sum = 0;
        let avg = 0;
        for (let i = 0; i < smoothing; i++) {
          if (index - i >= 0) {
            let value = s.map(
              this.stream[index - i],
              inputmin,
              inputmax,
              outputmin,
              outputmax
            );
            sum += value;
            avg = sum / (i + 1);
          }
        }
        return this.clamp(avg, outputmin, outputmax); // (num, a, b) => Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
      }

      gate(index, threshold) {
        let value = s.map(this.stream[index], this.min, this.max, 0, 1);
        return threshold < value;
      }

      clamp(num, low, high) {
        return Math.max(
          Math.min(num, Math.max(low, high)),
          Math.min(low, high)
        );
      }
    }
    class ShadowForm {
      constructor(
        vertices,
        magbase,
        magrange,
        octaves,
        falloff,
        perlinc,
        ctrlscl
      ) {
        this.spacing = s.TWO_PI / vertices;
        this.vertices = [];
        this.controls = [];
        this.controls2 = [];
        this.magrange = magrange;
        this.magbase = magbase;
        this.perlinc = perlinc;
        this.ctrlscl = ctrlscl;
        this.octaves = octaves;
        this.falloff = falloff;
      }

      create(xoff) {
        //vertices
        for (let a = 0; a < s.TWO_PI; a += this.spacing) {
          let perl = s.noise(xoff);
          let mag = this.magbase + perl * this.magrange;
          // eslint-disable-next-line no-undef
          let vertex = p5.Vector.fromAngle(a, mag);
          this.vertices.push(vertex);
          xoff += this.perlinc;
        }

        //control points 1
        let cp1off = xoff + 50;
        for (let a = 0; a < this.vertices.length; a++) {
          let angle =
            this.vertices[a].heading() -
            (2 * s.noise(cp1off) * this.spacing) / 2;
          let mag =
            this.vertices[a].mag() * this.ctrlscl * (s.noise(cp1off) + 1);
          // eslint-disable-next-line no-undef
          let control = p5.Vector.fromAngle(angle, mag);
          this.controls.push(control);
          cp1off += this.perlinc;
        }

        //control points 2
        let cp2off = xoff + 900;
        for (let a = 0; a < this.vertices.length; a++) {
          let angle =
            this.vertices[a].heading() -
            (2 * s.noise(cp2off) * this.spacing) / 2;
          let mag =
            this.vertices[a].mag() * this.ctrlscl * (s.noise(cp2off) + 1);
          // eslint-disable-next-line no-undef
          let control = p5.Vector.fromAngle(angle, mag);
          this.controls2.push(control);
          cp2off += this.perlinc;
        }
      }

      updateVPoints() {
        for (let i = 0; i < this.vertices.length; i++) {
          s.point(this.vertices[i].x, this.vertices[i].y);
        }
      }

      updateCPoints() {
        for (let i = 0; i < this.controls.length; i++) {
          s.point(this.controls[i].x, this.controls[i].y);
        }
      }

      drawP(xoff, pAmt, sAmt, oct, falloff, inc) {
        s.noiseDetail(oct, falloff);
        let perlx = s.map(s.noise(xoff), 0, 1, -pAmt, pAmt);
        let perly = s.map(s.noise(xoff + 2349), 0, 1, -pAmt, pAmt);
        s.translate(perlx, perly);
        let xx = sin_(xoff, 69, -sAmt, sAmt);
        let yy = sin_(xoff, 27, -sAmt, sAmt);
        s.translate(xx, yy);
        xoff += inc;
        this.drawShape();
      }

      drawShape() {
        let v = this.vertices;
        let c = this.controls;
        let c2 = this.controls2;

        s.beginShape();
        for (let i = 0; i < v.length + 1; i++) {
          if (i == 0) {
            s.vertex(v[0].x, v[0].y);
          } else if (i == v.length) {
            s.bezierVertex(c[0].x, c[0].y, c2[0].x, c2[0].y, v[0].x, v[0].y);
          } else {
            s.bezierVertex(c[i].x, c[i].y, c2[i].x, c2[i].y, v[i].x, v[i].y);
          }
        }
        s.endShape();
      }

      get angles() {
        let angles = {
          vertices: [],
          controls: [],
          controls2: [],
        };
        for (let i = 0; i < this.vertices.length; i++) {
          angles.vertices.push(this.vertices[i].heading());
          angles.controls.push(this.controls[i].heading());
          angles.controls2.push(this.controls[i].heading());
        }
        return angles;
      }

      get mags() {
        let mags = {
          vertices: [],
          controls: [],
          controls2: [],
        };
        for (let i = 0; i < this.vertices.length; i++) {
          mags.vertices.push(this.vertices[i].mag());
          mags.controls.push(this.controls[i].mag());
          mags.controls2.push(this.controls[i].mag());
        }
        return mags;
      }
    }

    class Tube {
      constructor(maxlen) {
        this.forms = [];
        this.maxlines = maxlen;
      }

      createAll() {}

      centerP(cenOct, cenFall, cenOff, cenRange, scale) {
        s.noiseDetail(cenOct, cenFall);
        cenRange *= scale;
        let posX = s.map(s.noise(cenOff), 0, 1, -cenRange, cenRange);
        let posY = s.map(s.noise(cenOff + 232), 0, 1, cenRange, cenRange);
        s.translate(posX, posY);
      }

      addForm(itemToAdd) {
        let arr = this.forms;
        let max = this.maxlines;
        arr.push(itemToAdd);
        if (arr.length > max) {
          for (let i = 0; i < arr.length - max; i++) {
            arr.shift();
          }
        }
      }

      lines() {
        let max = this.maxlines;
        let len = this.forms.length;
        let g = {};

        if (len <= max) {
          g.end = len;
          g.start = 0;
        } else if (len > max) {
          g.end = len;
          g.start = len - max;
        }

        return g;
      }

      drawMany(howmany, recede, rot) {
        let l = this.lines();
        for (let j = 0; j < howmany; j++) {
          if (recede) {
            let o = 1 - j * (1 / howmany);
            s.scale(o);
          }
          if (rot > 0) {
            let t = j * (s.TWO_PI / howmany);
            s.rotate(t * rot);
          }
          for (let i = l.start; i < l.start + l.end; i++) {
            this.forms[i].drawShape();
          }
        }
      }

      draw() {
        let l = this.lines();
        for (let i = l.start; i < l.start + l.end; i++) {
          this.forms[i].drawShape();
        }
      }

      drawP(tOff, tAmt, wAmt, tOct, tFall, tInc) {
        let l = this.lines();
        for (let i = l.start; i < l.start + l.end; i++) {
          this.forms[i].drawP(tOff, tAmt, wAmt, tOct, tFall, tInc);
        }
      }
    }
  }, container);
};
export default sketch;
