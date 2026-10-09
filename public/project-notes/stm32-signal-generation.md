# STM32 Signal Generation & ADC/PWM

Embedded C experiments using timers, DMA, waveform lookup tables and ADC-controlled PWM.

Public release: [documentation-only case study](https://github.com/azharabdool/stm32-signal-generation). Shared/vendor firmware remains private; this repository contains only documentation and a source-derived plot.

Live [interactive signal desk](https://azharabdool.vercel.app/playground/stm32/) is a new portfolio visualisation, not hardware measurement or firmware execution.

## Overview

Explore timing and peripheral coordination on an STM32F0-based laboratory setup. Practical 4 generates waveforms; Practical 3 samples analogue input and changes PWM behaviour.

Origin: UCT EEE3096S embedded practicals, 2023. Group practical work; includes STM32 vendor-generated boilerplate.

## Technical Approach

Timer-triggered DMA transfers lookup-table values to a PWM compare register. Separate sine, sawtooth and triangle tables support waveform selection. Related code uses ADC sampling, LCD output and GPIO interrupts.

## Tech Stack

C; STM32F0 HAL/LL/CMSIS; timers; DMA; PWM; ADC; LCD support library; board-specific STM32 toolchain.

## Key Features

- Waveform tables
- timer/DMA coordination
- PWM duty-cycle updates
- ADC polling
- LCD/interrupt interaction.

## Architecture / Pipeline

Waveform LUT --> TIM2 trigger --> DMA --> TIM3 compare register --> PWM output

## Results

Source-level peripheral implementations are present. Hardware execution was not performed during cleanup. The selected folders lack main.h, startup/linker files, HAL sources and lcd_stm32f0.c; this is a curated source excerpt rather than a standalone flashable firmware package.

## Running the Project

```sh
# Open the original board-specific STM32 project in STM32CubeIDE.
# Add signal-generator/main.c OR adc-pwm/main.c to that project.
# Restore HAL/CMSIS, main.h, startup/linker and LCD support files.
# Verify board pins/timers, build, flash and measure with laboratory hardware.
```

## Project Structure

signal-generator/main.c: Practical 4; adc-pwm/main.c: Practical 3; NOTICE.md: vendor/group attribution.

## What I Learned

Peripheral timing, DMA transfers, analogue/digital interfaces and hardware-dependent integration.

## Possible Improvements

Recover the complete original board project, validate lookup-table formatting, add pin diagrams and record oscilloscope measurements as new verification evidence.

## Portfolio Cleanup / Post-project Improvements

Separated the two practical entry points and documented missing build/hardware prerequisites. No hardware performance results invented.
