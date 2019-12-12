const Alexa = require('ask-sdk-core');
const request = require('request')


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const InstitutionsIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'InstitutionsIntent'
    },
    handle(handlerInput) {
        const title = handlerInput.requestEnvelope.request.intent.slots.title.value
        const answer = `Here are some of the programs offered at ${college}`
        const reprompt = 'Would you require some specific information on these programs?'

        return handlerInput.responseBuilder
            .speak(answer + reprompt)
            .reprompt(reprompt)
            .withShouldEndSession(false)
            .getResponse();
    },
}

function url() {
    return 'https://scholar.google.com/scholar?hl=en&as_sdt=0%2C60&q=biochemistry&btnG='
}
let getInstitutionPublications = {
    request: //scholar.google.com/scholar?hl=en&as_sdt=0%2C60&q=biochemistry&btnG=));

        function (error, response, body) {
            var d = JSON.perse(body)
            var result = d.query.searchInfo
            if (result > 0) {
                callback(result);
            }
        }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {

        return handlerInput.responseBuilder.getResponse();
    }
};

const cancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.cancelIntent' ||
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.stopIntent'
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('thank you for using student lounge, goodbye')
            .withShouldEndSession(false)
            .getResponse();
    },
}

const ErrorHandler = {
    canHandle(handlerInput) {
        return true;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(speakOutput)("Sorry, I didn't quite catch that. Would you like to say that again?")
            .reprompt(speakOutput)("Sorry, I am having a hard time hearing what you just said. You may want to try again!")
            .withShouldEndSession(false)
            .getResponse();
    },
}


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        InstitutionsIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();