OUTPUT_WASM = ./out/wasm
WASM_PATH = ./wasm

NODE    ?= node
NPM     ?= npm
GIT     ?= git
CMAKE   ?= cmake

.PHONY: dev
dev:
	$(CMAKE) -B$(OUTPUT_WASM) -H$(WASM_PATH) -DCMAKE_BUILD_TYPE=Release
	$(CMAKE) --build $(OUTPUT_WASM) --target point.js
	$(NPM) run dev