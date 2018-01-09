install:
	rm -rf node_modules/
	meteor npm i -S babel-runtime meteor-node-stubs vue vue-meteor-tracker vue-router element-ui element-theme-default bcrypt @cleverbeagle/seeder intersection-observer isomorphic-fetch vuex vue-supply moment vuex-router-sync marked core-js
	meteor npm i -SD babel-eslint eslint eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard eslint-plugin-import eslint-plugin-node
update:
	meteor update
	meteor update --all-packages
dev:
	meteor run -p 3000 --settings ./settings/settings-development.json
rebuild:
	meteor reset && meteor run -p 3000 --settings ./settings/settings-development.json
production:
	meteor run -p 3000 --production --settings ./settings/settings-production.json
setup-deploy:
	cd .deploy && mupx setup
deploy:
	cd .deploy && mupx deploy
reset:
	meteor reset
generate-styles:
	et --config src/element-variables.css --out src/theme
