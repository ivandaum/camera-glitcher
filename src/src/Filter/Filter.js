export default class Filter {
    constructor(canvas) {
        this.pixels = [];

        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext('2d');
    }

    updateData(callback,x,y) {
        x = x || 0;
        y = y || 0;

        let datas = this.context.getImageData(x, y, this.canvas.width - x, this.canvas.height - y);
        
        for (let i=0;i<datas.data.length;i+=4) {

            let newPixel = callback({
                r:datas.data[i],
                g:datas.data[i+1],
                b:datas.data[i+2]
            });

            datas.data[i] = newPixel.r;
            datas.data[i+1] = newPixel.g;
            datas.data[i+2] = newPixel.b;
        }
        
        this.context.putImageData(datas,0,0);
    }


    interpolate (a, b, t) {
        return a + t * (b - a);
    }
    
    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    rgbToHex(r, g, b) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);

        return "#" 
        + ( r.length == 1 ? "0" + r : r ) 
        + ( r.length == 1 ? "0" + g : g ) 
        + ( r.length == 1 ? "0" + b : b );
    }

    update() { }
}