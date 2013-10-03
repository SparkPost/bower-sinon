bower-sinon
===========

Bower repo for Sinon.js

## Creating a release of Sinon.js

```
# clone this repo
git clone git@github.com:messagesystems/bower-sinon
cd bower-sinon

# install the juicer gem (required by sinon to build)
gem install juicer

# install grunt
npm install -g grunt-cli
npm install

# run the build via grunt
grunt build[:version]
```
