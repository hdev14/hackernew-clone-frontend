import { gql, useQuery } from '@apollo/client';

import MyLink from './Link';

export const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

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
