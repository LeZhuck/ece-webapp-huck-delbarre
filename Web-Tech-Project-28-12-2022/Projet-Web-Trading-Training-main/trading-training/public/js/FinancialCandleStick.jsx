import React from "react";
import dynamic from 'next/dynamic'

// Will only import `react-p5` on client-side
const FinanceCandleStick = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

let canvas;

var Courbes = [];
let N = 1;
let opacity = 10

let W;
let H;



class Courbe {
  constructor(p5, color) {

    this.y = H / 5;

    this.color = color;


    this.x = 0;
    this.Speed = 5 // the higher ==> the slower
    this.Vx = p5.random(1, 5) / this.Speed;
    this.thicc = 10;
    this.high = p5.random(10, 45);
    this.space = this.thicc * 2 + this.Speed * 1;
    this.LastY = this.y + this.high;
    this.LastX = this.x;

  }
  move(p5) {

    this.x += this.space;


    if (this.x > W) {
      this.x = 0;
      this.y = H / 5;
      p5.background(this.color["rgb"]["r"], this.color["rgb"]["g"], this.color["rgb"]["b"]);

    }

  }
  display(p5) {
    let c = p5.color(255, 255, 255, opacity)
    this.LastY = this.y
    if (p5.random(-1, 1) > 0) {
      this.high *= -1
    }
    if (this.high < 0) {
      c = p5.color(70, 219, 196, opacity)

      p5.stroke(255, 255, 255, opacity);
      p5.line(this.x + this.thicc / 2, this.y + this.high * (-1) * p5.random(1, 15) / 10,
        this.x + this.thicc / 2, this.y)
      p5.line(this.x + this.thicc / 2, this.y + this.high + this.high * (1) * p5.random(1, 15) / 10,
        this.x + this.thicc / 2, this.y + this.high)
    } else {
      c = p5.color(255, 0, 0, opacity)

      p5.stroke(255, 255, 255, opacity);
      p5.line(this.x + this.thicc / 2, this.y + this.high * (-1) * p5.random(1, 15) / 10,
        this.x + this.thicc / 2, this.y)
      p5.line(this.x + this.thicc / 2, this.y + this.high + this.high * (1) * p5.random(1, 15) / 10,
        this.x + this.thicc / 2, this.y + this.high)
    }
    //draw

    p5.stroke(255, 255, 255, opacity);
    p5.fill(c);
    p5.rect(this.x, this.y, this.thicc, this.high)

    this.y = this.LastY + this.high
    this.LastX = this.x

    if (this.high < 0) {
      this.high = p5.random(15, 45) * (-1)
    } else {
      this.high = p5.random(15, 45)
    }

  }

}



export default ({ couleur }) => {

  let color;
  const windowResized = (p5) => {
    p5.resizeCanvas(document.body.scrollWidth, document.body.scrollHeight);
    W = document.body.scrollWidth;
    H = document.body.scrollHeight;
    p5.background(color["rgb"]["r"], color["rgb"]["g"], color["rgb"]["b"]);
  }

  const setup = (p5, canvasParentRef) => {

    let color = couleur;

    canvas = p5.createCanvas(document.body.scrollWidth, document.body.scrollHeight).parent(canvasParentRef);
    W = document.body.scrollWidth;
    H = document.body.scrollHeight;

    canvas.style('z-index', '-1');
    canvas.position(0, 0);
    for (let i = 0; i < N; i++) {
      Courbes[i] = new Courbe(p5, color);
    }
    p5.frameRate(4)
    //console.log("couleur")
    //console.log(color["rgb"])
    p5.background(color["rgb"]["r"], color["rgb"]["g"], color["rgb"]["b"]);

  };

  const draw = (p5) => {
    if (color != couleur) {
      color = couleur;
      p5.background(color["rgb"]["r"], color["rgb"]["g"], color["rgb"]["b"]);
    }
    for (let i = 0; i < N; i++) {
      Courbes[i].move(p5);
      Courbes[i].display(p5);
    }
  };

  return (<FinanceCandleStick setup={setup} draw={draw} windowResized={windowResized} />);
};



