cmake_minimum_required(VERSION 3.9)
project(wasm)
include(ExternalProject)

set(CMAKE_CXX_STANDARD 17)

set(EMSCRIPTEN_VERSION 1.38.21)
set(EMSCRIPTEN_DIR ${CMAKE_CURRENT_SOURCE_DIR}/tools/emsdk/emscripten/${EMSCRIPTEN_VERSION})
include_directories(${EMSCRIPTEN_DIR}/system/include)

set(CMAKE_EXECUTABLE_SUFFIX "")
set(CMAKE_C_COMPILER ${EMSCRIPTEN_DIR}/emcc)
set(CMAKE_CXX_COMPILER ${EMSCRIPTEN_DIR}/em++)

ExternalProject_Add(
        emsdk
        SOURCE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/tools/emsdk
        GIT_REPOSITORY https://github.com/juj/emsdk.git
        UPDATE_COMMAND ""
        CONFIGURE_COMMAND <SOURCE_DIR>/emsdk install sdk-${EMSCRIPTEN_VERSION}-64bit && <SOURCE_DIR>/emsdk activate sdk-${EMSCRIPTEN_VERSION}-64bit
        BUILD_COMMAND ""
        INSTALL_COMMAND ""
)

add_executable(
        point.js
        src/point_main.cpp
)

set_target_properties(
        point.js
        PROPERTIES COMPILE_FLAGS "\
        -O3\
    "
)

set_target_properties(
        point.js
        PROPERTIES LINK_FLAGS "\
        -s ENVIRONMENT=web\
        -s NO_EXIT_RUNTIME=1\
        -s MODULARIZE=1\
        -s FILESYSTEM=0\
        -s EXPORT_ES6=1\
        -s TOTAL_MEMORY=32MB\
        -s BINARYEN_TRAP_MODE='clamp'\
        -s DISABLE_EXCEPTION_CATCHING=0\
        -s ASSERTIONS=0\
        -s SAFE_HEAP=0\
        -s ALLOW_MEMORY_GROWTH=1\
        --bind\
    "
)

add_dependencies(point.js emsdk)