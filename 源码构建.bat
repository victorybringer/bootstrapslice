
cd /d %~dp0

docker build -t victorybringer/bootstrapslice .
docker run -it -p 8081:8000 -p 8082:8080 victorybringer/bootstrapslice


