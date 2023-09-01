import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../../utils/dynamodbClient"

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters

  const response = await document
    .scan({
      TableName: "todos",
      FilterExpression: "user_id = :userid",
      ExpressionAttributeValues: {
        ":userid": userid,
      },
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
  }
}
