import Scene from './src/Scene';
import BlackAndWhiteFilter from './src/Filter/BlackAndWhiteFilter';
import SepiaFilter from './src/Filter/SepiaFilter';
import NoiseFilter from './src/Filter/NoiseFilter';
import GlitchFilter from './src/Filter/GlitchFilter';


let width = 250;
let height = 400;

new Scene({
    canvas:'#natural',
    height:height,
    width:width
});
new Scene({
    canvas:'#sepia',
    height:height,
    width:width,
    filters:[SepiaFilter]
});
new Scene({
    canvas:'#black-and-white',
    height:height,
    width:width,
    filters:[NoiseFilter]
});

new Scene({
    canvas:'#noise',
    height:height,
    width:width,
    filters:[BlackAndWhiteFilter,GlitchFilter]
});