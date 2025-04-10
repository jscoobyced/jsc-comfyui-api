.SILENT: .dep setup dev test test-with-coverage lint build prod deploy

.dep:
	chmod u+x ./etc/bin/*.sh

setup: .dep
	./etc/bin/setup.sh

dev: .dep
	./etc/bin/dev.sh

test: .dep
	./etc/bin/test.sh

test-with-coverage: .dep
	COVERAGE=yes ./etc/bin/test.sh

lint: .dep
	./etc/bin/lint.sh

prod: .dep
	./etc/bin/production.sh

build: .dep
	./etc/bin/build.sh

deploy:
	kubectl apply -k ./etc/k8s