import { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { useLocation, useParams, useHistory } from 'react-router-dom';

import { FEED_QUERY } from '../graphql/queries';
import { NEW_LINKS_SUBSCRIPTION, NEW_VOTES_SUBSCRIPTION } from '../graphql/subscriptions';
import { LINKS_PER_PAGE } from '../constants';
import HackerNewsLink from './HackerNewsLink';

const LinkList = () => {
  const history = useHistory();
  const location = useLocation();
  const { page } = useParams();

  const isNewPage = useMemo(() => location.pathname.includes('new'), [location]);
  const pageIndex = useMemo(() => (parseInt(page, 10) - 1) * LINKS_PER_PAGE, [page]);

  const getQueryVariables = () => {
    const skip = isNewPage ? pageIndex : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = isNewPage ? { createdAt: 'desc' } : {};

    return { skip, take, orderBy };
  };

  const {
    loading, error, data, subscribeToMore,
  } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(),
  });

  const getLinksToRender = (queryData) => {
    if (isNewPage) return queryData.feed.links;

    const rankedLinks = queryData.feed.links.slice()
      .sort((l1, l2) => l2.votes.length - l1.votes.length);

    return rankedLinks;
  };

  const nextPage = useCallback((queryData) => {
    const currentPage = parseInt(page, 10);

    if (currentPage <= (queryData.feed.count / LINKS_PER_PAGE)) {
      const next = currentPage + 1;
      history.push(`/new/${next}`);
    }
  }, [page]);

  const previousPage = useCallback(() => {
    const currentPage = parseInt(page, 10);
    if (currentPage > 1) {
      const previous = currentPage - 1;
      history.push(`/new/${previous}`);
    }
  }, [page]);

  const subscribeToNewLinks = async () => {
    subscribeToMore({
      document: NEW_LINKS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { newLink } = subscriptionData.data;
        const linkExists = prev.feed.links.find((l) => l.id === newLink.id);
        if (linkExists) return prev;

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
    subscribeToMore({ document: NEW_VOTES_SUBSCRIPTION });
  };

  if (loading) return <h3>loading...</h3>;
  if (error) return <span>{error}</span>;

  subscribeToNewLinks();
  subscribeToNewVotes();

  const linksToRender = getLinksToRender(data);

  return (
    <div>
      {linksToRender.map((l, index) => (
        <HackerNewsLink
          key={l.id}
          link={l}
          index={index + (page ? pageIndex : 0)}
        />
      ))}

      {isNewPage && (
        <div className="flex ml4 mv3 gray">
          <div
            className="pointer mr2"
            role="button"
            tabIndex={0}
            onClick={previousPage}
            onKeyPress={previousPage}
          >
            Previous
          </div>

          <div
            className="pointer"
            role="button"
            tabIndex={0}
            onClick={() => nextPage(data)}
            onKeyPress={() => nextPage(data)}
          >
            Next
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkList;
