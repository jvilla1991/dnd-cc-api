# Create users

## Create users { user-1, user-1-password }, { user-2, user-2-password }
curl -d '{"passwordhash":"user-1-password"}' -H 'Content-type: application/json' -X POST http://localhost:1010/user/user-1/create
curl -d '{"passwordhash":"user-2-password"}' -H 'Content-type: application/json' -X POST http://localhost:1010/user/user-2/create

curl -d '{"details":{"level":"1","experience":"1"}}' -H 'Content-type: application/json' -X POST http://localhost:1010/character/user-1/user1character1/create
curl -d '{"details":{"level":"1","experience":"1"}}' -H 'Content-type: application/json' -X POST http://localhost:1010/character/user-1/user1character2/create
curl -d '{"details":{"level":"1","experience":"1"}}' -H 'Content-type: application/json' -X POST http://localhost:1010/character/user-2/user2character1/create
curl -d '{"details":{"level":"1","experience":"1"}}' -H 'Content-type: application/json' -X POST http://localhost:1010/character/user-2/user2character2/create
