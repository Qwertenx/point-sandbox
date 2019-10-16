import createPointModuleApi from 'emscripten_point';
import initEmscriptenModule from './emscripten_module_initializer';
import * as pointModule from 'emscripten_point.wasm';

const pointModuleInitialization = initEmscriptenModule(
    'data:application/wasm;base64,' + pointModule,
    createPointModuleApi
);

(document.getElementById('button') as HTMLButtonElement).addEventListener('click', onDistanceButtonClicked);

async function onDistanceButtonClicked() {
    const module = await pointModuleInitialization;
    const x1 = parseInt((document.getElementById('x1') as HTMLInputElement).value);
    const y1 = parseInt((document.getElementById('y1') as HTMLInputElement).value);
    const x2 = parseInt((document.getElementById('x2') as HTMLInputElement).value);
    const y2 = parseInt((document.getElementById('y2') as HTMLInputElement).value);
    const result = document.getElementById('result') as HTMLTextAreaElement;
    result.value = module.distance({x: x1, y: y1}, {x: x2, y: y2}).toString();
}
