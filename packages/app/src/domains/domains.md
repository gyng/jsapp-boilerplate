# src/domains

Domain reducers are where you store responses from your remote APIs.

It's good practice to separate the frontend data-persistence layer from application state. Far too often have I encountered apps where everything is jumbled up and you don't know if a value in the store is supposed to be readonly (if it's from a remote server) or not.

Think of this as a local database: prefer to exclusively use redux toolkit's `createEntityAdapter` here.

You can augment or replace redux-toolkit with GraphQL here if that's what you're using.
