# NetSchool Node API

There is this [NetSchool](http://www.ir-tech.ru/?products=netschool) school management service with its awful UX. I had to use one and being an engineer I immediately saw a "_challenge_" to make it better. Unfortunately, there is no API. Before I could dive into UI and other tool development I had to build an API. Thus this repository.

## Running the tests

You should create `.env` file in repository root containing 3 keys:

```env
NETSCHOOL_URL=
NETSCHOOL_USER=
NETSCHOOL_PASSWORD=
```

and run the tests:

```bash
yarn test
# npm run test
```
