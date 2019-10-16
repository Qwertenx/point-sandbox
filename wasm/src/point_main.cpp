#include <emscripten/bind.h>
#include <emscripten.h>
#include <math.h>

struct Point {
    double x;
    double y;
};

double sqr(double x) {
    return x * x;
}

EMSCRIPTEN_BINDINGS(my_value_example) {
    emscripten::value_object<Point>("Point")
        .field("x", &Point::x)
        .field("y", &Point::y)
        ;

    emscripten::register_vector<Point>("vector<Point>");

    emscripten::function("distance", emscripten::optional_override(
        [](Point point1, Point point2) {
            return sqrt(sqr(point1.x - point2.x) + sqr(point1.y - point2.y)) ;
        }));
}