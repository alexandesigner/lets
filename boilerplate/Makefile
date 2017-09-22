install:
	rm -rf node_modules/
	meteor npm install -S babel-runtime@6.23.0 meteor-node-stubs@0.2.0 vue@2.3.4 vue-meteor-tracker@1.2.3 vue-router@2.5.3 element-ui@1.3.6 element-theme-default@1.3.7 bcrypt@1.0.2 @cleverbeagle/seeder@1.1.0 intersection-observer isomorphic-fetch vuex vue-supply moment vuex-router-sync marked
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
	et --config client/element-variables.css --out client/theme
