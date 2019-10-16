declare module "emscripten_module" {
    interface EmscriptenModule {
        readonly wasmMemory: WebAssembly.Memory;
        readonly HEAPU8: Uint8Array;

        locateFile: (path: string) => string;
        onRuntimeInitialized: () => void;
        _malloc: (size: size_t) => uintptr_t;
        _free: (addr: size_t) => uintptr_t;
    }

    export default EmscriptenModule;
    export type uintptr_t = number;
    export type size_t = number;
}