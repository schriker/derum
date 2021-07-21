import { EntryQuery } from '../../generated/graphql';
import EntriesItem from '../EntriesItem/EntriesItem';
import EntryBody from './EntryBody';
import Comments from '../Comments/Comments';

const SingleEntry = ({ data }: { data: EntryQuery }) => {
  return (
    <>
      <EntriesItem fullView data={data.entry} preview={false} />
      {data.entry.body && <EntryBody body={data.entry.body} />}
      <Comments entryIsDeleted={data.entry.deleted} />
    </>
  );
};

export default SingleEntry;
