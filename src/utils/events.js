/*
    Full credit is attributed to @zastlx on Github & @notzastix on Discord.
    Thank you for the help on BetterBlacket <3
*/

class Events {
    #subscriptions = new Map();

    subscribe = (event, callback) => {
        console.log(`Subscribed to event '${event}'.`);
        if (!this.#subscriptions.has(event)) this.#subscriptions.set(event, new Set());
        this.#subscriptions.get(event).add(callback);
    };

    dispatch = (event, payload) => {
        console.log(`Dispatching event '${event}'.`);
        if (this.#subscriptions.has(event)) this.#subscriptions.get(event).forEach((callback) => callback(payload));
    };
};

const events = new Events();
export default events;