import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = () => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [post, { data }] = useMutation(POST_MUTATION);

  const onSubmit = () => {
    if (description && url) {
      post({
        variables: {
          description,
          url,
        },
      }).catch((e) => console.error(e));
      setDescription('');
      setUrl('');
    }
  };

  if (data) return <div>{data}</div>;

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          type="text"
          className="mb2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A description for the link"
        />

        <input
          type="url"
          className="mb2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="The URL for the link"
        />
      </div>

      <button type="button" onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default CreateLink;
