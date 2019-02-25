From nuptzyz/llvm-slicing


RUN mkdir /opt/slice

ADD node-v11.10.0-linux-x64.tar.gz   /opt/

COPY slice     /opt/slice



ENV  PATH          $PATH:/opt/node-v11.10.0-linux-x64/bin


WORKDIR  /opt/slice



CMD ["npm","start"]


