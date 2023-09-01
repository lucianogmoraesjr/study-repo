import { APIGatewayProxyHandler } from "aws-lambda"
import { v4 as uuid } from "uuid"
import { document } from "../../utils/dynamodbClient"

interface Request {
  title: string
  deadline: string
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { title, deadline } = JSON.parse(event.body) as Request
  const { userid } = event.pathParameters

  const id = uuid()

  await document
    .put({
      TableName: "todos",
      Item: {
        id,
        user_id: userid,
        title,
        done: false,
        deadline: new Date(deadline).getTime(),
      },
    })
    .promise()

  const response = await document
    .query({
      TableName: "todos",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": id,
      },
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items[0]),
  }
}
