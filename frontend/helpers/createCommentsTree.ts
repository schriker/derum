import { CommentsQuery } from '../generated/graphql';

const createCommentTree = (data: CommentsQuery) => {
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
