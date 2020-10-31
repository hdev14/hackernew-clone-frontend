import { useQuery } from '@apollo/client';

import MyLink from './Link';
import { FEED_QUERY } from '../graphql/queries';

const LinkList = () => {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <h1>loading...</h1>;
  if (error) return <span>{error}</span>;

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
