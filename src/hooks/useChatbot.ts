import axios from "axios"
import { useState } from "react"

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const API_KEY = apiKey
interface Message {
    text: string,
    sender: "user" | "bot"
}
const useChatbot = () => {
    const [messages, setMessages] = useState<Message []>([])

    const sendMessage =  async (message: string) => {
        const newMessages: Message[] =  [
            ...messages, 
            { text: message, sender: "user" }
        ]
        setMessages(newMessages)
        try {
            const res = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4.1",
                    messages: [{
                        role: 'user',
                        content: message
                    }]
                },
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            const botMessage =  res.data.choices[0].message.content
            setMessages([...newMessages, {text: botMessage, sender: 'bot'}])
        } catch (error) {
            console.log('error fetching ai response', error)
        }
    }

    return { messages, sendMessage}
}

export default useChatbot

