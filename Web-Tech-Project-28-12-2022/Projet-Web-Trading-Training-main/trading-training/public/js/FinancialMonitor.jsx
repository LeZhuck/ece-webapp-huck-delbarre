import React from "react";
import dynamic from 'next/dynamic'

// Will only import `react-p5` on client-side
const FinanceMonitor = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})

let canvas;

let SymbolGestion;
let X;




class SymbolsManage {

    constructor(data) {

        // data looks like this: [{"symbol":"BTCUSDT","lastPrice":1331},{"symbol":"ETHUSDT","lastPrice":133}]
        this.S = []
        this.P = []
        this.Prct = []
        for (let i = 0; i < data.length; i++) {
            // check that symbol contains USDT
            if ((parseFloat(data[i].lastPrice).toFixed(3))!=0.0 ) {
                
                
                this.S.push(data[i].symbol)
                this.P.push(parseFloat(data[i].lastPrice).toFixed(3))
                this.Prct.push(parseFloat(data[i].priceChangePercent).toFixed(3))
                    
                
                             
            }


        }
        //this.S = ["BTCUSDT", "ETHUSDT", "LTCUSDT", "Test", "Attention", "Violentement", "rabin druide", "Encore longtemps" ]
        //this.P = [1331,133,12, 1331,133,12,1331, 208]

        this.symbols = []

        this.N = 0


        this.symbols.push(new SymbolData(this.S[0], this.P[0], this.Prct[0]));



    }
    update(p5) {
        let indexSupp = 1000;
        for (let i = 0; i < this.symbols.length; i++) {
            let retour = this.symbols[i].move(p5)
            if (retour == 1) {
                //this.symbols.slice(i,1)
                //console.log("Suppr")
                indexSupp = i
            }
            if (retour == 2) {
                this.N += 1
                if (this.N >= this.S.length) {
                    this.N = 0
                }
                this.symbols.push(new SymbolData(this.S[this.N], this.P[this.N], this.Prct[this.N]))
            }
        }
        if (indexSupp != 1000) {
            this.symbols.splice(indexSupp, 1)
        }

    }

    display(p5) {
        for (let i = 0; i < this.symbols.length; i++) {
            this.symbols[i].display(p5)
        }
    }



}

class SymbolData {

    constructor(S, P, Prct) {
        this.Symbol = S
        this.Price = P
        this.Prct = Prct
        this.x = X
        this.y = 50 / 2
        this.push = false

    }

    move(p5) {

        this.x += -1.5

        if (this.x + 100 < 0) {
            return 1
        } else if ((this.x < X - 200) && this.push == false) {
            this.push = true
            return 2
        }


    }
    display(p5) {
        p5.fill(70, 189, 196)
        p5.textSize(24)
        p5.textStyle(p5.BOLD);
        p5.text(this.Symbol, this.x, this.y + 35)
        p5.textStyle(p5.NORMAL);
        p5.textSize(16)
        p5.text(this.Price, this.x, this.y + 10)
        p5.textSize(12)
        if(this.Prct>0){
            p5.fill(0,255,0)
        }else{
            p5.fill(255,0,0)
        }
        p5.text(this.Prct + " %", this.x + 80, this.y + 10 )

    }

}


export default ({ data }) => {


    const windowResized = (p5) => {



        p5.resizeCanvas(p5.windowWidth - 50, 75);
        X = p5.windowWidth - 50

        p5.background(18, 18, 18);
    }

    const setup = (p5, canvasParentRef) => {

        //console.log(data)

        canvas = p5.createCanvas(p5.windowWidth - 50, 75).parent(canvasParentRef);

        X = p5.windowWidth - 50

        //




        canvas.style('z-index', '25');
        SymbolGestion = new SymbolsManage(data)
        p5.frameRate(60)
        p5.textSize(24)

        //p5.stroke(70, 189, 196);
        //p5.background(18,18,18);

        //p5.fill(70, 189, 196);

    };

    const draw = (p5) => {

        p5.background(18, 18, 18);
        p5.fill(255)
        SymbolGestion.update(p5)
        SymbolGestion.display(p5)
        //let circleCute = p5.circle(p5.mouseX, p5.mouseY, 5);
        // p5 circle in front of the canvas



        //p5.text(p5.frameRate(), 10, 10);

    };

    return (<FinanceMonitor setup={setup} draw={draw} windowResized={windowResized} />);
};



