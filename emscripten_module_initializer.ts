import EmscriptenModule from 'emscripten_module';

/**
 * Promisifies initialization of emscripten module.
 *
 * @param moduleUrl URL to wasm file, it could be encoded data URL.
 * @param moduleInitializer Escripten module factory,
 *        see https://emscripten.org/docs/compiling/WebAssembly.html#compiler-output.
 */
export default function initEmscriptenModule<ModuleT extends EmscriptenModule>(
    moduleUrl: string,
    moduleInitializer: (module: Partial<EmscriptenModule>) => ModuleT
): Promise<ModuleT> {
    return new Promise((resolve) => {
        const module = moduleInitializer({
            locateFile: () => moduleUrl,
            onRuntimeInitialized: function (): void {
                // module itself is thenable, to prevent infinite promise resolution
                delete (<any>module).then;

                resolve(module);
            }
        });
    });
}
