install:
	rm -rf node_modules/
	meteor npm i
update:
	meteor update
	meteor update --all-packages
dev:
	./node_modules/.bin/eslint . && meteor run -p 3000 --settings ./settings/settings-development.json
rebuild:
	meteor reset && meteor run -p 3000 --settings ./settings/settings-development.json
production:
	./node_modules/.bin/eslint . && meteor run -p 3000 --production --settings ./settings/settings-production.json
setup-deploy:
	cd .deploy && mupx setup
deploy:
	cd .deploy && mupx deploy
reset:
	meteor reset
generate-styles:
	et --config src/element-variables.scss --out src/theme
