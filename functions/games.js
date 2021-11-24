const { find, get } = require('howlongtobeat-api')
const PATH = '/.netlify/functions/games'

exports.handler = async function (event, context) {
  try {
    if (event.path === PATH) {
      const games = await find({ ...event.queryStringParameters })
      return {
        statusCode: 200,
        body: JSON.stringify(games)
      }
    } else if (event.path.startsWith(`${PATH}/`)) {
      const id = parseInt(event.path.replace(`${PATH}/`, ''))
      const game = await get(id)
      return {
        statusCode: game ? 200 : 404,
        body: game ? JSON.stringify(game) : 'Game not found'
      }
    } else {
      return {
        statusCode: 400,
        body: 'Invalid URL'
      }
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
}
