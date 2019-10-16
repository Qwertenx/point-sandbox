declare module "emscripten_point" {
    import EmscriptenModule, {uintptr_t, size_t} from 'emscripten_module';

    interface NativeObject {
        delete: () => void;
    }

    interface Vector<T> extends NativeObject {
        get(index: number): T;
        size(): number;
    }

    interface Point {
        readonly x: number;
        readonly y: number;
    }

    interface PointModule extends EmscriptenModule {
        distance: (point1: Point, point2: Point) => number;
    }

    type PointModuleUninitialized = Partial<PointModule>;

    export default function createModuleApi(Module: Partial<PointModule>): PointModule;
}