# Docker
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

# コンテナ操作
next:
	docker exec -it next /bin/sh

# Next
next-install:
	docker compose run --rm next sh -c "yarn global add create-next-app && yarn create next-app . --typescript"

# yarn
yarn-ci:
	docker compose run --rm next yarn install --immutable --immutable-cache --check-cache

# 初期化
init:
	@make build
	@make yarn-ci
	@make up
