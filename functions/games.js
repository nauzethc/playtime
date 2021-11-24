exports.handler = async function (event, context) {
  console.log(event.path)
  console.log(event.queryStringParameters)
  return {
    statusCode: 200,
    body: JSON.stringify('Hello, world!')
  }
}
