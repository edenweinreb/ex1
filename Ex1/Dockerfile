FROM gcc:latest AS app

COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

RUN apt-get update && apt-get install -y cmake

RUN cmake -B build && cmake --build build

CMD ["./build/myapp"]


FROM gcc:latest AS tests

COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

RUN apt-get update && apt-get install -y cmake libgtest-dev

RUN cmake -B build && cmake --build build

CMD ["./build/run_tests"]