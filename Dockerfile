From nuptzyz/llvm-slicing


RUN mkdir /opt/slice

ADD node-v11.10.0-linux-x64.tar.gz   /opt/
ADD go1.12.linux-amd64.tar.gz   /usr/local
ADD gotty_linux_amd64.tar.gz  /usr/local

COPY slice     /opt/slice






ENV  PATH          $PATH:/opt/node-v11.10.0-linux-x64/bin:/usr/local/go/bin




WORKDIR  /opt/slice



CMD ["npm","start"]






