const Alexa = require('ask-sdk-core');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Thank you for using Student Lounge, what can I help you find?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function getInstitutionsPublications(publications) {
    return scholar.get('https://scholar.google.com/scholar?hl=en&as_sdt=0%2C60&q=biochemistry&btnG=')


    const InstitutionsIntentHandler = {
        canHandle(handlerInput) {
            return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
                handlerInput.requestEnvelope.request.intent.name === 'InstitutionsIntent'
        },
        handle(handlerInput) {
            const Institutions = InstitutionshandlerInput.requestEnvelope.request.intent.slots.college.value
            const speakOutput = 'college articles in biochemistry'
            const answer = `Here are some of the colleges you requested`
            const reprompt = 'Would you require some specific information on the areas'

            return handlerInput.responseBuilder
                .speak(answer + reprompt)
                .reprompt(reprompt)
                .withShouldEndSession(false)
                .getResponse();
        },
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
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

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent' ||
                Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thanks again for using students Lounge, hope to see you again soon!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(speakOutput)("Sorry, I didn't quite catch that. Would you like to say that again?")
            .reprompt(speakOutput)("Sorry, I am having a hard time hearing what you just said. Would you like to say that again?")
            .withShouldEndSession(false)
            .getResponse();
    },
}

const skillBuilder = Alexa.SkillBuilders.custom

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