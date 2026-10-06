# Operating Systems Simulations

Java experiments in address translation and concurrent FCFS/SJF scheduling.

## Overview

Compare scheduler policies in a threaded service simulation and translate virtual addresses through a fixed page table.

Origin: UCT CSC3002, 2024. Scheduling builds on supplied teaching skeleton code; retained comments identify that scaffolding.

## Technical Approach

The scheduling experiment uses patron threads, a barman thread, CountDownLatch coordination and FIFO/priority queues for FCFS/SJF. The memory exercise reads little-endian address records and maps 7-bit page offsets to fixed physical frames.

## Tech Stack

Java; standard concurrency and I/O libraries. A full JDK (8 or later) is required, not only the installed JRE.

## Key Features

- FCFS and SJF modes
- threaded simulation
- waiting/response/turnaround reporting
- throughput calculation
- virtual-to-physical mapping.

## Architecture / Pipeline

Patron threads --> order queue --> FCFS or SJF service --> timing outputs

## Results

Verification on 2026-10-05 found an installed JDK 17. Both three-patron FCFS/SJF runs completed, and the address translator produced eight physical addresses from the supplied fixture.

Important: the fresh scheduling runs expose invalid aggregate timing calculations. DrinkOrder's arrival field is not populated, producing epoch-sized turnaround values. Waiting/response aggregates are measured from the barman's global start instead of each order's arrival. Do not cite these as valid policy benchmarks. The original implementation is retained; fixing measurement boundaries is a future improvement.

## Running the Project

```sh
# Run from repository root with a JDK:
mkdir build
javac -d build scheduling/*.java virtual-memory/OS1Assignment.java
java -cp build barScheduling.SchedulingSimulation 10 0
java -cp build barScheduling.SchedulingSimulation 10 1
java -cp build OS1Assignment virtual-memory/OS1testsequence
```

## Project Structure

scheduling/: four Java simulation classes; virtual-memory/: address translator and small binary fixture; build/: ignored output.

## What I Learned

Scheduling tradeoffs, queue policies, thread coordination and address translation.

## Possible Improvements

The separate individual-translator public release now has defensive record handling and nonzero error status. Those labelled enhancements are mirrored into this clean copy; original source outside staging is unchanged. Eight valid translations and three invalid-record checks pass. The teaching scheduler remains private and its timing defects are not claimed as corrected historical results.

Seed/order experiments, review timing measurement boundaries, add confidence intervals and validate truncated address records.

## Portfolio Cleanup / Post-project Improvements

Flattened nested source directories, removed compiled classes and documented build commands. Teaching skeleton attribution is preserved.
