import PropTypes from 'prop-types';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';

const Link = ({ index, link }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}</span>
        {authToken && (
          <div
            className="ml1 gray fl1 pointer"
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyPress={() => {}}
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
    description: PropTypes.string,
    url: PropTypes.string,
    createdAt: PropTypes.string,
    postedBy: PropTypes.shape({
      name: PropTypes.string,
    }),
    votes: PropTypes.arrayOf({}).isRequired,
  }).isRequired,
};

export default Link;
