class Events {
    #subscriptions = new Map();

    listen = (event, callback) => {
        console.log(`Listening to event '${event}'...`);
        if (!this.#subscriptions.has(event)) this.#subscriptions.set(event, new Set());
        this.#subscriptions.get(event).add(callback);
    };

    dispatch = (event, payload) => {
        console.log(`Dispatching event '${event}'...`);
        if (this.#subscriptions.has(event))
            this.#subscriptions.get(event).forEach((callback) => callback(payload));
    };
};

const events = new Events();
export default events;