import { useQuery } from '@apollo/client';

import MyLink from './Link';
import { FEED_QUERY } from '../graphql/queries';
import { NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../graphql/subscriptions';

const LinkList = () => {
  const {
    loading, error, data, subscribeToMore,
  } = useQuery(FEED_QUERY);

  const subscribeToNewLinks = async () => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { newLink } = subscriptionData.data;
        const exists = prev.feed.links.find((l) => l.id === newLink.id);
        if (exists) return prev;

        return {
          ...prev,
          ...{
            feed: {
              links: [newLink, ...prev.feed.links],
              count: prev.feed.links.length + 1,
              __typename: prev.feed.__typename,
            },
          },
        };
      },
    });
  };

  const subscribeToNewVotes = () => {
    subscribeToMore({
      document: NEW_VOTES_SUBSCRIPTION,
    });
  };

  if (loading) return <h1>loading...</h1>;
  if (error) return <span>{error}</span>;

  subscribeToNewLinks();
  subscribeToNewVotes();

  return (
    <div>
      {data.feed.links.map((l, index) => (
        <MyLink
          key={l.id}
          link={l}
          index={index}
        />
      ))}
    </div>
  );
};

export default LinkList;
