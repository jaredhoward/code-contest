daemon-mongo:
	docker run --name some-mongo -d mongo

run-challenges:
	docker build -t challenges .
	docker run -it --rm --link some-mongo:mongo -p 3000:3000 challenges

