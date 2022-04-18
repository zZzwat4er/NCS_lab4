docker build ./ -t ncs:latest
docker run --network="host" --name="asdf" ncs 