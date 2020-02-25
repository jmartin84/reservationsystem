import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ReservationDashboard from './containers/ReservationDashboard.jsx';

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' });

ReactDOM.render((
	<ApolloProvider client={client}>
		<ReservationDashboard />
	</ApolloProvider>
), document.getElementById('app'));
