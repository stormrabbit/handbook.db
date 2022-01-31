# Set the base image to Ubuntu
FROM nginx:latest

# MAINTAINER catwindboy

WORKDIR /ashina

COPY . /ashina

# Update the repository
RUN sh init.sh

ENV NVM_DIR "/root/.nvm"
ENV NODE_VERSION 14.15.4

SHELL ["/bin/bash", "-c"]

# # Install nvm with node and npm
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default && npm install pm2 -g

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

EXPOSE 19599
CMD sh cmd.sh