# Connected Components Image Processor

C++ thresholding and connected-component extraction for grayscale PGM images.

## Overview

Identify connected foreground regions in grayscale images and filter them by size. The project implements image reading, component storage, copy/move operations and an interactive command-line workflow.

Origin: UCT CSC3022, 2024. Authored C++ coursework plus supplied sample images and Catch test header.

## Technical Approach

Threshold pixels, traverse neighbours with a queue-based flood fill, collect component pixels and retain components within user-selected size bounds. This is classical image processing rather than a learned ML model.

## Tech Stack

C++17 recommended; standard library; supplied Catch test header; optional CMake.

## Key Features

- Threshold control
- min/max component-size filtering
- component statistics
- PGM mask output
- submitted tests.

## Architecture / Pipeline

PGM input --> threshold --> BFS connected components --> size filter --> output mask

## Results

The cleaned processor compiled with GCC and successfully wrote a PGM mask from the supplied Birds image. The original Catch suite passed **19 assertions in two test cases** during verification on 2026-10-05. No accuracy benchmark is claimed.

## Running the Project

```sh
g++ -std=c++17 PGMimageProcessor.cpp ConnectedComponent.cpp driver.cpp -o components
./components -t 128 -s 10 35 -w generated.pgm Birds.pgm
# Submitted tests:
g++ -std=c++17 PGMimageProcessor.cpp ConnectedComponent.cpp tests.cpp -o component_tests
./component_tests
```

## Project Structure

C++ sources at the root; Birds.pgm/chess.pgm: supplied examples; catch.hpp: third-party test header; CMakeLists.txt: cleanup build definition; results/portfolio-cleanup/component-mask.pgm: generated verification output.

## What I Learned

Image representation, graph traversal, object ownership and C++ copy/move semantics.

## Possible Improvements

Validate malformed PGM/CLI inputs, extend image-format support and independently verify component statistics.

## Portfolio Cleanup / Post-project Improvements

Added CMake build/setup documentation and a labelled verification mask. Renamed the student-number namespace to image_processing without changing the algorithm; rebuilt and reran the submitted tests. Compiled binaries and temporary test outputs are omitted. The image fixtures and Catch header retain separate rights.
