NPM = npm
NODE = node
FILE = app.js
INIT = init
INSTALL = i
FRAMEWORKS = express


all:
	$(NPM) $(INIT) -y
	$(NPM) $(INSTALL) $(FRAMEWORKS)
	$(NODE) $(FILE)