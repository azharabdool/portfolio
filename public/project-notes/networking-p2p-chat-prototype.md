# P2P Chat Networking Prototype

Python TCP coordination and UDP peer messaging, with explicitly documented security limitations.

## Overview

Coordinate users through a central TCP service and exchange chat messages directly using UDP.

Origin: UCT CSC3002 group networking assignment, 2024. Shared prototype; contribution boundaries are not independently established.

## Technical Approach

A threaded TCP server handles registration/login/online-user discovery. Clients receive peer addresses then send UDP datagrams. The submitted application protocol uses delimiter-separated strings and plaintext passwords; it is an instructional networking prototype.

## Tech Stack

Python 3.11 recommended; standard-library socket, threading and queue modules.

## Key Features

- Central user discovery
- TCP control channel
- UDP peer messages
- threaded receive/server handling.

## Architecture / Pipeline

Client --> TCP control server --> peer discovery --> UDP peer messaging

## Results

Source parses/compiles. Loopback server connectivity is checked separately. A complete multi-device conversation has not been validated. Do not infer confidentiality, authenticated UDP peers or secure password storage.

## Running the Project

```sh
python server.py
# In a separate terminal:
python client.py
# For a lab LAN, set CHAT_BIND_HOST / CHAT_SERVER_HOST deliberately.
# TCP defaults to loopback port 12000; UDP uses port 12001.
```

## Project Structure

server.py: control service; client.py: interactive client. No external dependencies or stored user credentials included.

## What I Learned

Socket I/O, TCP versus UDP responsibilities, threads and protocol framing; recognising security weaknesses in an educational implementation.

## Possible Improvements

Add message framing and disconnect handling; replace plaintext credential handling; authenticate peers; add encrypted transport. Two clients on one host also need separately configured UDP ports.

## Portfolio Cleanup / Post-project Improvements

Replaced the university endpoint with configurable loopback defaults; server binds locally by default. Protocol and security shortcomings are retained and disclosed.
