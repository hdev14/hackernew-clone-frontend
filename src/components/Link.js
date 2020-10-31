import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = ({ index, link }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [vote] = useMutation(VOTE_MUTATION, {
    onError: (e) => console.error(e),
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}</span>
        {authToken && (
          <div
            className="ml1 gray fl1 pointer"
            role="button"
            tabIndex={0}
            onClick={() => vote({ variables: { linkId: link.id } })}
            onKeyPress={() => vote({ variables: { linkId: link.id } })}
          >
            ▲
          </div>
        )}
      </div>

      <div className="ml1">
        <div>
          {link.description}
          {' '}
          (
          {link.url}
          )
        </div>

        <div className="f6 lh-copy gray">
          {link.votes.length}
          {' '}
          votes | by
          {' '}
          {link.postedBy ? link.postedBy.name : 'Unknown'}
          {' '}
          {timeDifferenceForDate(link.createdAt)}
        </div>
      </div>
    </div>
  );
};

Link.propTypes = {
  index: PropTypes.number.isRequired,
  link: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
    url: PropTypes.string,
    createdAt: PropTypes.string,
    postedBy: PropTypes.shape({
      name: PropTypes.string,
    }),
    votes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default Link;
