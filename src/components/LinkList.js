import { gql, useQuery } from '@apollo/client';

import MyLink from './Link';

// const linnksToRender = [
//   {
//     id: 1,
//     description: 'Prisma turns your database into a GraphQL API 😎',
//     url: 'https://www.prismagraphql.com',
//   },
//   {
//     id: 2,
//     description: 'The best GraphQL client',
//     url: 'https://www.apollographql.com/docs/react/',
//   },
// ];

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const LinkLinst = () => {
  const { loading, error, data } = useQuery(FEED_QUERY);

  if (loading) return <h1>loading...</h1>;
  if (error) return <span>{error}</span>;

  return (
    <div>
      {data.feed.links.map((l) => <MyLink key={l.id} link={l} />)}
    </div>
  );
};

export default LinkLinst;
