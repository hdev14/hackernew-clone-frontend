import { ApolloConsumer } from '@apollo/client';
import { useState } from 'react';
import PropTypes from 'prop-types';

import HackLink from './HackerNewsLink';
import { FEED_SEARCH_QUERY } from '../graphql/queries';

const Search = ({ client }) => {
  const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState('');

  const executeSearch = async () => {
    const { data } = await client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
    });

    setLinks([...data.feed.links]);
  };

  return (
    <div>
      <div>
        Search
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
        <button type="button" onClick={() => executeSearch()}>
          OK
        </button>
      </div>

      {links.map((l, index) => (
        <HackLink key={l.id} link={l} index={index} />
      ))}
    </div>
  );
};

Search.propTypes = {
  client: PropTypes.shape({
    query: PropTypes.func,
  }).isRequired,
};

const withApolloClient = (Component) => () => (
  <ApolloConsumer>
    {(client) => <Component client={client} />}
  </ApolloConsumer>
);

export default withApolloClient(Search);
