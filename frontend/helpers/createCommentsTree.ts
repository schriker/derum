import { CommentsQuery } from '../generated/graphql';
import { MapedComments } from '../types/comment';

const createCommentTree = (data: CommentsQuery): MapedComments[] => {
  const { comments } = data;

  const hashTable = Object.create(null);
  comments.forEach(
    (comment) => (hashTable[comment.id] = { ...comment, childrens: [] })
  );
  const dataTree = [];
  comments.forEach((comment) => {
    if (comment.parentId)
      hashTable[comment.parentId].childrens.push(hashTable[comment.id]);
    else dataTree.push(hashTable[comment.id]);
  });
  return dataTree;
};

export default createCommentTree;
