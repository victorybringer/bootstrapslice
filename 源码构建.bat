
cd /d %~dp0

docker build -t victorybringer/bootstrapslice .
docker run -it -p 8000:8000 -p 8080:8080 victorybringer/bootstrapslice


