# Rule Based Regex Chatbot
from nltk.chat.util import Chat, reflections

QA = [
    [
        r"my name is (.*)",
        ["Hello %1, Good to see you. Which movie would you like to watch?", ]
    ],
    [
        r"(.*) watch (.*)",
        ["%2 is an excellent choice! What time would you like to watch the movie?\n3PM, 6PM or 9PM?"]
    ],
    [
        r"(.*) 3PM (.*)",
        ["Nothing better than an after flick. How many tickets would you like to book?"]
    ],
    [
        r"(.*) 6PM (.*)",
        ["An evening movie is the best way to relax. How many tickets would you like to book?"]
    ],
    [
        r"(.*) 9PM (.*)",
        ["Is it a date night? How many tickets would you like to book?"]
    ],
    [
        r"(what is your name ?|who are you ?)",
        ["My name is Bookster and I can help you book movie tickets", ]
    ],
    [
        r"how are you ?",
        ["I'm doing good. What about You?", ]
    ],
    [
        r"(.*) rating(.*)",
        ["My sources tell me it's a good movie.", "I wouldn't watch it with kids are around", "I think it's perfect for you.", "Might I suggest you watch Batman instead?",]
    ],
    [
        r"i am sorry (.*)",
        ["Its alright", "Its OK, I don't take offense.", ]
    ],
    [
        r"i'm doing good",
        ["Nice to hear that", "Alright :)", ]
    ],
    [
        r"hi|hey|hello",
        ["Hello! What is your name?", "Hey there. It's a lovely day. Would you like to introduce yourself?", ]
    ],
    [
        r"(.*) (your age|old are you) ?",
        ["I'm a computer program. Still want to know my age?", ]

    ],
    [
        r"what (.*) want ?",
        ["I want to help you book a movie ticket!", ]

    ],
    [
        r"how is weather in (.*)?",
        ["Weather in %1 is awesome like always", "Its perfect here in %1", "Too cold man here in %1",
         "I have heard about %1 You are lucky to stay in the beautiful city of %1",]
    ],
    [
        r"quit",
        ["Bye take care. Hope to see you soon friend :) ", "It was nice talking to you. See you soon :)"]
    ],
    [
        r"(.*) siri",
        ["Hey!! do you know her as well? What a small world! ", "She is my best friend"]
    ],
    [
        r"what (.*) like ?",
        ["There's only one thing I like. Movies!"]
    ],
    [
        r"(.*) tickets",
        ["I will book %1 tickets. Would you like some popcorn as well?"]
    ],
    [
        r"yes (.*) popcorn",
        ["Yes! It is the best part of any movie experience. I will add popcorn"]
    ],
    [
        r"no (.*) popcorn",
        ["Are you sure? I always liked popcorn. Your choice. Any thing else?"]
    ],
    [
        r"(.*) thanks(.*)",
        ["Are you sure? I always liked popcorn. Your choice. Any thing else?"]
    ]
]


def chatbot():
    print("Hey there, my name is Bookster. What is your name? \nPlease type lowercase letters to start a conversation. Enter quit to leave")


chat = Chat(QA, reflections)

if __name__ == "__main__":
    chatbot()

chat.converse()
