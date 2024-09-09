
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";



const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

export async function POST(request: Request) {
    const { messages } = await request.json()
    // console.log(messages);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages// messages: messages.map((message: any) => ({ role: message.role, content: message.content
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)



    return NextResponse.json({
        messages: messages,
        response: "Hello, how can I help you today?"
    })
} 
