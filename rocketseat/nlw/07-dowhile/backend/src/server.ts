import { serverHttp } from './app'

serverHttp.listen(3333, () =>
  console.log('🔥 server running on http://localhost:3333'),
)
