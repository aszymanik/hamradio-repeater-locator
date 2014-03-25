##Repeater Locator for Amateur Radio Repeaters
Simple webapp to find repeaters near you.

Built on AngularJS with NodeJS backend using Express and SQLite3.



###Install process
	git clone https://github.com/aszymanik/hamradio-repeater-locator.git
	cd hamradio-repeater-locator/
	npm install
	node app.js
	
###Repeater import
- Python import script require SQLAlchemy
- You will need an account with www.repeaterbook.com
- Using search feature, select a state and click All under band.
- Click Export -> CSV -> comma-separated
- Run
	python scripts/importer.py /path/to/csv/file/