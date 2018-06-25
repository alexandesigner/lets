install:
	rm -rf node_modules/
	meteor npm i -S @babel/runtime@latest meteor-node-stubs@latest babel-runtime vue vue-meteor-tracker vue-router element-ui element-theme-chalk bcrypt @cleverbeagle/seeder intersection-observer isomorphic-fetch vuex vue-supply moment vuex-router-sync marked core-js simpl-schema
	meteor npm i -SD babel-eslint eslint eslint-plugin-meteor eslint-config-standard eslint-plugin-html eslint-plugin-promise eslint-plugin-standard eslint-plugin-import eslint-plugin-node
update:
	meteor update
	meteor update --all-packages
dev:
	./node_modules/.bin/eslint . && meteor run -p 1337 --settings ./settings/settings-development.json
rebuild:
	meteor reset && meteor run -p 1337 --settings ./settings/settings-development.json
production:
	./node_modules/.bin/eslint . && meteor run -p 1337 --production --settings ./settings/settings-production.json
setup-deploy:
	cd .deploy && mupx setup
deploy:
	cd .deploy && mupx deploy
reset:
	meteor reset
generate-styles:
	et --config src/element-variables.scss --out src/theme
